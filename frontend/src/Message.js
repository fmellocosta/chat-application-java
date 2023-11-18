import React from 'react';

const Message = ({ message, onDelete, isLastItem }) => {
    const formatTimestamp = timestamp => {
        if (!timestamp) return null;

        const date = new Date(timestamp);

        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours().toString().padStart(2, '0') +
            ":" +
            date.getMinutes().toString().padStart(2, '0')
        );
    };

    return (
        <div className={`message ${isLastItem ? 'highlighted' : ''}`}>
            <strong>{message.sender}:</strong> {message.content}
            <div className="timestamp">{formatTimestamp(message.timestamp)}</div>
            <button className="delete-button" onClick={() => onDelete(message.id)}>
                Delete
            </button>
        </div>
    );
};

export default Message;
