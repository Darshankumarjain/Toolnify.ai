import React from 'react';

// AI Email Writer Tool Component
const AIEmailWriterTool = ({
    emailSubject, setEmailSubject, emailRecipient, setEmailRecipient,
    emailPrompt, setEmailPrompt, generatedEmail, setGeneratedEmail,
    isGeneratingEmail, handleGenerateEmail
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            AI Email Writer
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Compose Email with AI</h2>
            <div className="mb-4">
                <label htmlFor="emailSubject" className="block text-gray-600 text-sm font-semibold mb-2">
                    Subject:
                </label>
                <input
                    type="text"
                    id="emailSubject"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="Enter email subject..."
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="emailRecipient" className="block text-gray-600 text-sm font-semibold mb-2">
                    Recipient (Optional, e.g., "Team", "Client", "John Doe"):
                    </label>
                <input
                    type="text"
                    id="emailRecipient"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="Enter recipient (optional)..."
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                />
            </div>
            <textarea
                className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 min-h-[120px]"
                placeholder="Describe the content of your email (e.g., 'Request a meeting for project update', 'Announce new product features')..."
                value={emailPrompt}
                onChange={(e) => setEmailPrompt(e.target.value)}
                rows="5"
            ></textarea>
            <button
                onClick={handleGenerateEmail}
                disabled={isGeneratingEmail}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGeneratingEmail ? 'Generating Email...' : 'Generate Email'}
            </button>
            {generatedEmail && (
                <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-2">Generated Email:</h3>
                    <pre className="text-gray-800 whitespace-pre-wrap font-sans">{generatedEmail}</pre>
                </div>
            )}
        </div>
    </div>
);

export default AIEmailWriterTool;
