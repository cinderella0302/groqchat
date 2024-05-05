import React, { useState } from "react";
import StorageService from "../services/StorageService";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [mode, setMode] = useState(StorageService.getMode() || "dark");
    const [selectedModel, setSelectedModel] = useState(StorageService.getModel() || "llama3-8b-8192");
    const [systemPrompt, setSystemPrompt] = useState(StorageService.getSystemPrompt() || "");
    const [groqAPIToken, setGroqAPIToken] = useState(StorageService.getGroqAPIToken() || "");
    const [mongoDBConnectionString, setMongoDBConnectionString] = useState(
        StorageService.getMongoDBConnectionString() || ""
    );
    const [selectedSetting, setSelectedSetting] = useState("general");

    React.useEffect(() => {
        setMode(StorageService.getMode() || "dark");
        setSelectedModel(StorageService.getModel() || "llama3-8b-8192");
        setSystemPrompt(StorageService.getSystemPrompt() || "");
        setGroqAPIToken(StorageService.getGroqAPIToken() || "");
        setMongoDBConnectionString(StorageService.getMongoDBConnectionString() || "");
    }, []);

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(event.target.value);
    };

    const handleSaveSettings = () => {
        StorageService.saveMode(mode);
        StorageService.saveSystemPrompt(systemPrompt);
        StorageService.saveGroqAPIToken(groqAPIToken);
        StorageService.saveMongoDBConnectionString(mongoDBConnectionString);
        StorageService.saveModel(selectedModel); // Save the selected model
        onClose();
    };

    const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value);
    };

    const handleSystemPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSystemPrompt(event.target.value);
    };

    const handleGroqAPITokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroqAPIToken(event.target.value);
    };

    const handleMongoDBConnectionStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMongoDBConnectionString(event.target.value);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: 1 }}
            onClick={onClose}
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
            <div
                className="bg-zinc-800 rounded-lg shadow-lg w-full max-w-3xl transition-opacity duration-300 z-50"
                style={{ opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-[600px]">
                    <div className="flex items-center justify-between bg-zinc-700 p-4 rounded-t-lg">
                        <h2 className="text-zinc-300 font-semibold">Settings</h2>
                        <XMarkIcon className="h-6 w-6 text-zinc-300 cursor-pointer" onClick={onClose} />
                    </div>
                    <div className="flex h-full">
                        <div className="w-64 border-r border-zinc-700">
                            <ul className="space-y-2 p-4">
                                <li
                                    className={`text-zinc-300 cursor-pointer ${
                                        selectedSetting === "general" ? "bg-zinc-600" : ""
                                    }`}
                                    onClick={() => setSelectedSetting("general")}
                                >
                                    General
                                </li>
                                <li
                                    className={`text-zinc-300 cursor-pointer ${
                                        selectedSetting === "credentials" ? "bg-zinc-600" : ""
                                    }`}
                                    onClick={() => setSelectedSetting("credentials")}
                                >
                                    Credentials
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {selectedSetting === "general" && (
                                <>
                                    <div className="mb-4">
                                        <label htmlFor="model" className="block text-zinc-300">
                                            Model
                                        </label>
                                        <select
                                            id="model"
                                            value={selectedModel}
                                            onChange={handleModelChange}
                                            className="bg-zinc-800 text-zinc-300 rounded-md py-2 px-3 w-full border border-zinc-700"
                                        >
                                            <option value="">Select a model</option>
                                            <option value="llama3-8b-8192">Llama3-8B-8192</option>
                                            <option value="llama3-70b-8192">Llama3-70B-8192</option>
                                            
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="mode" className="block text-zinc-300">
                                            Mode
                                        </label>
                                        <select
                                            id="mode"
                                            value={mode}
                                            onChange={handleModeChange}
                                            className="bg-zinc-800 text-zinc-300 rounded-md py-2 px-3 w-full border border-zinc-700"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="systemPrompt" className="block text-zinc-300">
                                            System Prompt
                                        </label>
                                        <textarea
                                            id="systemPrompt"
                                            value={systemPrompt}
                                            onChange={handleSystemPromptChange}
                                            className="bg-zinc-800 text-zinc-300 rounded-md py-2 px-3 w-full h-32 border border-zinc-700"
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            {selectedSetting === "credentials" && (
                                <>
                                    <div className="mb-4">
                                        <label htmlFor="groqAPIToken" className="block text-zinc-300">
                                            Groq API Token
                                        </label>
                                        <input
                                            id="groqAPIToken"
                                            type="text"
                                            value={groqAPIToken}
                                            onChange={handleGroqAPITokenChange}
                                            className="bg-zinc-800 text-zinc-300 rounded-md py-2 px-3 w-full border border-zinc-700"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="mongoDBConnectionString" className="block text-zinc-300">
                                            MongoDB Connection String
                                        </label>
                                        <input
                                            id="mongoDBConnectionString"
                                            type="text"
                                            value={mongoDBConnectionString}
                                            onChange={handleMongoDBConnectionStringChange}
                                            className="bg-zinc-800 text-zinc-300 rounded-md py-2 px-3 w-full border border-zinc-700"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveSettings}
                                    className="bg-zinc-700 text-zinc-300 py-2 px-4 rounded-md"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;