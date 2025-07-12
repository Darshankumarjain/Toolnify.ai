import React from 'react';

// AI Story Generator Tool Component
const AIStoryGeneratorTool = ({
    storyPrompt, setStoryPrompt, generatedStory, setGeneratedStory,
    isGeneratingStory, handleGenerateStory,
    storyCharacters, setStoryCharacters, storyLength, setStoryLength, storyTone, setStoryTone
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            AI Story Generator
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Generate a Creative Story</h2>
            <div className="mb-4">
                <label htmlFor="storyCharacters" className="block text-gray-600 text-sm font-semibold mb-2">
                    Characters (Optional, e.g., "A brave knight, a mischievous dragon"):
                </label>
                <input
                    type="text"
                    id="storyCharacters"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-200"
                    placeholder="Enter characters..."
                    value={storyCharacters}
                    onChange={(e) => setStoryCharacters(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label htmlFor="storyLength" className="block text-gray-600 text-sm font-semibold mb-2">
                        Story Length:
                    </label>
                    <select
                        id="storyLength"
                        value={storyLength}
                        onChange={(e) => setStoryLength(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-200"
                    >
                        <option value="short">Short (approx. 1-2 paragraphs)</option>
                        <option value="medium">Medium (approx. 3-5 paragraphs)</option>
                        <option value="long">Long (approx. 6+ paragraphs)</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="storyTone" className="block text-gray-600 text-sm font-semibold mb-2">
                        Story Tone:
                    </label>
                    <select
                        id="storyTone"
                        value={storyTone}
                        onChange={(e) => setStoryTone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-200"
                    >
                        <option value="professional">Professional</option>
                        <option value="formal">Formal</option>
                        <option value="informal">Informal</option>
                        <option value="adventurous">Adventurous</option>
                        <option value="mysterious">Mysterious</option>
                        <option value="heartwarming">Heartwarming</option>
                        <option value="comedic">Comedic</option>
                        <option value="dramatic">Dramati`c</option>
                    </select>
                </div>
            </div>
            <textarea
                className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:ring-pink-500 focus:border-pink-500 transition duration-200 min-h-[150px]"
                placeholder="Enter a prompt or idea for your story (e.g., 'A detective solving a mystery in a futuristic city')..."
                value={storyPrompt}
                onChange={(e) => setStoryPrompt(e.target.value)}
                rows="8"
            ></textarea>
            <button
                onClick={handleGenerateStory}
                disabled={isGeneratingStory}
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGeneratingStory ? 'Generating Story...' : 'Generate Story'}
            </button>
            {generatedStory && (
                <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-pink-800 mb-2">Generated Story:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{generatedStory}</p>
                </div>
            )}
        </div>
    </div>
);

export default AIStoryGeneratorTool;
