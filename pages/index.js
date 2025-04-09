// pages/index.js

import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'नमस्ते किसान भाई! AgroAI में आपका स्वागत है। कोई भी सवाल पूछिए।' }])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')

    // Dummy bot reply - you can later replace with real API
    setTimeout(() => {
      const botMessage = {
        sender: 'bot',
        text: `आपने पूछा: "${userMessage.text}"\nइसका उत्तर जल्द ही दिया जाएगा।`
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>AgroAI - Chatbot</title>
      </Head>

      <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>AgroAI Chatbot 🤖🌾</h1>

        <div style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          height: '400px',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
          marginBottom: '10px'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '10px 0'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '10px 15px',
                borderRadius: '15px',
                backgroundColor: msg.sender === 'user' ? '#a5d6a7' : '#e0e0e0',
                maxWidth: '80%',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px 0 0 8px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#66bb6a',
              color: '#fff',
              border: 'none',
              borderRadius: '0 8px 8px 0',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </main>
    </>
  )
}
