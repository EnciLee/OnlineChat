import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import './App.css';

const socket = io('http://localhost:3001');

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(1);
  }, []);

  return (
    <div>
      {userId && <Chat socket={socket} userId={userId} />}
    </div>
  );
};

export default App;
