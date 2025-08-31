
import React from 'react';
import type { StudentProfile } from '../../types';
import { getAchievementById, achievementsData } from '../../data/achievements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../data/Card';
import ProgressBar from './ProgressBar';
import { Award, Star, ChevronLeft } from 'lucide-react';
import { Button } from './Button';

interface ProfileProps {
  profile: StudentProfile;
  onBack: () => void;
}

const levelTitles: { [key: number]: string } = {
    1: "Level 1 Explorer",
    2: "Level 2 Adventurer",
    3: "Level 3 Scholar",
    4: "Level 4 Pathfinder",
    5: "Level 5 Sage",
};

const Profile: React.FC<ProfileProps> = ({ profile, onBack }) => {
    const xpForNextLevel = profile.level * 100;
    const currentLevelTitle = levelTitles[profile.level] || `Level ${profile.level} Master`;

    const unlockedAchievements = profile.achievements.map(id => getAchievementById(id)).filter(Boolean);
    const lockedAchievements = achievementsData.filter(ach => !profile.achievements.includes(ach.id));

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back to Journey
                </Button>
                <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-xl text-primary font-semibold">{currentLevelTitle}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold text-primary">Level {profile.level}</span>
                                    <span className="text-sm font-medium text-muted-foreground">{profile.xp} / {xpForNextLevel} XP</span>
                                </div>
                                <ProgressBar value={(profile.xp / xpForNextLevel) * 100} className="h-4" />
                                <p className="text-xs text-muted-foreground text-right mt-1">{xpForNextLevel - profile.xp} XP to Level {profile.level + 1}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="text-amber-500" /> Achievements</CardTitle>
                            <CardDescription>Celebrate your learning milestones.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {unlockedAchievements.map(achievement => {
                                    if (!achievement) return null;
                                    const Icon = achievement.icon;
                                    return (
                                        <div key={achievement.id} className="text-center p-4 border rounded-lg bg-slate-50">
                                            <Icon className="w-10 h-10 mx-auto text-amber-500" />
                                            <h3 className="text-sm font-semibold mt-2">{achievement.name}</h3>
                                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                        </div>
                                    );
                                })}
                                {lockedAchievements.map(achievement => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div key={achievement.id} className="text-center p-4 border rounded-lg bg-slate-50 opacity-40">
                                            <Icon className="w-10 h-10 mx-auto text-slate-400" />
                                            <h3 className="text-sm font-semibold mt-2">{achievement.name}</h3>
                                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2"><Star className="text-amber-500" /> Quest Points</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold text-amber-600">{profile.questPoints} QP</div>
                            <p className="text-sm text-muted-foreground mt-1">Earned from completing topics. Spend them in the store!</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
