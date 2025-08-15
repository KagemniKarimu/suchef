"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { Session, Conversation } from "reachat";
import { Howl } from "howler";

interface ChatContextType {
  sessions: Session[];
  activeSessionId: string;
  loading: boolean;
  addSession: (session: Session) => void;
  setActiveSession: (id: string) => void;
  deleteSession: (id: string) => void;
  sendMessage: (message: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Learning Session",
      createdAt: new Date(),
      updatedAt: new Date(),
      conversations: [
        {
          id: "welcome",
          question: "",
          response:
            "Well hello there, sweetie! I'm Nyanya - been cooking since before your mama was born, and I've picked up a thing or two along the way. Whether you need help with a tricky technique, want to know what to do with those leftovers, or just curious about how to make something delicious - I'm here for you. Now, what can Nyanya help you with in the kitchen today?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const successSound = useRef<Howl | null>(null);

  useEffect(() => {
    successSound.current = new Howl({
      src: ["/media/ping_success.mp3"],
      volume: 0.4,
      preload: true,
    });

    return () => {
      successSound.current?.unload();
    };
  }, []);

  const addSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
  };

  const setActiveSession = (id: string) => {
    setActiveSessionId(id);
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (id === activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    }
  };

  const sendMessage = async (message: string) => {
    setLoading(true);
    const current = sessions.find((s) => s.id === activeSessionId);

    if (current) {
      try {
        // Build conversation history in OpenAI format
        const messages = [];

        // Add previous conversations
        current.conversations.forEach((conv) => {
          if (conv.question) {
            messages.push({ role: "user", content: conv.question });
          }
          if (conv.response) {
            messages.push({ role: "assistant", content: conv.response });
          }
        });

        // Add current message
        messages.push({ role: "user", content: message });

        // Call AI API with full conversation history
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "learn",
            messages: messages,
          }),
        });

        const data = await response.json();

        const newConversation: Conversation = {
          id: `${current.id}-${current.conversations.length}`,
          question: message,
          response: data.message || `🍳 ${message}? Let me think about that...`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = {
          ...current,
          conversations: [...current.conversations, newConversation],
          updatedAt: new Date(),
        };

        setSessions(
          sessions.map((s) => (s.id === activeSessionId ? updated : s)),
        );
        successSound.current?.play();
      } catch (error) {
        console.error("Failed to send message:", error);
        // Fallback response on error
        const newConversation: Conversation = {
          id: `${current.id}-${current.conversations.length}`,
          question: message,
          response: `Oh honey, seems like we're having some connection troubles. But don't you worry - ${message} sounds like something worth talking about! Let's try again in a moment, alright?`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = {
          ...current,
          conversations: [...current.conversations, newConversation],
          updatedAt: new Date(),
        };

        setSessions(
          sessions.map((s) => (s.id === activeSessionId ? updated : s)),
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSessionId,
        loading,
        addSession,
        setActiveSession,
        deleteSession,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
