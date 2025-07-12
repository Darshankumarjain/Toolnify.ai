import React from 'react';

// Prompt Generator Tool Component
const PromptGeneratorTool = ({
    promptInput, setPromptInput, generatedPrompt, setGeneratedPrompt, isGeneratingPrompt, handleGeneratePrompt
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            AI Prompt Generator
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Generate a Professional AI Prompt</h2>
            <div className="mb-4">
                <label htmlFor="promptInput" className="block text-gray-600 text-sm font-semibold mb-2">
                    Enter your desired topic or request for the prompt: <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="promptInput"
                    className="w-full p-4 border border-gray-300 rounded-md resize-y focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 min-h-[150px]"
                    placeholder="E.g., 'A prompt for generating a creative story about time travel.', 'A prompt for a Python function to sort a list efficiently.', 'A prompt for an email announcing a new company policy.'"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    rows="8"
                    required
                ></textarea>
            </div>
            <button
                onClick={handleGeneratePrompt}
                disabled={isGeneratingPrompt}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGeneratingPrompt ? 'Generating Prompt...' : 'Generate Professional Prompt'}
            </button>
            {generatedPrompt && (
                <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-2">Generated Prompt:</h3>
                    <pre className="text-gray-800 whitespace-pre-wrap">{generatedPrompt}</pre>
                </div>
            )}
        </div>
    </div>
);

export default PromptGeneratorTool;
