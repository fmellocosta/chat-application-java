import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Chat.css'; // Import the CSS file for styling

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
            setNewMessage({ sender: '', content: '' });
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const deleteMessage = (id) => {
        // Function to delete a specific message
        fetch(`${API_URL}${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Update the state after successful deletion
                setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
            })
            .catch(error => console.error('Error deleting message:', error));
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.sender}:</strong> {message.content}
                        <button className="delete-button" onClick={() => deleteMessage(message.id)}>Delete</button>
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
