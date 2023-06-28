"""This is an example of how to use async langchain with fastapi and return a streaming response."""
import os
import uvicorn
from starlette.types import Send
from typing import Any, Optional, Awaitable, Callable, Iterator, Union
from fastapi import FastAPI
from langchain.schema import HumanMessage
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from langchain.chat_models import ChatOpenAI
from langchain.callbacks.base import AsyncCallbackManager, AsyncCallbackHandler
from apikeys import openai_api_key

app = FastAPI()

# Open API key
os.environ['OPENAI_API_KEY'] = openai_api_key

Sender = Callable[[Union[str, bytes]], Awaitable[None]]

class EmptyIterator(Iterator[Union[str, bytes]]):
    def __iter__(self):
        return self

    def __next__(self):
        raise StopIteration


class AsyncStreamCallbackHandler(AsyncCallbackHandler):
    """Callback handler for streaming, inheritance from AsyncCallbackHandler."""
    def __init__(self, send: Sender):
        super().__init__()
        self.send = send

    async def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """Rewrite on_llm_new_token to send token to client."""
        await self.send(f"data: {token}\n\n")


class ChatOpenAIStreamingResponse(StreamingResponse):
    """Streaming response for openai chat model, inheritance from StreamingResponse."""
    def __init__(
            self,
            generate: Callable[[Sender], Awaitable[None]],
            status_code: int = 200,
            media_type: Optional[str] = None,
    ) -> None:
        super().__init__(content=EmptyIterator(), status_code=status_code, media_type=media_type)
        self.generate = generate

    async def stream_response(self, send: Send) -> None:
        """Rewrite stream_response to send response to client."""
        await send(
            {
                "type": "http.response.start",
                "status": self.status_code,
                "headers": self.raw_headers,
            }
        )

        async def send_chunk(chunk: Union[str, bytes]):
            if not isinstance(chunk, bytes):
                chunk = chunk.encode(self.charset)
            await send({"type": "http.response.body", "body": chunk, "more_body": True})

        # send body to client
        await self.generate(send_chunk)

        # send empty body to client to close connection
        await send({"type": "http.response.body", "body": b"", "more_body": False})


def send_message(message: str) -> Callable[[Sender], Awaitable[None]]:
    async def generate(send: Sender):
        model = ChatOpenAI(
            streaming=True,
            verbose=True,
            callback_manager=AsyncCallbackManager([AsyncStreamCallbackHandler(send)]),
        )
        await model.agenerate(messages=[[HumanMessage(content=message)]])

    return generate


class StreamRequest(BaseModel):
    """Request body for streaming."""
    message: str


@app.post("/stream")
def stream(body: StreamRequest):
    return ChatOpenAIStreamingResponse(send_message(body.message), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8002, app=app)