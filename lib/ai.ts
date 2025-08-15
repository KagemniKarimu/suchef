import { AI_PROMPTS, AIMode } from './prompts'
import { getRandomResponse, ResponseCategory } from '@/app/mock/AIResponseData'

interface AIRequest {
  mode: AIMode
  message: string
  context?: {
    ingredients?: string[]
    filters?: {
      cuisine?: string
      time?: string
      difficulty?: string
      dietary?: string[]
    }
    recipeId?: string
  }
}

interface AIResponse {
  message: string
  suggestions?: string[]
  rating?: number
}

class AIService {
  private apiKey?: string
  private baseUrl: string
  private useMock: boolean

  constructor() {
    // For demo purposes, we'll use mock responses
    // In production, these would come from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    this.baseUrl = process.env.NEXT_PUBLIC_AI_API_URL || '/api/ai'
    this.useMock = !this.apiKey || process.env.NEXT_PUBLIC_USE_MOCK === 'true'
  }

  async sendMessage(request: AIRequest): Promise<AIResponse> {
    if (this.useMock) {
      // Use mock responses for demo
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate network delay
      
      const mockResponse = getRandomResponse(request.mode as ResponseCategory)
      
      return {
        message: mockResponse,
        ...(request.mode === 'review' && { rating: Math.floor(Math.random() * 2) + 3.5 }),
        ...(request.mode === 'nyanya' && { 
          suggestions: [
            'Quick Stir-Fry', 
            'One-Pot Pasta', 
            'Simple Curry'
          ] 
        })
      }
    }

    // Real API call
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          prompt: AI_PROMPTS[request.mode],
          message: request.message,
          context: request.context
        })
      })

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AI service error:', error)
      // Fallback to mock on error
      const mockResponse = getRandomResponse(request.mode as ResponseCategory)
      return {
        message: mockResponse
      }
    }
  }

  async streamMessage(request: AIRequest, onChunk: (chunk: string) => void): Promise<void> {
    if (this.useMock) {
      // Simulate streaming for mock responses
      const fullResponse = getRandomResponse(request.mode as ResponseCategory)
      const words = fullResponse.split(' ')
      
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 50))
        onChunk(word + ' ')
      }
      return
    }

    // Real streaming API call
    try {
      const response = await fetch(this.baseUrl + '/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          prompt: AI_PROMPTS[request.mode],
          message: request.message,
          context: request.context,
          stream: true
        })
      })

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        onChunk(chunk)
      }
    } catch (error) {
      console.error('AI streaming error:', error)
      // Fallback to non-streaming mock
      const fullResponse = getRandomResponse(request.mode as ResponseCategory)
      onChunk(fullResponse)
    }
  }
}

// Export singleton instance
export const aiService = new AIService()
export type { AIRequest, AIResponse }