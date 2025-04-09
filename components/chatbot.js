'use client';

import { useState } from 'react';

const chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    // Simulate a bot response with a slight delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);

    setInput('');
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello')) {
      return 'Hi there! How can I help you?';
    } else if (lowerCaseMessage.includes('help')) {
      return 'I can assist with various queries. What do you need help with?';
    } else if (lowerCaseMessage.includes('bye')) {
      return 'Goodbye! Feel free to ask me anything if you need help in the future.';
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center' }}>Chatbot</h2>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', backgroundColor: message.sender === 'bot' ? '#e7f3ff' : '#f1f1f1', textAlign: message.sender === 'bot' ? 'left' : 'right' }}>
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px 0 0 8px' }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px', border: '1px solid #ddd', borderLeft: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default chatbot;
