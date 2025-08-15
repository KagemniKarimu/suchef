"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Session, Conversation } from 'reachat'

interface ChatContextType {
  sessions: Session[]
  activeSessionId: string
  loading: boolean
  addSession: (session: Session) => void
  setActiveSession: (id: string) => void
  deleteSession: (id: string) => void
  sendMessage: (message: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

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
          response: "🍳 Hey there, chef! I'm your friendly cooking assistant. Whether you need help with a tricky technique, want to know substitutions for ingredients, or just curious about culinary science - I'm here to help! What's cooking in your mind today?",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    }
  ])
  const [activeSessionId, setActiveSessionId] = useState<string>("1")
  const [loading, setLoading] = useState<boolean>(false)

  const addSession = (session: Session) => {
    setSessions(prev => [...prev, session])
  }

  const setActiveSession = (id: string) => {
    setActiveSessionId(id)
  }

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id))
    if (id === activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id)
    }
  }

  const sendMessage = async (message: string) => {
    setLoading(true)
    const current = sessions.find(s => s.id === activeSessionId)
    
    if (current) {
      try {
        // TODO: Replace with actual API call
        // const response = await chatAPI.sendMessage(message, activeSessionId)
        
        // Mock implementation for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newConversation: Conversation = {
          id: `${current.id}-${current.conversations.length}`,
          question: message,
          response: `🍳 Great question! Here's what I know about that: [This would be the AI response about ${message}]. For now this is a placeholder, but when connected to an API, you'll get real cooking advice!`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        const updated = {
          ...current,
          conversations: [...current.conversations, newConversation],
          updatedAt: new Date(),
        }
        
        setSessions(sessions.map(s => s.id === activeSessionId ? updated : s))
      } catch (error) {
        console.error('Failed to send message:', error)
        // TODO: Add proper error handling/toast notification
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <ChatContext.Provider value={{
      sessions,
      activeSessionId,
      loading,
      addSession,
      setActiveSession,
      deleteSession,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}