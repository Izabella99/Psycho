import React from "react";
import "../../assets/css/ChatContainer.css";
import ChatInput from "./ChatInput";

function ChatContainer() {
    const messages = [
        {
            id: 1,
            userId: 1,
            message: "Hello! Please send me the last update on the file!",
            sended: true
        },
        {
            id: 2,
            userId: 2,
            message: "Good morning professor! Sure, I will send it later.",
            sended: false
        },
        {
            id: 3,
            userId: 1,
            message: "I am waiting",
            sended: true
        }
    ]

    return (
        <div className="chat-body-container">
            <div className="chat-header">
                Maria Popescu
            </div>
            <hr />
            <div className="chat-messages">
                {messages.map((message, index) => {
                    return (
                        <div className={`message ${message.sended ? "sended" : "received"}`} key={index}>
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatContainer;