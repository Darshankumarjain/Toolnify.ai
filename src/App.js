import React, { useState, useEffect, useRef } from 'react';
import AIChatbot from './components/AIChatbot';
import AICodeGeneratorTool from './components/AICodeGeneratorTool';
import AIEmailWriterTool from './components/AIEmailWriterTool';
import AIStoryGeneratorTool from './components/AIStoryGeneratorTool';
import LinkedInPostWriterTool from './components/LinkedInPostWriterTool';
import PromptGeneratorTool from './components/PromptGeneratorTool';
import SettingsPage from './components/SettingsPage';
import TextSummarizationTool from './components/TextSummarizationTool';
import TextToSpeechTool from './components/TextToSpeechTool';
import TextTranslatorTool from './components/TextTranslatorTool';
import ToolSelectionPage from './components/ToolSelectionPage';

// MessageModal Component for displaying alerts and confirmations
const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null; // Don't render if no message

    // Determine styling based on message type (success, error, info)
    const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
    const title = type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Information';

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className={`rounded-lg shadow-xl p-6 w-full max-w-sm ${bgColor} text-white`}>
                <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
                <p className="text-lg mb-6 text-center">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-white text-gray-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-200 transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// Main App component
const App = () => {
    // State to manage the current page view ('home', 'translator', 'summarizer', 'email-writer', 'text-to-speech', 'code-generator', 'story-generator', 'linkedin-post-writer', 'prompt-generator', 'settings')
    const [currentPage, setCurrentPage] = useState('home'); // Default to 'home' page

    // State variables for the Text Translator tool
    const [translationInput, setTranslationInput] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
    const [targetLanguage, setTargetLanguage] = useState('fr'); // Default target language
    const [isTranslating, setIsTranslating] = useState(false);

    // State variables for the Text Summarization tool
    const [summarizationInput, setSummarizationInput] = useState('');
    const [summarizedText, setSummarizedText] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    // State variables for AI Email Writer tool
    const [emailSubject, setEmailSubject] = useState('');
    const [emailRecipient, setEmailRecipient] = useState('');
    const [emailPrompt, setEmailPrompt] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

    // State variables for Text-to-Speech tool
    const [speechText, setSpeechText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    // State variables for AI Code Generator tool
    const [codePrompt, setCodePrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isGeneratingCode, setIsGeneratingCode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Python'); // Default code language

    // State variables for AI Story Generator tool
    const [storyPrompt, setStoryPrompt] = useState('');
    const [storyCharacters, setStoryCharacters] = useState(''); // New state for characters
    const [storyLength, setStoryLength] = useState('medium'); // New state for story length
    const [storyTone, setStoryTone] = useState('professional'); // New state for story tone
    const [generatedStory, setGeneratedStory] = useState('');
    const [isGeneratingStory, setIsGeneratingStory] = useState(false);

    // State variables for LinkedIn Post Writer tool
    const [linkedInTopic, setLinkedInTopic] = useState('');
    const [linkedInKeyPoints, setLinkedInKeyPoints] = useState('');
    const [linkedInTone, setLinkedInTone] = useState('Professional');
    const [linkedInCallToAction, setLinkedInCallToAction] = useState('');
    const [linkedInHashtags, setLinkedInHashtags] = useState('');
    const [generatedLinkedInPost, setGeneratedLinkedInPost] = useState('');
    const [isGeneratingLinkedInPost, setIsGeneratingLinkedInPost] = useState(false);

    // State variables for Prompt Generator tool (UPDATED)
    const [promptInput, setPromptInput] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);


    // State for API Key in settings
    const [apiKey, setApiKey] = useState('');
    const [showApiKey, setShowApiKey] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false); // New state to track API key presence

    // State for modal messages
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');

    // Function to show the modal
    const showMessage = (message, type) => {
        setModalMessage(message);
        setModalType(type);
    };

    // Function to close the modal
    const closeMessage = () => {
        setModalMessage('');
        setModalType('');
    };

    // Load API key from local storage on component mount and update hasApiKey state
    useEffect(() => {
        const storedApiKey = localStorage.getItem('googleApiKey');
        if (storedApiKey) {
            setApiKey(storedApiKey);
            setHasApiKey(true);
        } else {
            setHasApiKey(false);
        }
    }, []);

    // Function to call the Gemini API for text generation
    const callGeminiApi = async (prompt) => {
        const currentApiKey = localStorage.getItem('googleApiKey');

        if (!currentApiKey) {
            throw new Error("Google API Key is not set. Please go to Settings to enter your API key.");
        }

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = { contents: chatHistory };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${currentApiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${response.status} - ${errorData.error.message || response.statusText}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                return "No content found in the response.";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            throw error;
        }
    };

    // Handler for text translation
    const handleTranslate = async () => {
        if (!translationInput.trim()) {
            showMessage("Please enter text to translate.", "error");
            return;
        }
        setIsTranslating(true);
        setTranslatedText(''); // Clear previous result

        const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Provide only the translated text, without any additional explanations or formatting: "${translationInput}"`;

        try {
            const result = await callGeminiApi(prompt);
            setTranslatedText(result);
        } catch (error) {
            showMessage(`Failed to translate: ${error.message}`, "error");
        } finally {
            setIsTranslating(false);
        }
    };

    // Handler for text summarization
    const handleSummarize = async () => {
        if (!summarizationInput.trim()) {
            showMessage("Please enter text to summarize.", "error");
            return;
        }
        setIsSummarizing(true);
        setSummarizedText(''); // Clear previous result

        const prompt = `Summarize the following text concisely. Provide only the summary, without any additional explanations or formatting: "${summarizationInput}"`;

        try {
            const result = await callGeminiApi(prompt);
            setSummarizedText(result);
        } catch (error) {
            showMessage(`Failed to summarize: ${error.message}`, "error");
        } finally {
            setIsSummarizing(false);
        }
    };

    // Handler for AI Email Writer
    const handleGenerateEmail = async () => {
        if (!emailPrompt.trim()) {
            showMessage("Please describe the content of the email.", "error");
            return;
        }
        setIsGeneratingEmail(true);
        setGeneratedEmail(''); // Clear previous result

        let prompt = `Write a professional and well-structured email.`;
        if (emailSubject.trim()) {
            prompt += ` The subject is: "${emailSubject.trim()}".`;
        }
        if (emailRecipient.trim()) {
            prompt += ` The recipient is: "${emailRecipient.trim()}".`;
        } else {
            prompt += ` Address it to a general professional audience.`;
        }
        prompt += ` The core content should be about: "${emailPrompt.trim()}". Ensure the email has a clear greeting, body paragraphs, and a professional closing. Provide only the complete email, including Subject and To/Recipient lines if provided, without any introductory or concluding remarks from you.`;

        try {
            const result = await callGeminiApi(prompt);
            setGeneratedEmail(result);
        } catch (error) {
            showMessage(`Failed to generate email: ${error.message}`, "error");
        } finally {
            setIsGeneratingEmail(false);
        }
    };

    // Handler for AI Code Generator
    const handleGenerateCode = async () => {
        if (!codePrompt.trim()) {
            showMessage("Please describe the code you want to generate.", "error");
            return;
        }
        setIsGeneratingCode(true);
        setGeneratedCode(''); // Clear previous result

        const prompt = `Generate a ${selectedLanguage} code snippet for the following description: "${codePrompt.trim()}". Provide only the code, enclosed in a markdown code block (e.g., \`\`\`${selectedLanguage.toLowerCase()}\n// code here\n\`\`\`), without any additional explanations or conversational text.`;

        try {
            const result = await callGeminiApi(prompt);
            setGeneratedCode(result);
        } catch (error) {
            showMessage(`Failed to generate code: ${error.message}`, "error");
        } finally {
            setIsGeneratingCode(false);
        }
    };

    // Handler for AI Story Generator
    const handleGenerateStory = async () => {
        if (!storyPrompt.trim()) {
            showMessage("Please enter a prompt or idea for your story.", "error");
            return;
        }
        setIsGeneratingStory(true);
        setGeneratedStory(''); // Clear previous result

        let prompt = `Generate a creative and engaging story in English.`; // Explicitly request English

        if (storyCharacters.trim()) {
            prompt += ` The story should feature the following characters: ${storyCharacters.trim()}.`;
        }

        prompt += ` The story should have a ${storyTone} tone and be ${storyLength} in length.`;
        prompt += ` The core idea for the story is: "${storyPrompt.trim()}". Ensure it has a clear beginning, middle, and end, with character development and a compelling plot. Provide only the story text, without any introductory or concluding remarks from you.`;

        try {
            const result = await callGeminiApi(prompt);
            setGeneratedStory(result);
        } catch (error) {
            showMessage(`Failed to generate story: ${error.message}`, "error");
        } finally {
            setIsGeneratingStory(false);
        }
    };

    // Handler for LinkedIn Post Writer
    const handleGenerateLinkedInPost = async () => {
        if (!linkedInTopic.trim()) {
            showMessage("Please enter a topic for your LinkedIn post.", "error");
            return;
        }
        setIsGeneratingLinkedInPost(true);
        setGeneratedLinkedInPost(''); // Clear previous result

        let prompt = `Write a professional LinkedIn post about "${linkedInTopic.trim()}".`;

        if (linkedInKeyPoints.trim()) {
            prompt += ` Include the following key points: ${linkedInKeyPoints.trim()}.`;
        }

        prompt += ` The tone should be ${linkedInTone}.`;

        if (linkedInCallToAction.trim()) {
            prompt += ` Add a call to action: "${linkedInCallToAction.trim()}".`;
        }

        if (linkedInHashtags.trim()) {
            prompt += ` Suggest relevant hashtags: ${linkedInHashtags.trim()}.`;
        } else {
            prompt += ` Include a few relevant hashtags.`;
        }

        prompt += ` Ensure the post is concise, engaging, and suitable for a professional network. Provide only the LinkedIn post content, without any introductory or concluding remarks from you.`;

        try {
            const result = await callGeminiApi(prompt);
            setGeneratedLinkedInPost(result);
        } catch (error) {
            showMessage(`Failed to generate LinkedIn post: ${error.message}`, "error");
        } finally {
            setIsGeneratingLinkedInPost(false);
        }
    };

    // Handler for Prompt Generator (UPDATED)
    const handleGeneratePrompt = async () => {
        if (!promptInput.trim()) {
            showMessage("Please enter your desired topic or request for the prompt.", "error");
            return;
        }
        setIsGeneratingPrompt(true);
        setGeneratedPrompt(''); // Clear previous result

        // Construct the prompt to ask the AI to generate a professional prompt based on user input
        const metaPrompt = `Generate a professional and concise AI prompt (between 5 and 10 lines) based on the following user request: "${promptInput.trim()}". The generated prompt should be ready for another AI to use, clearly defining the task, expected output, and any key constraints or details implied by the request. Do NOT include any code snippets, example usage, or bonus sections in the generated prompt.`;

        try {
            const result = await callGeminiApi(metaPrompt);
            setGeneratedPrompt(result);
            setPromptInput(''); // Clear input after successful generation
        } catch (error) {
            showMessage(`Failed to generate prompt: ${error.message}`, "error");
        } finally {
            setIsGeneratingPrompt(false);
        }
    };


    // Handler to save API key to local storage
    const handleSaveApiKey = () => {
        if (apiKey.trim()) {
            localStorage.setItem('googleApiKey', apiKey.trim());
            setHasApiKey(true); // Update state when key is saved
            showMessage('API Key saved successfully!', 'success');
        } else {
            setHasApiKey(false); // Update state when key is empty
            showMessage('Please enter an API Key.', 'error');
        }
    };

    // Handler to clear API key from local storage
    const handleClearApiKey = () => {
        localStorage.removeItem('googleApiKey');
        setApiKey('');
        setHasApiKey(false); // Update state when key is cleared
        showMessage('API Key cleared.', 'info');
    };

    // Function to render the current page based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <ToolSelectionPage onSelectTool={setCurrentPage} hasApiKey={hasApiKey} />;
            case 'translator':
                return (
                    <TextTranslatorTool
                        translationInput={translationInput}
                        setTranslationInput={setTranslationInput}
                        translatedText={translatedText}
                        setTranslatedText={setTranslatedText}
                        sourceLanguage={sourceLanguage}
                        setSourceLanguage={setSourceLanguage}
                        targetLanguage={targetLanguage}
                        setTargetLanguage={setTargetLanguage}
                        isTranslating={isTranslating}
                        handleTranslate={handleTranslate}
                    />
                );
            case 'summarizer':
                return (
                    <TextSummarizationTool
                        summarizationInput={summarizationInput}
                        setSummarizationInput={setSummarizationInput}
                        summarizedText={summarizedText}
                        setSummarizedText={setSummarizedText}
                        isSummarizing={isSummarizing}
                        handleSummarize={handleSummarize}
                    />
                );
            case 'email-writer':
                return (
                    <AIEmailWriterTool
                        emailSubject={emailSubject}
                        setEmailSubject={setEmailSubject}
                        emailRecipient={emailRecipient}
                        emailPrompt={emailPrompt}
                        setEmailPrompt={setEmailPrompt}
                        generatedEmail={generatedEmail}
                        setGeneratedEmail={setGeneratedEmail}
                        isGeneratingEmail={isGeneratingEmail}
                        handleGenerateEmail={handleGenerateEmail}
                    />
                );
            case 'text-to-speech':
                return (
                    <TextToSpeechTool
                        speechText={speechText}
                        setSpeechText={setSpeechText}
                        isSpeaking={isSpeaking}
                        setIsSpeaking={setIsSpeaking}
                        showMessage={showMessage}
                    />
                );
            case 'code-generator':
                return (
                    <AICodeGeneratorTool
                        codePrompt={codePrompt}
                        setCodePrompt={setCodePrompt}
                        generatedCode={generatedCode}
                        setGeneratedCode={setGeneratedCode}
                        isGeneratingCode={isGeneratingCode}
                        handleGenerateCode={handleGenerateCode}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        showMessage={showMessage}
                    />
                );
            case 'story-generator':
                return (
                    <AIStoryGeneratorTool
                        storyPrompt={storyPrompt}
                        setStoryPrompt={setStoryPrompt}
                        generatedStory={generatedStory}
                        setGeneratedStory={setGeneratedStory}
                        isGeneratingStory={isGeneratingStory}
                        handleGenerateStory={handleGenerateStory}
                        storyCharacters={storyCharacters}
                        setStoryCharacters={setStoryCharacters}
                        storyLength={storyLength}
                        setStoryLength={setStoryLength}
                        storyTone={storyTone}
                        setStoryTone={storyTone}
                    />
                );
            case 'linkedin-post-writer':
                return (
                    <LinkedInPostWriterTool
                        linkedInTopic={linkedInTopic}
                        setLinkedInTopic={setLinkedInTopic}
                        linkedInKeyPoints={linkedInKeyPoints}
                        setLinkedInKeyPoints={setLinkedInKeyPoints}
                        linkedInTone={linkedInTone}
                        setLinkedInTone={linkedInTone}
                        linkedInCallToAction={linkedInCallToAction}
                        setLinkedInCallToAction={linkedInCallToAction}
                        linkedInHashtags={linkedInHashtags}
                        setLinkedInHashtags={setLinkedInHashtags}
                        generatedLinkedInPost={generatedLinkedInPost}
                        setGeneratedLinkedInPost={setGeneratedLinkedInPost}
                        isGeneratingLinkedInPost={isGeneratingLinkedInPost}
                        handleGenerateLinkedInPost={handleGenerateLinkedInPost}
                    />
                );
            case 'prompt-generator':
                return (
                    <PromptGeneratorTool
                        promptInput={promptInput}
                        setPromptInput={setPromptInput}
                        generatedPrompt={generatedPrompt}
                        setGeneratedPrompt={setGeneratedPrompt}
                        isGeneratingPrompt={isGeneratingPrompt}
                        handleGeneratePrompt={handleGeneratePrompt}
                    />
                );
            case 'settings':
                return (
                    <SettingsPage
                        apiKey={apiKey}
                        setApiKey={setApiKey}
                        showApiKey={showApiKey}
                        setShowApiKey={setShowApiKey}
                        handleSaveApiKey={handleSaveApiKey}
                        handleClearApiKey={handleClearApiKey}
                    />
                );
            default:
                return <ToolSelectionPage onSelectTool={setCurrentPage} hasApiKey={hasApiKey} />;
        }
    };

    return (
        // Main container with Tailwind CSS for responsiveness and styling
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col font-inter">
            {/* Header Navigation */}
            <header className="bg-gray-800 text-white p-4 sm:p-6 shadow-lg flex flex-col sm:flex-row justify-between items-center rounded-b-xl mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Toolnify.ai</h2>
                <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className={`py-2 px-4 rounded-md text-lg font-medium transition duration-200 ${
                            currentPage === 'home' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'
                        }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('settings')}
                        className={`py-2 px-4 rounded-md text-lg font-medium transition duration-200 ${
                            currentPage === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'
                        }`}
                    >
                        Settings
                    </button>
                </nav>
            </header>

            {/* Main Content Area */}
            <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
                {renderPage()}
            </div>

            {/* AI Chatbot */}
            <AIChatbot callGeminiApi={callGeminiApi} showMessage={showMessage} />

            {/* Message Modal */}
            <MessageModal message={modalMessage} type={modalType} onClose={closeMessage} />

            {/* Tailwind CSS CDN for styling */}
            {/* These script and link tags should ideally be in public/index.html's <head> */}
            {/* <script src="https://cdn.tailwindcss.com"></script> */}
            {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" /> */}
            {/* <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style> */}
        </div>
    );
};

export default App;
