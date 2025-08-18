import React from 'react';
import type { StudyGroup } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Users, PlusCircle } from 'lucide-react';

interface StudyGroupsProps {
  groups: StudyGroup[];
  onSelectGroup: (group: StudyGroup) => void;
}

const StudyGroups: React.FC<StudyGroupsProps> = ({ groups, onSelectGroup }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Study Groups</h1>
          <p className="text-muted-foreground mt-1">Collaborate, discuss, and learn together.</p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Group
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <Card key={group.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              <div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{group.members.length} members</span>
                </div>
                <Button className="w-full" onClick={() => onSelectGroup(group)}>
                  Enter Group
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyGroups;
