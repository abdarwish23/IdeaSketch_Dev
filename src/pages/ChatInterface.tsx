
import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatSidebar from '@/components/ChatSidebar';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import WelcomeSection from '@/components/WelcomeSection';
import LoadingAnimation from '@/components/LoadingAnimation';
import ChatPagination from '@/components/ChatPagination';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChatMessage } from '@/contexts/ChatContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MESSAGES_PER_PAGE = 10;

const ChatInterface = () => {
  const { currentSession, apiStatus, testApiConnection, isLoading, exportSession } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [currentPageMessages, setCurrentPageMessages] = useState<ChatMessage[]>([]);
  
  // Set up initial page of messages
  useEffect(() => {
    if (currentSession?.messages.length) {
      // By default, show the most recent messages
      const startIndex = Math.max(0, currentSession.messages.length - MESSAGES_PER_PAGE);
      setCurrentPageMessages(currentSession.messages.slice(startIndex));
    } else {
      setCurrentPageMessages([]);
    }
  }, [currentSession?.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isScrolledToBottom || isLoading) {
      scrollToBottom();
    }
  }, [currentPageMessages, isLoading, isScrolledToBottom]);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    setIsScrolledToBottom(isAtBottom);
  };

  const handleTestApi = async () => {
    toast.info("Testing API connection...");
    const success = await testApiConnection();
    if (success) {
      toast.success("API connection successful!");
    }
  };
  
  const handleExportChat = () => {
    if (currentSession) {
      exportSession(currentSession.id);
      toast.success("Idea exported successfully");
    }
  };
  
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-idea-primary flex items-center">
              <span className="mr-2">⚡</span>
              IdeaSketch Patent Assistant
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  apiStatus === 'connected' ? 'bg-green-500' : 
                  apiStatus === 'connecting' ? 'bg-yellow-500' : 
                  apiStatus === 'error' ? 'bg-red-500' : 
                  'bg-gray-500'
                }`}></span>
                <span className="text-sm text-gray-600">
                  {apiStatus === 'connected' ? 'API Connected' : 
                   apiStatus === 'connecting' ? 'Connecting...' : 
                   apiStatus === 'error' ? 'API Error' : 
                   'API Status'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleTestApi}
                className="text-xs"
              >
                Test API
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded flex items-center">
                    Pro Plan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportChat} disabled={!currentSession}>
                    Export Idea
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Settings coming soon")}>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div 
          className="flex-1 overflow-y-auto bg-gray-50 p-4"
          onScroll={handleScroll}
        >
          {!currentSession || currentSession.messages.length === 0 ? (
            <WelcomeSection />
          ) : (
            <div className="max-w-4xl mx-auto">
              <ChatPagination 
                messages={currentSession.messages}
                itemsPerPage={MESSAGES_PER_PAGE}
                onPageChange={setCurrentPageMessages}
              />
              
              {currentPageMessages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message}
                />
              ))}
              
              {isLoading && <LoadingAnimation />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatInterface;
