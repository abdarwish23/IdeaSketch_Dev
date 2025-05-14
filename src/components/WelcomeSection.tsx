
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useChat } from '@/contexts/ChatContext';

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  onClick,
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onClick: () => void;
}) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="mb-4 text-idea-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2 text-idea-primary">{title}</h3>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  );
};

export const WelcomeSection = () => {
  const { sendMessage } = useChat();

  const handleFeatureClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-idea-primary">
        Welcome to IdeaSketch Patent Assistant
      </h1>
      
      <p className="text-lg text-center text-gray-600">
        I help transform your ideas into patentable innovations. Ask me anything about patent
        ideation, or try one of these examples to get started.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
        <FeatureCard
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
              <line x1="9.69" y1="8" x2="21.17" y2="8"/>
              <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
              <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
              <line x1="14.31" y1="16" x2="2.83" y2="16"/>
              <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
            </svg>
          }
          title="Generate Patent Ideas"
          description='"Generate patentable ideas for AI-assisted medical diagnostics"'
          onClick={() => handleFeatureClick("Generate patentable ideas for AI-assisted medical diagnostics")}
        />
        
        <FeatureCard
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M2 12h10"/>
              <path d="m9 4 8 8-8 8"/>
            </svg>
          }
          title="Improve an Existing Concept"
          description='"How can I make my solar energy storage system more patentable?"'
          onClick={() => handleFeatureClick("How can I make my solar energy storage system more patentable?")}
        />
        
        <FeatureCard
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
              <line x1="9" y1="9" x2="10" y2="9"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="15" y2="17"/>
            </svg>
          }
          title="Patent Documentation"
          description='"Help me draft for my blockchain-based secure voting system"'
          onClick={() => handleFeatureClick("Help me draft for my blockchain-based secure voting system")}
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
