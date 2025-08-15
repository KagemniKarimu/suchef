"use client";

import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import StaggeredGridBackground from "../../components/StaggeredGridBackground";
import CircleNavWidget from "../../components/dashboard/widgets/CircleNavWidget";
import ModeErrorBoundary from "../../components/dashboard/ModeErrorBoundary";
import ConvaiWidget from "../../components/dashboard/widgets/ConvaiWidget";
import ComingSoonModal from "../../components/dashboard/modals/ComingSoonModal";
import { useChat } from "../../contexts/ChatContext";
import {
  LearnMode,
  NyanyaMode,
  RandomizerMode,
  GuideMode,
  ReviewMode,
} from "../../components/dashboard/modes";

export default function DashboardPage() {
  const [selectedPersona, setSelectedPersona] = useState<"nyanya" | "neutral">(
    "nyanya",
  );
  const [activeMode, setActiveMode] = useState<string>("nyanya");
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  // Get chat state from context
  const { sessions, activeSessionId, loading, sendMessage, setActiveSession } =
    useChat();

  // Listen for custom events
  useEffect(() => {
    const handleModeChange = (event: CustomEvent) => {
      if (event.detail) {
        setActiveMode(event.detail);
      }
    };

    const handleShowComingSoon = (event: CustomEvent) => {
      if (event.detail?.message) {
        setComingSoonMessage(event.detail.message);
        setComingSoonOpen(true);
      }
    };

    window.addEventListener("changeMode", handleModeChange as EventListener);
    window.addEventListener(
      "showComingSoon",
      handleShowComingSoon as EventListener,
    );

    return () => {
      window.removeEventListener(
        "changeMode",
        handleModeChange as EventListener,
      );
      window.removeEventListener(
        "showComingSoon",
        handleShowComingSoon as EventListener,
      );
    };
  }, []);

  const renderModeContent = () => {
    const modeComponents = {
      learn: (
        <LearnMode
          sessions={sessions}
          activeSessionId={activeSessionId}
          loading={loading}
          onSendMessage={sendMessage}
          onSelectSession={setActiveSession}
        />
      ),
      nyanya: <NyanyaMode />,
      randomizer: <RandomizerMode />,
      guide: <GuideMode />,
      review: <ReviewMode />,
    };

    const component = modeComponents[activeMode as keyof typeof modeComponents];

    if (!component) {
      return (
        <div className="text-center text-gray-400 py-12">
          <p>Mode not found. Please select a valid mode.</p>
        </div>
      );
    }

    // Wrap each mode in its own error boundary
    return (
      <ModeErrorBoundary modeName={activeMode}>{component}</ModeErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen relative bg-gray-900">
      <StaggeredGridBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-8">
          {/* Circle Navigation */}
          <CircleNavWidget
            activeMode={activeMode}
            onModeChange={setActiveMode}
          />

          {/* Persona Toggle */}
          <div className="flex items-center gap-2 bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setSelectedPersona("nyanya")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedPersona === "nyanya"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Nyanya 🍳
            </button>
            <button
              onClick={() => setSelectedPersona("neutral")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedPersona === "neutral"
                  ? "bg-gray-600 text-white"
                  : "text-gray-400"
              }`}
            >
              Off
            </button>
          </div>
        </div>

        {/* Mode Content with Animation */}
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderModeContent()}
        </motion.div>
      </div>

      {/* ElevenLabs Convai Widget - only shows when Nyanya is selected */}
      <ConvaiWidget isActive={selectedPersona === "nyanya"} />

      {/* Global Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
        customMessage={comingSoonMessage}
      />
    </div>
  );
}
