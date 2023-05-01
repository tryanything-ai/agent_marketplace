from fastapi import FastAPI
from pydantic import BaseModel
from agent_chain import call_agent
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
import json
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestBody(BaseModel):
    address: str 
    message: str

class Msg(BaseModel):
    msg: str

@app.get("/")
async def root():
    return {"message": "Hello World. Welcome to FastAPI!"}


@app.post("/agent")
async def demo_get(request: RequestBody):
    res = await call_agent(request.message)
    return json.loads(res); 


@app.post("/path")
async def demo_post(inp: Msg):
    return {"message": inp.msg.upper()}


@app.get("/path/{path_id}")
async def demo_get_path_id(path_id: int):
    return {"message": f"This is /path/{path_id} endpoint, use post request to retrieve result"}

