import React from 'react';

// Text Translator Tool Component
const TextTranslatorTool = ({
    translationInput, setTranslationInput, translatedText, setTranslatedText,
    sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage,
    isTranslating, handleTranslate
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            Text Translator
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Translate Text</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Source Language Selector */}
                <div className="flex-1">
                    <label htmlFor="sourceLang" className="block text-gray-600 text-sm font-semibold mb-2">
                        Source Language:
                    </label>
                    <select
                        id="sourceLang"
                        value={sourceLanguage}
                        onChange={(e) => setSourceLanguage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                        <option value="hi">Hindi</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="zh">Chinese</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
                {/* Target Language Selector */}
                <div className="flex-1">
                    <label htmlFor="targetLang" className="block text-gray-600 text-sm font-semibold mb-2">
                        Target Language:
                    </label>
                    <select
                        id="targetLang"
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="zh">Chinese</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
            </div>
            {/* Translation Input Area */}
            <textarea
                className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[120px]"
                placeholder="Enter text to translate..."
                value={translationInput}
                onChange={(e) => setTranslationInput(e.target.value)}
                rows="5"
            ></textarea>
            {/* Translate Button */}
            <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isTranslating ? 'Translating...' : 'Translate Text'}
            </button>
            {translatedText && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Translated Text:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{translatedText}</p>
                </div>
            )}
        </div>
    </div>
);

export default TextTranslatorTool;
