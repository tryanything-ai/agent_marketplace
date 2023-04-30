import Container from "@/components/container";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";

type Message = {
  start: boolean;
  avatar: string;
  name: string;
  time: string;
  message: string;
  status: string;
  show_status: boolean;
};

type LineItem = {
  name: string;
  price: number;
};

type Props = {
  merchant: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
};

const Receipt: React.FC<Props> = ({
  merchant,
  items,
  subtotal,
  tax,
  total,
}) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden max-w-xs mx-auto mt-4">
      <div className="p-4">
        <h1 className="text-lg font-bold">{merchant}</h1>
        <p className="text-sm text-gray-500">Order Placed: 2/2/2022, 2:22 PM</p>
      </div>
      <div className="border-t border-gray-300">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between p-4">
            <p>{item.name}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between">
        <p>Subtotal:</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <div className="p-4 flex justify-between">
        <p>Tax:</p>
        <p>${tax.toFixed(2)}</p>
      </div>
      <div className="p-4 flex justify-between border-t border-gray-300 font-bold">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

const testMessages: Message[] = [
  {
    start: true,
    avatar:
      "https://pbs.twimg.com/profile_images/1650519711593947137/0qNyuwSX_400x400.jpg",
    name: "Carl",
    time: "12:45",
    message: "Can you plan next weeks party?",
    status: "Delivered",
    show_status: true,
  },
  {
    start: false,
    name: "Second Officer",
    avatar:
      "https://apilgriminnarnia.files.wordpress.com/2017/06/data-star-trek.jpg",
    time: "12:46",
    message: "Sure thing!",
    status: "Thinking ...",
    show_status: true,
  },
];

const Message = ({
  avatar,
  start,
  name,
  time,
  message,
  status,
  show_status,
}: {
  avatar: string;
  start: boolean;
  name: string;
  time: string;
  message: string;
  status: string;
  show_status: boolean;
}) => {
  return (
    <div className={`chat ${start ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      {show_status ? (
        <div className="chat-footer opacity-50">{status}</div>
      ) : null}
    </div>
  );
};

const AgentPay = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(testMessages);

  const sendMessage = () => {
    // add message to message array
    //call ai agent
  };
  //call robot ask for help
  //get help
  //get a bill
  //pay bill

  return (
    <Container className="mt-20 pb-10 flex flex-row">
      {/* Left */}
      <div className="flex flex-col w-full ">
        <div className="mockup-phone">
          <div className="camera" />
          <div className="display">
            <div className="artboard p-2 pt-8 phone-1 bg-gray-900">
              {/* Chat */}
              <div className="h-full">
                {messages.length > 3 ? (
                  <>
                    {messages.map((message) => (
                      <Message
                        key={message.message}
                        avatar={message.avatar}
                        start={message.start}
                        name={message.name}
                        time={message.time}
                        message={message.message}
                        status={message.status}
                        show_status={message.show_status}
                      />
                    ))}
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
              </div>
              {/* End Chat */}
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col w-full">
        <div className="bg-gray-600 h-full rounded-md text-white text-left text-5xl p-4">
          <p>Agent Payments</p>
          <div className="text-xl text-left pt-10">
            <div>- User to Agent</div>
            <div>- Agent to Agent</div>
            <div>- Agent to User</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgentPay;
