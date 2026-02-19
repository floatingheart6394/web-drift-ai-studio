import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { EVENTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm the Yukta 2K26 Assistant. Ask me anything about the symposium, events, or registration!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemInstruction = `
        You are the official AI assistant for "Yukta 2k26", a national level technical symposium.
        Here is the information about the events: ${JSON.stringify(EVENTS)}.
        The symposium dates are March 15-16, 2026.
        Location: College Campus, Block A.
        Registration is open on the website.
        Be helpful, enthusiastic, and professional. If you don't know something, say you'll check with the organizers.
        Keep responses concise and use markdown for formatting.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat({ role: 'user', content: userMessage }).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction
        }
      });

      const assistantMessage = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having some trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-yukta-primary text-yukta-dark rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-96 h-[600px] glass rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-yukta-primary/20"
          >
            {/* Header */}
            <div className="p-6 bg-yukta-primary/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yukta-primary flex items-center justify-center text-yukta-dark">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Yukta Assistant</h3>
                  <p className="text-[10px] text-yukta-primary uppercase font-bold tracking-widest">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-yukta-secondary text-white' : 'bg-yukta-primary/20 text-yukta-primary'}`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-yukta-secondary text-white rounded-tr-none' : 'bg-white/5 text-white/80 rounded-tl-none'}`}>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-yukta-primary/20 text-yukta-primary flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 text-white/40 text-xs italic">
                      Assistant is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about events..."
                  className="w-full bg-yukta-dark/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-yukta-primary transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-yukta-primary text-yukta-dark rounded-lg flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
