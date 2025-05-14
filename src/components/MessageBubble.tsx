
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChatMessage } from '@/contexts/ChatContext';
import UsedToolsDisplay from './UsedToolsDisplay';
import ReactMarkdown from 'react-markdown';

type MessageBubbleProps = {
  message: ChatMessage;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const isToolLoading = message.isLoading && message.content && message.content.includes('thinking...');
  
  return (
    <div className={cn(
      "flex mb-4", 
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex flex-col max-w-[80%] md:max-w-[70%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser 
            ? "bg-idea-primary text-white rounded-tr-none" 
            : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
        )}>
          {message.isLoading && message.content === '' ? (
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap markdown-content">
              {isUser ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
            </div>
          )}
        </div>
        
        {/* Display used tools if they exist or are loading */}
        {!isUser && (
          <>
            {isToolLoading ? (
              <UsedToolsDisplay tools={[]} isLoading={true} />
            ) : (
              message.usedTools && message.usedTools.length > 0 && (
                <UsedToolsDisplay tools={message.usedTools} />
              )
            )}
          </>
        )}
        
        <span className={cn(
          "text-xs text-gray-500 mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
