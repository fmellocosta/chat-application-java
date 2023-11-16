import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Chat.css'; // Import the CSS file for styling

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ sender: '', content: '' });

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('/api/messages', newMessage);
            setNewMessage({ sender: '', content: '' });
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={newMessage.sender}
                    onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
