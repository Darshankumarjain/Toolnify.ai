import React from 'react';

// LinkedIn Post Writer Tool Component
const LinkedInPostWriterTool = ({
    linkedInTopic, setLinkedInTopic, linkedInKeyPoints, setLinkedInKeyPoints,
    linkedInTone, setLinkedInTone, linkedInCallToAction, setLinkedInCallToAction,
    linkedInHashtags, setLinkedInHashtags, generatedLinkedInPost, setGeneratedLinkedInPost,
    isGeneratingLinkedInPost, handleGenerateLinkedInPost
}) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
            LinkedIn Post Writer
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Craft Your Professional Post</h2>
            <div className="mb-4">
                <label htmlFor="linkedInTopic" className="block text-gray-600 text-sm font-semibold mb-2">
                    Topic of the Post: <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="linkedInTopic"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="E.g., 'New project launch', 'Industry trends', 'Career advice'"
                    value={linkedInTopic}
                    onChange={(e) => setLinkedInTopic(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="linkedInKeyPoints" className="block text-gray-600 text-sm font-semibold mb-2">
                    Key Points/Details (comma-separated):
                </label>
                <textarea
                    id="linkedInKeyPoints"
                    className="w-full p-3 border border-gray-300 rounded-md resize-y focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[80px]"
                    placeholder="E.g., 'Achieved 20% growth', 'Team collaboration was key', 'Excited for next steps'"
                    value={linkedInKeyPoints}
                    onChange={(e) => setLinkedInKeyPoints(e.target.value)}
                    rows="3"
                ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label htmlFor="linkedInTone" className="block text-gray-600 text-sm font-semibold mb-2">
                        Tone:
                    </label>
                    <select
                        id="linkedInTone"
                        value={linkedInTone}
                        onChange={(e) => setLinkedInTone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        <option value="Professional">Professional</option>
                        <option value="Informative">Informative</option>
                        <option value="Inspirational">Inspirational</option>
                        <option value="Casual">Casual</option>
                        <option value="Thought-Provoking">Thought-Provoking</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="linkedInCallToAction" className="block text-gray-600 text-sm font-semibold mb-2">
                        Call to Action (Optional):
                    </label>
                    <input
                        type="text"
                        id="linkedInCallToAction"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="E.g., 'Learn more in comments', 'Connect with me'"
                        value={linkedInCallToAction}
                        onChange={(e) => setLinkedInCallToAction(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="linkedInHashtags" className="block text-gray-600 text-sm font-semibold mb-2">
                    Suggested Hashtags (Optional, comma-separated):
                </label>
                <input
                    type="text"
                    id="linkedInHashtags"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="E.g., 'AI', 'Tech', 'Innovation'"
                    value={linkedInHashtags}
                    onChange={(e) => setLinkedInHashtags(e.target.value)}
                />
            </div>
            <button
                onClick={handleGenerateLinkedInPost}
                disabled={isGeneratingLinkedInPost}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGeneratingLinkedInPost ? 'Generating Post...' : 'Generate LinkedIn Post'}
            </button>
            {generatedLinkedInPost && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Generated LinkedIn Post:</h3>
                    <pre className="text-gray-800 whitespace-pre-wrap font-sans">{generatedLinkedInPost}</pre>
                </div>
            )}
        </div>
    </div>
);

export default LinkedInPostWriterTool;
