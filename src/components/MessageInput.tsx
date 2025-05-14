
import { useState, FormEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading, currentSession, createNewChat } = useChat();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    try {
      // If no current session, create a new one first
      if (!currentSession) {
        console.log('No current session, creating one before sending message');
        createNewChat();
      }
      
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about patent ideas, or describe your innovation..."
          className="pr-12 py-3 resize-none min-h-[60px] max-h-[200px]"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="absolute right-2 bottom-2 rounded-full h-8 w-8 flex items-center justify-center bg-idea-primary hover:bg-idea-primary/90 p-0"
          disabled={!message.trim() || isLoading}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="rotate-90"
          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </Button>
      </div>
      <div className="text-xs text-center text-gray-400 mt-2">
        IdeaSketch Patent Assistant helps transform your ideas into patentable innovations
      </div>
    </form>
  );
};

export default MessageInput;
