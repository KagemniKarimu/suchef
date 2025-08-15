"use client";

import * as motion from "motion/react-client";
import { useState } from "react";
import { Session } from "reachat";

interface LearnModeProps {
  sessions: Session[];
  activeSessionId: string;
  loading: boolean;
  onSendMessage: (message: string) => Promise<void>;
  onSelectSession: (id: string) => void;
}

export default function LearnMode({
  sessions,
  activeSessionId,
  loading,
  onSendMessage,
}: LearnModeProps) {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const conversations = activeSession?.conversations || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  if (isExpanded) {
    // Full-screen mode
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 bg-gray-900 p-4"
      >
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">
              🍳 Cooking Assistant - Nyanya - Full View
            </h2>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-200 p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversations.map((conv, index) => (
                <div key={conv.id || index} className="space-y-4">
                  {conv.question && (
                    <div className="flex justify-end">
                      <div className="max-w-[70%] bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4 text-gray-100">
                        {conv.question}
                      </div>
                    </div>
                  )}
                  {conv.response && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-gray-700/50 border border-orange-500/30 rounded-2xl p-4 text-gray-100">
                        {conv.response}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/50 border border-orange-500/30 rounded-2xl p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-700 p-4 flex gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about recipes, techniques, or ingredients..."
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact dashboard mode
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-500/30 overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <span>🍳</span> Cooking Assistant - Nyanya
          </h3>
          <p className="text-sm text-gray-400">
            Ask me anything about cooking!
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-gray-400 hover:text-gray-200 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title="Expand to full view"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>

      <div className="h-[400px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversations.map((conv, index) => (
            <div key={conv.id || index} className="space-y-3">
              {conv.question && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-blue-600/20 border border-blue-500/30 rounded-xl p-3 text-sm text-gray-100">
                    {conv.question}
                  </div>
                </div>
              )}
              {conv.response && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-700/50 border border-orange-500/30 rounded-xl p-3 text-sm text-gray-100">
                    {conv.response}
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 border border-orange-500/30 rounded-xl p-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-700 p-3 flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about recipes or techniques..."
            className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
