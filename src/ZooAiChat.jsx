import React, { useState, useEffect, useRef } from 'react';
import './ZooAiChat.css';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export default function ZooAiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Roar! 👋 Welcome to the zoo. Ask me about animals, tickets, or opening times!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Replace '/api/chat' with your actual backend endpoint when ready
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);

        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "My keeper says my brain is offline right now. Try again later! 🐾" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">

            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <span>🦓 Zoo AI Assistant</span>
                    <button onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            {msg.text}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about lions..."
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="chat-fab"
                aria-label="Toggle AI Chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
        </div>
    );
}