import React, { useState, useEffect } from 'react';
import './App.css';

const Chat = ({ socket, userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [supportAgentId, setSupportAgentId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.emit('assignAgent', { userId });
    socket.on('agentAssigned', (agentId) => {
      setSupportAgentId(agentId);
    });

    return () => {
      socket.off('message');
      socket.off('agentAssigned');
    };
  }, [socket, userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        userId,
        supportAgentId,
        message,
        timestamp: new Date().toISOString(),
      };
      setIsSending(true);
      socket.emit('sendMessage', newMessage, () => {
        setIsSending(false);
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    document.body.classList.toggle('light-theme', newTheme === 'light');
  };

  return (
    <div className={`chat-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="chat-header">
        Чат поддержки
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.userId === userId ? 'Вы' : 'Агент'}:</strong> {msg.message}
          </div>
        ))}
        {isSending && <div className="sending-animation"></div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Введите ваше сообщение..."
        />
        <button className="chat-button" onClick={sendMessage}>Отправить</button>
        {showEmojiPicker && (
          <div className="emoji-picker-placeholder">
            <p>Выбор эмодзи здесь</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
