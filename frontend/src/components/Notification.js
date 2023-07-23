import React from 'react';

const Notification = ({ type, message, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="close-button" onClick={onClose}>
          &#10005;
        </button>
      )}
    </div>
  );
};

export default Notification;
