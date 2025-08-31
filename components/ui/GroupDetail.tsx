
import React, { useState, useRef, useEffect } from 'react';
import type { StudyGroup, GroupMessage, StudentProfile } from '../../types';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../data/Card';
import { ChevronLeft, Send, Users } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface GroupDetailProps {
  group: StudyGroup;
  studentProfile: StudentProfile;
  onBack: () => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group: initialGroup, studentProfile, onBack }) => {
  const [group, setGroup] = useState<StudyGroup>(initialGroup);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [group.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: GroupMessage = {
      id: `msg${Date.now()}`,
      sender: studentProfile.name,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGroup(prevGroup => ({
      ...prevGroup,
      messages: [...prevGroup.messages, message]
    }));
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to All Groups
        </Button>
        <h1 className="text-3xl font-bold">{group.name}</h1>
        <p className="text-muted-foreground">{group.subject}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="lg:col-span-9">
          <Card className="flex flex-col h-[70vh]">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {group.messages.map(msg => {
                const isUser = msg.sender === studentProfile.name;
                return (
                  <div key={msg.id} className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
                    {!isUser && <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold flex-shrink-0">{msg.sender.charAt(0)}</div>}
                    <div className={cn("max-w-[70%] rounded-2xl px-4 py-2", isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none')}>
                      {!isUser && <p className="text-xs font-bold text-primary mb-1">{msg.sender}</p>}
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70" : "text-muted-foreground/70", "text-right")}>{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-xl">
              <div className="relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pr-12 pl-4 py-2 border rounded-full"
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>
        </main>
        <aside className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Members</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.members.map(member => (
                  <li key={member} className="text-sm font-medium">{member}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default GroupDetail;
