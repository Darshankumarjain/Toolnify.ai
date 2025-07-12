import React, { useState } from 'react';

// Text-to-Speech Tool Component
const TextToSpeechTool = ({
    speechText, setSpeechText, isSpeaking, setIsSpeaking, showMessage
}) => {
    const handleSpeak = () => {
        if (!speechText.trim()) {
            showMessage("Please enter text to speak.", "error");
            return;
        }

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.lang = 'en-US'; // Default language, can be made configurable
            utterance.pitch = 1; // Default pitch
            utterance.rate = 1;   // Default rate

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (event) => {
                setIsSpeaking(false);
                showMessage(`Speech synthesis error: ${event.error}`, "error");
            };

            window.speechSynthesis.speak(utterance);
        } else {
            showMessage("Text-to-Speech is not supported in your browser.", "error");
        }
    };

    const handleStop = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
                Text-to-Speech
            </h1>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Convert Text to Voice</h2>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-teal-500 focus:border-teal-500 transition duration-200 min-h-[120px]"
                    placeholder="Enter text to convert to speech..."
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    rows="5"
                ></textarea>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleSpeak}
                        disabled={isSpeaking}
                        className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSpeaking ? 'Speaking...' : 'Speak Text'}
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isSpeaking}
                        className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Stop Speaking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextToSpeechTool;
