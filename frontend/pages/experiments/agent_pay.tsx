import { useState, useEffect, useRef } from "react";
import Container from "@/components/container";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

const SITE_IS_LIVE = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

enum Status {
  Thinking = "Thinking",
  Writing = "Writing",
  Sent = "Sent",
  Delivered = "Delivered",
}

type Message = {
  id: string;
  start: boolean;
  avatar: string;
  name: string;
  time: string;
  message: string;
  status: Status;
  show_status: boolean;
  receipt?: Receipt;
};

type Receipt = {
  openai_cost: number;
  other_costs: number;
  service_fee: number;
  address: string;
  terms: string;
};

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center space-x-1 text-white">
      <div className="animate-bounce">.</div>
      <div className="animate-bounce delay-75">.</div>
      <div className="animate-bounce delay-150">.</div>
    </div>
  );
};

const Receipt = ({ receipt }: { receipt: Receipt }) => {
  const [stars, setStars] = useState(0);
  const total = receipt.openai_cost + receipt.other_costs + receipt.service_fee;

  return (
    <div className="bg-white rounded-md text-black">
      <div className="p-4">
        <h1 className="text-xl font-bold text-black">
          {"Friendly Robot Co 🤖"}
        </h1>
        {/* <p className="text-sm text-gray-500">Order Placed: 2/2/2022, 2:22 PM</p> */}
      </div>
      <div className="border-t border-gray-300">
        {/* Open AI Cost */}
        <div className="flex justify-between px-4 py-1">
          <p>{"OpenAI"}</p>
          <p>${receipt.openai_cost.toFixed(2)}</p>
        </div>
        {/* Open AI Cost */}
        <div className="flex justify-between px-4 py-1">
          <p>{"Fixed Costs"}</p>
          <p>${receipt.other_costs.toFixed(2)}</p>
        </div>
        {/* Open AI Cost */}
        <div className="flex justify-between px-4 py-1">
          <p>{"Service Fee"}</p>
          <p>${receipt.service_fee.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-4 flex justify-between border-t border-gray-300 font-bold">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>

      <div className="rating rating-md p-4 flex justify-between border-t border-gray-300 font-bold">
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setStars(1)}
          checked={stars === 1}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setStars(2)}
          checked={stars === 2}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setStars(3)}
          checked={stars === 3}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setStars(4)}
          checked={stars === 4}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setStars(5)}
          checked={stars === 5}
        />
      </div>
      <div className="p-4 pt-2 flex justify-between font-bold">
        <button className="btn btn-primary w-full">Pay</button>
      </div>
    </div>
  );
};

