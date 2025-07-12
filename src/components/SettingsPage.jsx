import React from 'react';

// Component for the Settings Page
const SettingsPage = ({ apiKey, setApiKey, showApiKey, setShowApiKey, handleSaveApiKey, handleClearApiKey }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            Toolnify.ai Settings
        </h1>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Google API Key Configuration</h2>
            <p className="text-gray-600 text-center mb-6">
                Enter your Google API key to enable all AI tools on this site.
            </p>

            <div className="relative mb-6">
                <input
                    type={showApiKey ? 'text' : 'password'}
                    className="w-full p-4 pr-16 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Enter your Google API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute inset-y-0 right-0 px-4 py-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                    {showApiKey ? 'Hide' : 'Show'}
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleSaveApiKey}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Save Key
                </button>
                <button
                    onClick={handleClearApiKey}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Clear Key
                </button>
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">About Google API</h2>
            <p className="text-gray-600 text-center">
                The API key is stored locally in your browser and never sent to our servers.
                To get a Google API key, visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AI Studio</a>.
            </p>
        </div>
    </div>
);

export default SettingsPage;
