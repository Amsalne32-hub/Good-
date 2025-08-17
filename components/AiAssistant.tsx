import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Bot, X, Send, User, Loader } from 'lucide-react';
import { useAi } from '../contexts/AiContext';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const AiAssistant: React.FC = () => {
  const { isOpen, messages, isLoading, toggleAi, sendMessage } = useAi();
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    await sendMessage(userInput);
    setUserInput('');
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={toggleAi}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-28 right-8 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        <header className="p-4 border-b flex items-center gap-3 bg-slate-50 rounded-t-2xl">
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Edu-AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Your personal learning guide</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={cn("flex gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : '',
                  msg.role === 'model' ? 'bg-slate-100 text-slate-800 rounded-bl-none' : '',
                  msg.role === 'error' ? 'bg-destructive/20 text-destructive rounded-bl-none' : '',
                )}
              >
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
               {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <Loader className="w-5 h-5 animate-spin" />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full pr-12 pl-4 py-2 border rounded-full"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
              disabled={isLoading || !userInput.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AiAssistant;
