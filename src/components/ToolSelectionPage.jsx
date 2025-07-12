import React from 'react';

// Tool Selection Page Component (New Home Page)
const ToolSelectionPage = ({ onSelectTool, hasApiKey }) => {
    const tools = [
        {
            id: 'translator',
            name: 'Text Translator',
            description: 'Translate text between different languages instantly.',
            icon: (
                <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
            ),
        },
        {
            id: 'summarizer',
            name: 'Text Summarization',
            description: 'Get concise summaries of long articles or documents.',
            icon: (
                <svg className="w-16 h-16 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
        },
        {
            id: 'email-writer',
            name: 'AI Email Writer',
            description: 'Draft professional emails quickly with AI assistance.',
            icon: (
                <svg className="w-16 h-16 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2z"></path>
                </svg>
            ),
        },
        {
            id: 'text-to-speech',
            name: 'Text-to-Speech',
            description: 'Convert written text into natural-sounding speech.',
            icon: (
                <svg className="w-16 h-16 text-teal-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464A9.963 9.963 0 0012 4C7.029 4 3 8.029 3 13s4.029 9 9 9c4.971 0 9-4.029 9-9a9.963 9.963 0 00-3.536-7.536M12 10v4m-2-2h4m-4 0h.01"></path>
                </svg>
            ),
        },
        {
            id: 'code-generator',
            name: 'AI Code Generator',
            description: 'Generate code snippets in various programming languages.',
            icon: (
                <svg className="w-16 h-16 text-orange-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
            ),
        },
        {
            id: 'story-generator',
            name: 'AI Story Generator',
            description: 'Create unique and engaging stories from your prompts.',
            icon: (
                <svg className="w-16 h-16 text-pink-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path>
                </svg>
            ),
        },
        {
            id: 'linkedin-post-writer',
            name: 'LinkedIn Post Writer',
            description: 'Draft professional and engaging posts for LinkedIn.',
            icon: (
                <svg className="w-16 h-16 text-blue-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            ),
        },
        {
            id: 'prompt-generator',
            name: 'AI Prompt Generator',
            description: 'Generate effective prompts for various AI models.',
            icon: (
                <svg className="w-16 h-16 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8">
                Welcome to Toolnify.ai
            </h1>
            <p className="text-lg text-gray-600 mb-10">Select a tool to get started:</p>

            {/* Conditional message for API Key */}
            {!hasApiKey && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
                    <p className="font-bold">API Key Required!</p>
                    <p className="text-sm">Please go to <button onClick={() => onSelectTool('settings')} className="text-blue-700 hover:underline font-semibold">Settings</button> to enter your Google API Key to enable AI functionalities.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        onClick={() => onSelectTool(tool.id)}
                        className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer border border-gray-200 flex flex-col items-center justify-center"
                    >
                        {tool.icon}
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">{tool.name}</h2>
                        <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolSelectionPage;
