import React from 'react';
import Nav from './chat/Nav';
import Header from './Header';
import '../assets/css/Chat.css';
import Contacts from './chat/Contacts';
import ChatContainer from './chat/ChatContainer';

function Chat() {
    return (
        <div className='f-layer'>
            <Nav />
            <div className="f-container">
            <div className="f-header">
                <Header />
            </div>
            <div className="chat-container">
                <Contacts />
                <ChatContainer />
            </div>
        </div>
        </div>
        
    );
}

export default Chat;