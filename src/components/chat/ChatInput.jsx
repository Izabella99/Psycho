import React from "react";
import "../../assets/css/ChatInput.css";

function ChatInput() {
    return (
        <div className="chat-input-container">
            <form className="input-container">
                <input type="text" placeholder="type your message here" />
            </form>
        </div>
    );
}

export default ChatInput;