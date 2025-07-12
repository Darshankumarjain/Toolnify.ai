import React, { useState, useRef } from 'react';

// AI Code Generator Tool Component
const AICodeGeneratorTool = ({
    codePrompt, setCodePrompt, generatedCode, setGeneratedCode,
    isGeneratingCode, handleGenerateCode, selectedLanguage, setSelectedLanguage,
    showMessage // Pass showMessage prop for copy feedback
}) => {

    const codeRef = useRef(null); // Ref to the code block for copying

    const handleCopyCode = () => {
        if (codeRef.current) {
            // Use document.execCommand('copy') for better compatibility in iframes
            const range = document.createRange();
            range.selectNode(codeRef.current);
            window.getSelection().removeAllRanges(); // Clear current selection
            window.getSelection().addRange(range); // Select the text
            try {
                document.execCommand('copy');
                showMessage('Code copied to clipboard!', 'success');
            } catch (err) {
                showMessage('Failed to copy code.', 'error');
                console.error('Failed to copy code: ', err);
            }
            window.getSelection().removeAllRanges(); // Deselect the text
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
                AI Code Generator
            </h1>
            <div className="bg-50 p-6 rounded-lg shadow-inner border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Generate Code with AI</h2>
                <div className="mb-4">
                    <label htmlFor="codeLanguage" className="block text-gray-600 text-sm font-semibold mb-2">
                        Programming Language:
                    </label>
                    <select
                        id="codeLanguage"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    >
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="SQL">SQL</option>
                        <option value="React">React (JSX)</option>
                        <option value="Swift">Swift</option>
                        <option value="Go">Go</option>
                        <option value="Ruby">Ruby</option>
                        <option value="PHP">PHP</option>
                    </select>
                </div>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-orange-500 focus:border-orange-500 transition duration-200 min-h-[120px]"
                    placeholder={`Describe the ${selectedLanguage} code you want to generate (e.g., 'A function to reverse a string', 'A simple web page layout')...`}
                    value={codePrompt}
                    onChange={(e) => setCodePrompt(e.target.value)}
                    rows="8"
                ></textarea>
                <button
                    onClick={handleGenerateCode}
                    disabled={isGeneratingCode}
                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGeneratingCode ? 'Generating Code...' : 'Generate Code'}
                </button>
                {generatedCode && (
                    <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-orange-800 mb-2 flex justify-between items-center">
                            Generated Code ({selectedLanguage}):
                            <button
                                onClick={handleCopyCode}
                                className="ml-4 bg-orange-700 text-white text-sm py-1 px-3 rounded-md hover:bg-orange-800 transition duration-200"
                            >
                                Copy Code
                            </button>
                        </h3>
                        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                            <code ref={codeRef}>{generatedCode}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AICodeGeneratorTool;