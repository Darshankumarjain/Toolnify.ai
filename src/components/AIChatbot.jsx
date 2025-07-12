import React, { useState, useEffect, useRef } from 'react';

// AIChatbot Component
const AIChatbot = ({ callGeminiApi, showMessage }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State to manage chatbot open/close
    const messagesEndRef = useRef(null); // Ref for scrolling to bottom of messages

    // Scroll to the bottom of the messages div whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newUserMessage = { text: inputMessage, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputMessage('');
        setIsSending(true);

        try {
            const aiResponse = await callGeminiApi(inputMessage);
            setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
        } catch (error) {
            showMessage(`Chatbot error: ${error.message}`, "error");
            setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I couldn't process that. Please try again.", sender: 'ai' }]);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-40"> {/* Adjusted z-index to be below modal but above main content */}
            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-110"
                aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
            >
                {/* Chat icon */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col mt-4">
                    {/* Chatbot Header */}
                    <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold text-lg">AI Chatbot</h3>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    {/* Chat Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.length === 0 && (
                            <p className="text-gray-500 text-center italic">Start a conversation...</p>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-3 rounded-lg max-w-[75%] ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isSending && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 animate-pulse">
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} /> {/* Element to scroll into view */}
                    </div>
                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200 flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isSending) {
                                    handleSendMessage();
                                }
                            }}
                            disabled={isSending}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isSending}
                            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;