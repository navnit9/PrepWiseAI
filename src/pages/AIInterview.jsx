import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './AIInterview.css';

const AIInterview = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI interviewer. Today we will be focusing on React and frontend development. Are you ready to begin?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'That is a good answer. Can you explain how you would optimize a React application that is experiencing performance issues?' 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="ai-interview-page">
      <div className="container ai-container animate-fade-in">
        <div className="interview-header">
          <div>
            <h2>AI Interview Session</h2>
            <p>Frontend Developer Role (React)</p>
          </div>
          <Button variant="secondary" className="end-interview-btn">End Interview</Button>
        </div>

        <Card className="chat-card" hoverEffect={false}>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-wrapper ai">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your answer here..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="primary" className="send-btn">
              <Send size={18} />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AIInterview;
