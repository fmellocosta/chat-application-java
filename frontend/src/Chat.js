import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import './Chat.css';

const Chat = () => {
    const API_URL = 'http://localhost:8888/api/messages/';

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ sender: '', content: '' });

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(API_URL);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post(API_URL, newMessage);
            clearNewMessage();
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const deleteMessage = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}`);
            setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const clearNewMessage = () => {
        setNewMessage({ sender: '', content: '' });
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message, index, messagesList) => (
                    <Message key={message.id} message={message} onDelete={deleteMessage} isLastItem={index === messagesList.length -1}/>
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
