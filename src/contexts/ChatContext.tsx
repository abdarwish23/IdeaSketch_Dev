
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';

// Storing API configuration in a separate constant
const API_CONFIG = {
  url: import.meta.env.VITE_FLOWISE_API_URL,
  apiKey: import.meta.env.VITE_FLOWISE_API_KEY
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  usedTools?: any[];
};

export type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: ChatMessage[];
};

type ChatContextType = {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isLoading: boolean;
  loadingStartTime: number | null;
  createNewChat: () => void;
  selectSession: (sessionId: string) => void;
  sendMessage: (message: string) => Promise<void>;
  currentSession: ChatSession | null;
  apiStatus: 'idle' | 'connecting' | 'connected' | 'error';
  testApiConnection: () => Promise<boolean>;
  renameSession: (sessionId: string, newTitle: string) => void;
  deleteSession: (sessionId: string) => void;
  exportSession: (sessionId: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  // Load sessions from localStorage
  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem('ideaSketch_sessions');
      const storedCurrentSessionId = localStorage.getItem('ideaSketch_currentSessionId');
      
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        setSessions(parsedSessions.map((session: any) => ({
          ...session,
          timestamp: new Date(session.timestamp),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })));
        console.log('Loaded sessions from localStorage:', parsedSessions.length);
      }
      
      if (storedCurrentSessionId) {
        setCurrentSessionId(storedCurrentSessionId);
        console.log('Loaded currentSessionId from localStorage:', storedCurrentSessionId);
      }
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
    }
  }, []);

  // Check if the current session actually exists in the sessions array
  // If not, clear the current session ID if no sessions exist, or select the first session
  useEffect(() => {
    if (currentSessionId && sessions.length > 0) {
      const sessionExists = sessions.some(s => s.id === currentSessionId);
      if (!sessionExists) {
        console.log('Current session ID does not match any existing session, selecting the first session');
        setCurrentSessionId(sessions[0].id);
      }
    } else if (currentSessionId && sessions.length === 0) {
      console.log('Current session ID exists but no sessions are found, clearing currentSessionId');
      setCurrentSessionId(null);
    }
  }, [currentSessionId, sessions]);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem('ideaSketch_sessions', JSON.stringify(sessions));
      } catch (error) {
        console.error('Error saving sessions to localStorage:', error);
      }
    }
    
    if (currentSessionId) {
      localStorage.setItem('ideaSketch_currentSessionId', currentSessionId);
    }
  }, [sessions, currentSessionId]);

  // Get the current session using memoization to prevent unnecessary rerenders
  const currentSession = React.useMemo(() => {
    if (!currentSessionId) return null;
    return sessions.find(s => s.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  // Debugging for current session
  useEffect(() => {
    if (currentSession) {
      console.log('Current session:', currentSession.id);
      console.log('Message count:', currentSession.messages.length);
    } else {
      console.log('No current session');
    }
  }, [currentSession]);

  // Update session with immutable pattern to ensure proper state updates
  const updateSession = useCallback((sessionId: string, updates: Partial<ChatSession>) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, ...updates } 
          : session
      )
    );
  }, []);

  // Create a new chat session
  const createNewChat = useCallback(() => {
    const newSessionId = `session_${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: []
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    console.log('Created new session:', newSessionId);
  }, []);

  // Select an existing session
  const selectSession = useCallback((sessionId: string) => {
    console.log('Selecting session:', sessionId);
    setCurrentSessionId(sessionId);
  }, []);
  
  // Rename a session
  const renameSession = useCallback((sessionId: string, newTitle: string) => {
    console.log('Renaming session:', sessionId, 'to', newTitle);
    updateSession(sessionId, { title: newTitle });
  }, [updateSession]);
  
  // Delete a session
  const deleteSession = useCallback((sessionId: string) => {
    console.log('Deleting session:', sessionId);
    setSessions(prev => {
      const filtered = prev.filter(session => session.id !== sessionId);
      
      // If we're deleting the current session, select the most recent one
      if (sessionId === currentSessionId) {
        if (filtered.length > 0) {
          setCurrentSessionId(filtered[0].id);
        } else {
          setCurrentSessionId(null);
        }
      }
      
      return filtered;
    });
  }, [currentSessionId]);
  
  // Export a session as JSON
  const exportSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    const exportData = JSON.stringify(session, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${session.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Chat session exported successfully');
  }, [sessions]);
  
  // Test API connection
  const testApiConnection = useCallback(async (): Promise<boolean> => {
    setApiStatus('connecting');
    try {
      console.log('Testing API connection...');
      const response = await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          question: 'Hello, this is a test message',
          streaming: false
        })
      });
      
      console.log('API test response status:', response.status);
      
      if (!response.ok) {
        console.error('API test failed with status:', response.status);
        setApiStatus('error');
        toast.error(`API connection failed: ${response.status} ${response.statusText}`);
        return false;
      }
      
      // Try to get the response as text first
      const responseText = await response.text();
      console.log('API response as text:', responseText);
      
      let responseData;
      try {
        // Try to parse the response as JSON
        responseData = JSON.parse(responseText);
        console.log('API test response data:', responseData);
      } catch (parseError) {
        console.log('Response is not JSON, using text response instead');
        // If it's not JSON, use the text as is
        responseData = { text: responseText };
      }
      
      if (responseData.text || responseText) {
        setApiStatus('connected');
        toast.success('API connection successful');
        return true;
      } else {
        console.error('API test failed - no text in response', responseData);
        setApiStatus('error');
        toast.error('API response format is unexpected');
        return false;
      }
    } catch (error) {
      console.error('API test error:', error);
      setApiStatus('error');
      toast.error(`API connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  }, []);

  // Send message with streaming support
  const sendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;
    
    // Create a new chat if no current session exists
    if (!currentSessionId || !sessions.some(s => s.id === currentSessionId)) {
      await createNewChat();
    }
    
    // Ensure we have the most current session ID - this may have been updated by createNewChat
    const sessionId = currentSessionId || `session_${Date.now()}`;
    console.log('Using session for message:', sessionId);
    
    // Create user message
    const userMsgId = `msg_${Date.now()}_user`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    };
    
    // Create placeholder for assistant message
    const assistantMsgId = `msg_${Date.now()}_assistant`;
    const assistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };
    
    // Find the current session from the sessions state
    const currentSessionData = sessions.find(s => s.id === sessionId);
    
    // Update the session with the new messages
    setSessions(prevSessions => {
      // If this is the first message or we can't find the session, update title
      if (!currentSessionData || currentSessionData.messages.length === 0) {
        return prevSessions.map(session => 
          session.id === sessionId
            ? {
                ...session,
                title: messageContent.slice(0, 30) + (messageContent.length > 30 ? '...' : ''),
                lastMessage: messageContent,
                timestamp: new Date(),
                messages: [...(session.messages || []), userMessage, assistantMessage]
              }
            : session
        );
      } else {
        // Otherwise just add the messages
        return prevSessions.map(session => 
          session.id === sessionId
            ? {
                ...session,
                lastMessage: messageContent,
                timestamp: new Date(),
                messages: [...(session.messages || []), userMessage, assistantMessage]
              }
            : session
        );
      }
    });
    
    // Ensure current session is set
    setCurrentSessionId(sessionId);
    
    try {
      setIsLoading(true);
      setApiStatus('connecting');
      
      // Record the time when we start loading
      const startTime = Date.now();
      setLoadingStartTime(startTime);
      
      console.log('Sending message to Flowise API:', messageContent);
      
      // Send request to Flowise API with streaming enabled
      const response = await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          question: messageContent,
          streaming: true
        })
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      setApiStatus('connected');
      
      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Unable to read stream');
      }
      
      // For accumulating the complete response
      let accumulatedContent = '';
      let usedTools: any[] = [];
      let toolsBeingUsed = false;
      
      // Process the stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert bytes to text
        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);
        
        try {
          // Try to parse the chunk which might contain multiple lines
          const lines = chunk.split('\n').filter(Boolean);
          
          for (const line of lines) {
            // Skip if line doesn't start with "data:"
            if (!line.startsWith('data:')) continue;
            
            const jsonStr = line.substring(5).trim();
            // Skip "[DONE]" message
            if (jsonStr === '[DONE]') continue;
            
            try {
              const data = JSON.parse(jsonStr);
              
              // Check for token events which contain the actual content
              if (data.event === 'token' && data.data) {
                // Append new token to accumulated content
                accumulatedContent += data.data;
                
                // Update the assistant message with current content
                setSessions(prevSessions => {
                  return prevSessions.map(session => {
                    if (session.id === sessionId) {
                      return {
                        ...session,
                        messages: session.messages.map(msg => 
                          msg.id === assistantMsgId 
                            ? { 
                                ...msg, 
                                content: accumulatedContent,
                                isLoading: true // Still loading, just updating content
                              } 
                            : msg
                        )
                      };
                    }
                    return session;
                  });
                });
              }
              
              // Check for tool usage event
              if (data.event === 'usedTools' && data.data) {
                toolsBeingUsed = true;
                
                // Update the message to show tools are being used
                setSessions(prevSessions => {
                  return prevSessions.map(session => {
                    if (session.id === sessionId) {
                      return {
                        ...session,
                        messages: session.messages.map(msg => 
                          msg.id === assistantMsgId 
                            ? { 
                                ...msg, 
                                content: accumulatedContent + "\n\nThinking...",
                                isLoading: true
                              } 
                            : msg
                        )
                      };
                    }
                    return session;
                  });
                });
              }
              
              // Check for metadata which might contain used tools
              if (data.event === 'metadata' && data.data) {
                if (data.data.usedTools) {
                  usedTools = data.data.usedTools;
                  
                  // Update the message with the tools that were used
                  setSessions(prevSessions => {
                    return prevSessions.map(session => {
                      if (session.id === sessionId) {
                        return {
                          ...session,
                          messages: session.messages.map(msg => 
                            msg.id === assistantMsgId 
                              ? { 
                                  ...msg, 
                                  usedTools: data.data.usedTools,
                                  // Don't change content here, that's handled by token events
                                } 
                              : msg
                          )
                        };
                      }
                      return session;
                    });
                  });
                }
              }
            } catch (e) {
              console.warn('Error parsing JSON in stream:', e, 'Raw line:', line);
            }
          }
        } catch (e) {
          console.warn('Error processing chunk:', e);
        }
      }
      
      // If tools were used but we never got a metadata event with the actual tools
      // extract tools from the accumulated content if possible
      if (toolsBeingUsed && usedTools.length === 0) {
        try {
          // Try to parse the accumulated content for any tool usage information
          const contentObj = JSON.parse(accumulatedContent);
          if (contentObj.usedTools) {
            usedTools = contentObj.usedTools;
          }
        } catch (e) {
          console.warn('Failed to extract tools from content:', e);
        }
      }
      
      // Clean up "thinking" text from the content if it exists
      if (accumulatedContent.includes("\n\nThinking...")) {
        accumulatedContent = accumulatedContent.replace("\n\nThinking...", "");
      }
      
      // Mark the message as completed when stream ends
      setSessions(prevSessions => {
        return prevSessions.map(session => {
          if (session.id === sessionId) {
            return {
              ...session,
              messages: session.messages.map(msg => 
                msg.id === assistantMsgId 
                  ? { 
                      ...msg, 
                      content: accumulatedContent,
                      usedTools: usedTools.length > 0 ? usedTools : undefined,
                      isLoading: false // Done loading
                    } 
                  : msg
              )
            };
          }
          return session;
        });
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      setApiStatus('error');
      
      // Update the assistant message to show error
      setSessions(prevSessions => {
        return prevSessions.map(session => {
          if (session.id === sessionId) {
            return {
              ...session,
              messages: session.messages.map(msg => 
                msg.id === assistantMsgId 
                  ? { 
                      ...msg, 
                      content: 'Sorry, there was an error processing your request. Please try again.', 
                      isLoading: false 
                    } 
                  : msg
              )
            };
          }
          return session;
        });
      });
      
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingStartTime(null);
    }
  }, [currentSessionId, sessions, createNewChat]);

  const value = {
    sessions,
    currentSessionId,
    isLoading,
    loadingStartTime,
    apiStatus,
    createNewChat,
    selectSession,
    sendMessage,
    testApiConnection,
    currentSession,
    renameSession,
    deleteSession,
    exportSession
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatContextProvider');
  }
  return context;
};
