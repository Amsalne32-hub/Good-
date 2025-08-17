import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model' | 'error';
  text: string;
}

interface AiContextType {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  toggleAi: () => void;
  sendMessage: (prompt: string, context?: Record<string, string | undefined>) => Promise<void>;
  setAiContext: (context: Record<string, string | undefined>) => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export const AiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<Record<string, string | undefined>>({ section: 'General Inquiry' });

  const aiRef = useRef(new GoogleGenAI({ apiKey: process.env.API_KEY as string }));

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'model', text: "Hello! I'm Edu-AI. How can I help you today? You can ask me a question, or use the AI tools next to any topic." }
      ]);
    }
  }, [isOpen, messages.length]);

  const toggleAi = () => {
    setIsOpen(prev => !prev);
  };

  const setAiContext = (newContext: Record<string, string | undefined>) => {
    setContext(newContext);
  };
  
  const sendMessage = async (prompt: string, overrideContext?: Record<string, string | undefined>) => {
    if (!prompt.trim() || isLoading) return;

    setIsOpen(true);
    const newUserMessage: Message = { role: 'user', text: prompt };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    const activeContext = overrideContext || context;
    const contextString = activeContext ? Object.entries(activeContext)
        .filter(([, value]) => value)
        .map(([key, value]) => `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
        .join('\n') : "General knowledge.";
    
    const fullPrompt = `
        Current learning context:
        ${contextString}

        Student's request: "${prompt}"
    `;

    try {
        const response = await aiRef.current.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                systemInstruction: "You are 'Edu-AI', a friendly and encouraging tutor for Nigerian secondary school students (JSS/SSS). Your goal is to explain concepts clearly and simply. Always relate your answers to the Nigerian curriculum context when possible. Use simple language, provide examples, and keep responses concise and easy to read by using paragraphs and bullet points. When asked to generate a quiz question, provide one multiple-choice question with 4 options and clearly indicate the correct answer with an explanation.",
            },
        });
      
      const aiResponse: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = { role: 'error', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AiContext.Provider value={{ isOpen, messages, isLoading, toggleAi, sendMessage, setAiContext }}>
      {children}
    </AiContext.Provider>
  );
};

export const useAi = (): AiContextType => {
  const context = useContext(AiContext);
  if (!context) {
    throw new Error('useAi must be used within an AiProvider');
  }
  return context;
};
