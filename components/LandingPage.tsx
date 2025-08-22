import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { BookOpen, Target, Film } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onEnterTeacherDashboard: () => void;
  onEnterGeneralKnowledge: () => void;
  onEnterCbtCenter: () => void;
}

const HeroSection: React.FC<LandingPageProps> = ({ onEnterDashboard, onEnterTeacherDashboard, onEnterGeneralKnowledge, onEnterCbtCenter }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Unlock Your Potential with</span>{' '}
                <span className="block text-primary xl:inline">Synapse</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                A comprehensive learning platform aligned with the Nigerian curriculum. Master subjects, practice for exams, and track your progress from JSS to SSS.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button onClick={onEnterDashboard} size="lg">
                    Student Portal
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button onClick={onEnterCbtCenter} variant="outline" size="lg">
                    CBT Center
                  </Button>
                </div>
                 <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button onClick={onEnterGeneralKnowledge} variant="secondary" size="lg">
                    General Knowledge
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button onClick={onEnterTeacherDashboard} variant="outline" size="lg">
                    Teacher Portal
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://picsum.photos/1000/800?random=1"
          alt="Students learning"
        />
      </div>
    </div>
  );
};

const FeatureSection: React.FC = () => {
    const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Comprehensive Curriculum',
      description: 'Covering all major subjects for JSS & SSS levels, aligned with the latest Nigerian educational standards.',
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Interactive Assessments',
      description: 'Test your knowledge with engaging quizzes featuring various question types and instant feedback.',
    },
    {
      icon: <Film className="h-8 w-8 text-primary" />,
      title: 'Rich Media Content',
      description: 'Learn through a mix of videos, animations, and simulations to make complex topics easier to understand.',
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Synapse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard, onEnterTeacherDashboard, onEnterGeneralKnowledge, onEnterCbtCenter }) => {
  return (
    <div className="bg-white">
      <HeroSection onEnterDashboard={onEnterDashboard} onEnterTeacherDashboard={onEnterTeacherDashboard} onEnterGeneralKnowledge={onEnterGeneralKnowledge} onEnterCbtCenter={onEnterCbtCenter} />
      <FeatureSection />
      <section className="bg-primary text-primary-foreground py-20 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Learning Journey?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of Nigerian students mastering their curriculum with Synapse's comprehensive platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={onEnterDashboard}
                className="bg-white hover:bg-slate-100 text-primary font-semibold px-8 py-6 text-lg"
              >
                Access Learning Dashboard
              </Button>
               <Button
                onClick={onEnterCbtCenter}
                className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-semibold px-8 py-6 text-lg"
              >
                Go to CBT Center
              </Button>
            </div>
          </div>
        </section>
    </div>
  );
};

export default LandingPage;