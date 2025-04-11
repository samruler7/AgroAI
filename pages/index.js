// pages/index.js

import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🌾 नमस्ते किसान भाई! AgroAI में आपका स्वागत है। अपना सवाल पूछिए।' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      const botMessage = { sender: 'bot', text: data.reply }
      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ उत्तर प्राप्त करने में त्रुटि हुई।' }])
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>AgroAI 🌱 | भारत का स्मार्ट कृषि सहायक</title>
      </Head>

      <main style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '30px',
        fontFamily: 'Segoe UI, sans-serif',
        background: 'linear-gradient(to bottom, #f1f8e9, #e8f5e9)',
        minHeight: '100vh'
      }}>
        <h1 style={{ textAlign: 'center', color: '#2e7d32', fontSize: '2.5rem' }}>
          🌿 AgroAI - भारत का स्मार्ट कृषि सहायक 🤖
        </h1>

        <div style={{
          border: '2px solid #c8e6c9',
          borderRadius: '20px',
          padding: '20px',
          height: '500px',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '12px 0'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '12px 18px',
                borderRadius: '18px',
                backgroundColor: msg.sender === 'user' ? '#a5d6a7' : '#e0e0e0',
                maxWidth: '80%',
                whiteSpace: 'pre-line',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <p style={{ color: '#888' }}>⏳ उत्तर प्राप्त किया जा रहा है...</p>}
        </div>

        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '15px',
              fontSize: '1rem',
              border: '2px solid #a5d6a7',
              borderRadius: '10px 0 0 10px',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '15px 25px',
              fontSize: '1rem',
              backgroundColor: '#43a047',
              color: '#fff',
              border: 'none',
              borderRadius: '0 10px 10px 0',
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