const Message = ({
  avatar,
  start,
  name,
  time,
  message,
  status,
  show_status,
  receipt,
}: {
  avatar: string;
  start: boolean;
  name: string;
  time: string;
  message: string;
  status: string;
  show_status: boolean;
  receipt?: Receipt;
}) => {
  return (
    <>
      {receipt ? (
        <div className={`chat ${start ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} />
            </div>
          </div>
          <div className="chat-header p">
            {name}
            {/* <time className="text-xs opacity-50 ml-2">{time}</time> */}
          </div>
          <div className="chat-bubble p-0 w-full">
            <Receipt receipt={receipt} />
          </div>
          {show_status ? (
            <div className="chat-footer opacity-50">
              <>
                {status === Status.Thinking ? (
                  <>
                    <LoadingDots />
                  </>
                ) : (
                  <>{status} </>
                )}
              </>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`chat ${start ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} />
            </div>
          </div>
          <div className="chat-header">
            {name}
            {/* <time className="text-xs opacity-50 ml-2">{time}</time> */}
          </div>
          <div
            className={clsx("chat-bubble", {
              "chat-bubble-info": !start,
              "chat-bubble-success": start,
            })}
          >
            {message}
          </div>
          {show_status ? (
            <div className="chat-footer opacity-50">{status}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

const Authentication = ({ setEmail, login, loading }: any) => {
  return (
    <div className="flex-1 flex flex-col h-full items-center pt-10">
      <img src="/anything.svg" alt="Anything" />
      <div className="flex-1" />
      {SITE_IS_LIVE ? (
        <a
          href="https://airtable.com/shr5g54cH7aU8875w"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary mt-2"
        >
          Sign Up For Early Access
        </a>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="input input-bordered rounded-md w-full max-w- mb-2"
          />
          <button onClick={login} className="btn btn-primary w-full mb-4">
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
              "Login"
            )}
          </button>
        </>
      )}
    </div>
  );
};

const AgentPay = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Login State
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const login = async () => {
    try {
      setLoading(true);

      if (email) {
        //TODO: call ethos api via our api
        const response = await fetch("/api/ethos/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        console.log("ethos_login", response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Assuming 'messages' is the state variable containing the chat messages

  const delayedMessage = () => {
    setTimeout(() => {
      setMessages((messages) => [
        ...messages,
        {
          id: "1",
          start: true,
          name: "Second Officer",
          avatar:
            "https://apilgriminnarnia.files.wordpress.com/2017/06/data-star-trek.jpg",
          time: "12:46",
          message: "Sure thing!",
          status: Status.Thinking,
          show_status: true,
        },
      ]);
    }, 1000); // delay for 500ms
  };

  const delayedBill = (receipt: any) => {
    console.log("receipt", receipt);
    //make good looking receipt inside message.
    setTimeout(() => {
      let newMessage: Message = {
        id: "3",
        start: true,
        name: "Second Officer",
        avatar:
          "https://apilgriminnarnia.files.wordpress.com/2017/06/data-star-trek.jpg",
        time: "12:46",
        message: "Sure thing RECEIPT!",
        status: Status.Thinking,
        show_status: false,
        receipt,
      };

      setMessages((old_messages) => [...old_messages, newMessage]);
    }, 1000); // delay for 1000ms
  };
  const sendMessage = async () => {
    // add message to message array
    setMessages([
      {
        id: "0",
        start: false,
        avatar:
          "https://pbs.twimg.com/profile_images/1650519711593947137/0qNyuwSX_400x400.jpg",
        name: "Carl",
        time: "12:45",
        message: prompt,
        status: Status.Delivered,
        show_status: true,
      },
    ]);

    delayedMessage();

    //call ai agent
    let response = await fetch("http://127.0.0.1:8000/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        address: "sui_address",
      }),
    }).then((response) => response.json());
    //update message in spot 2
    if (response) {
      console.log(response);

      //update message
      setMessages([
        {
          id: "0",
          start: true,
          avatar:
            "https://pbs.twimg.com/profile_images/1650519711593947137/0qNyuwSX_400x400.jpg",
          name: "Carl",
          time: "12:45",
          message: prompt,
          status: Status.Delivered,
          show_status: true,
        },
        {
          id: "1",
          start: true,
          name: "Second Officer",
          avatar:
            "https://apilgriminnarnia.files.wordpress.com/2017/06/data-star-trek.jpg",
          time: "12:46",
          message: "Sure thing!",
          status: Status.Delivered,
          show_status: false,
        },
        {
          id: "2",
          start: true,
          name: "Second Officer",
          avatar:
            "https://apilgriminnarnia.files.wordpress.com/2017/06/data-star-trek.jpg",
          time: "12:46",
          message: response.message,
          status: Status.Delivered,
          show_status: false,
        },
      ]);

      delayedBill(response.receipt);
    }
  };

  return (
    <Container className="mt-20 pb-10 flex flex-row">
      {/* Left */}
      <div className="flex flex-col w-full">
        <div className="mockup-phone">
          <div className="camera" />
          <div className="display">
            <div className="artboard p-2 pt-8 phone-1 bg-gray-900 overflow-y-auto scroll-container">
              {/* Chat */}

              {loggedIn ? (
                <>
                  {messages.length > 0 ? (
                    <>
                      {messages.map((message) => (
                        <Message
                          key={message.id}
                          avatar={message.avatar}
                          start={message.start}
                          name={message.name}
                          time={message.time}
                          message={message.message}
                          status={message.status}
                          show_status={message.show_status}
                          receipt={message.receipt}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    //  empty screen

                    <div className="flex flex-col h-full">
                      <div className="flex-1" />

                      <div className="flex flex-row ml-1 mb-2">
                        <input
                          type="text"
                          onChange={(e) => {
                            setPrompt(e.target.value);
                          }}
                          placeholder="Type here"
                          className="input input-bordered rounded-2xl h-10 w-full max-w-xs"
                        />
                        <button className=" ml-1" onClick={sendMessage}>
                          <IoMdSend className="w-10 h-10 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Authentication
                  setEmail={setEmail}
                  login={login}
                  loading={loading}
                />
              )}

              {/* End Chat */}
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      {/* <div className="flex flex-col w-full">
        <div className="bg-gray-600 h-full rounded-md text-white text-left text-5xl p-4">
          <p>Agent Payments</p>
          <div className="text-xl text-left pt-10">
            <div>- User to Agent</div>
            <div>- Agent to Agent</div>
            <div>- Agent to User</div>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default AgentPay;
