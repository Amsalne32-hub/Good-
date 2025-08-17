import React, { useState, useEffect } from 'react';
import type { Subject, Unit, Module, Topic } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { ChevronDown, Beaker, BookOpen, Film, Music, Video, ExternalLink } from 'lucide-react';
import { useAi } from '../contexts/AiContext';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface GeneralKnowledgeProps {
  subject: Subject;
}

const contentTypeIcons: Record<Topic['contentType'], React.ReactNode> = {
  video: <Video className="w-5 h-5 text-red-500" />,
  audio: <Music className="w-5 h-5 text-blue-500" />,
  animation: <Film className="w-5 h-5 text-purple-500" />,
  simulation: <Beaker className="w-5 h-5 text-green-500" />,
  reading: <BookOpen className="w-5 h-5 text-yellow-600" />,
  quiz: <></>, test: <></>, classwork: <></>, assignment: <></>,
};

const TopicItem: React.FC<{ topic: Topic }> = ({ topic }) => {
  return (
    <div className="flex items-start p-4 border-b last:border-b-0">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-200/50">
            {contentTypeIcons[topic.contentType]}
        </div>
        <div className="ml-4 flex-grow">
            <h4 className="font-semibold">{topic.title}</h4>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
        </div>
    </div>
  );
};

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({ subject }) => {
  const [openUnitId, setOpenUnitId] = useState<string | null>(subject.units[0]?.id || null);
  const Icon = subject.icon;
  const { setAiContext } = useAi();

  useEffect(() => {
    setAiContext({
        section: subject.title,
        topic: subject.units.find(u => u.id === openUnitId)?.title,
    });
  }, [subject, openUnitId, setAiContext]);

  const toggleUnit = (unitId: string) => {
    setOpenUnitId(prevId => (prevId === unitId ? null : unitId));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-12 h-12" />
            </div>
            <div>
                <h1 className="text-5xl font-bold">{subject.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{subject.description}</p>
            </div>
        </div>
      </header>

      <div className="space-y-4">
        {subject.units.map((unit) => (
            <Card key={unit.id} className="overflow-hidden">
               <button onClick={() => toggleUnit(unit.id)} className="w-full text-left p-0">
                 <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-slate-50">
                    <div>
                        <CardTitle>{unit.title}</CardTitle>
                        <p className="text-sm text-muted-foreground pt-1">{unit.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ChevronDown className={cn("w-6 h-6 text-muted-foreground transition-transform", openUnitId === unit.id && "rotate-180")} />
                    </div>
                 </CardHeader>
               </button>
               {openUnitId === unit.id && (
                 <CardContent className="border-t pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                           <h3 className="text-lg font-semibold mb-2">Learning Modules</h3>
                           <div className="border rounded-lg overflow-hidden">
                             {unit.modules.map((module, moduleIndex) => (
                               <div key={module.id} className={cn("border-b last:border-b-0", moduleIndex > 0 && "bg-slate-50/30")}>
                                  <div className="p-4 bg-slate-100/50">
                                    <h4 className="font-semibold">{module.title}</h4>
                                    <p className="text-sm text-muted-foreground">{module.description}</p>
                                  </div>
                                  <div className="divide-y">
                                    {module.topics.map(topic => <TopicItem key={topic.id} topic={topic} />)}
                                  </div>
                               </div>
                             ))}
                           </div>
                        </div>
                        <div>
                             <h3 className="text-lg font-semibold mb-2">Suggested Channels</h3>
                             <div className="space-y-3">
                                {unit.suggestedChannels?.map(channel => {
                                    const ChannelIcon = channel.icon;
                                    return (
                                        <Card key={channel.name} className="p-4">
                                            <div className="flex items-start gap-3">
                                                {ChannelIcon && <ChannelIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />}
                                                <div>
                                                    <h4 className="font-semibold">{channel.name}</h4>
                                                    <p className="text-xs text-muted-foreground mb-2">{channel.description}</p>
                                                    <a href={channel.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                                        Visit Channel <ExternalLink className="w-3 h-3 ml-1.5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                             </div>
                        </div>
                    </div>
                 </CardContent>
               )}
            </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneralKnowledge;
