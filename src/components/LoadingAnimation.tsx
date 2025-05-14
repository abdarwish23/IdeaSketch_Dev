
import React, { useEffect, useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Progress } from '@/components/ui/progress';

export const LoadingAnimation = () => {
  const { loadingStartTime } = useChat();
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    let timeoutId: number | undefined;
    let progressIntervalId: number | undefined;
    
    // If we're loading and have been for more than 10 seconds
    if (loadingStartTime) {
      timeoutId = window.setTimeout(() => {
        const loadingTime = Date.now() - loadingStartTime;
        if (loadingTime > 10000) { // 10 seconds
          setShowLongLoadingMessage(true);
        }
      }, 10000);
      
      // Add progress indicator that increases gradually
      progressIntervalId = window.setInterval(() => {
        setProgressValue(prev => {
          // Slowly increase, but never reach 100%
          if (prev < 95) {
            return prev + (95 - prev) * 0.05;
          }
          return prev;
        });
      }, 1000);
    } else {
      setShowLongLoadingMessage(false);
      setProgressValue(0);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }
    };
  }, [loadingStartTime]);
  
  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex space-x-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-idea-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-idea-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-idea-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      
      {showLongLoadingMessage && (
        <div className="w-full max-w-xs">
          <div className="text-sm text-gray-500 mb-2 text-center">
            This is taking longer than usual. The AI might be using tools to provide a detailed response...
          </div>
          <Progress value={progressValue} className="h-1 w-full" />
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
