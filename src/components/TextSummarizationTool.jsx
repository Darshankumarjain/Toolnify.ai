import React from 'react';

// Text Summarization Tool Component
const TextSummarizationTool = ({
    summarizationInput, setSummarizationInput, summarizedText, setSummarizedText,
    isSummarizing, handleSummarize
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            Text Summarization
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Summarize Text</h2>
            {/* Summarization Input Area */}
            <textarea
                className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-purple-500 focus:border-purple-500 transition duration-200 min-h-[120px]"
                placeholder="Enter text to summarize..."
                value={summarizationInput}
                onChange={(e) => setSummarizationInput(e.target.value)}
                rows="5"
            ></textarea>
            {/* Summarize Button */}
            <button
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSummarizing ? 'Summarizing...' : 'Summarize Text'}
            </button>
            {summarizedText && (
                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Summarized Text:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{summarizedText}</p>
                </div>
            )}
        </div>
    </div>
);

export default TextSummarizationTool;
