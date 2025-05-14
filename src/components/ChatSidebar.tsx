
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChat, type ChatSession } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

export const ChatSidebar = () => {
  const { sessions, currentSessionId, createNewChat, selectSession, renameSession, deleteSession } = useChat();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sessionToManage, setSessionToManage] = useState<ChatSession | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleRenameSession = (session: ChatSession) => {
    setSessionToManage(session);
    setNewTitle(session.title);
    setIsRenameDialogOpen(true);
  };

  const handleDeleteSession = (session: ChatSession) => {
    setSessionToManage(session);
    setIsDeleteDialogOpen(true);
  };

  const confirmRename = () => {
    if (sessionToManage && newTitle.trim()) {
      renameSession(sessionToManage.id, newTitle.trim());
      toast.success('Idea renamed successfully');
      setIsRenameDialogOpen(false);
    }
  };

  const confirmDelete = () => {
    if (sessionToManage) {
      deleteSession(sessionToManage.id);
      toast.success('Idea deleted successfully');
      setIsDeleteDialogOpen(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return `${Math.max(Math.floor((now.getTime() - date.getTime()) / (1000 * 60)), 1)} mins ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return 'Last week';
    }
  };

  return (
    <div 
      className={cn(
        "h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
          <span className="text-idea-primary font-bold text-xl">
            {isCollapsed ? 'IS' : 'IdeaSketch'}
          </span>
        </div>
        <Button 
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn("text-gray-500", isCollapsed && "hidden")}
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
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn("text-gray-500", !isCollapsed && "hidden")}
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
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>

      <div className="p-4">
        <Button 
          className={cn(
            "w-full bg-idea-green text-white hover:bg-idea-green/90 flex items-center justify-center gap-2",
            isCollapsed && "p-2"
          )}
          onClick={createNewChat}
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
          >
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
          {!isCollapsed && <span>New Idea</span>}
        </Button>
      </div>

      <div className="p-2 mt-2">
        {!isCollapsed && <h2 className="text-sm font-medium text-gray-500 mb-2 px-2">Recent Ideas</h2>}
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <ContextMenu key={session.id}>
            <ContextMenuTrigger asChild>
              <button
                className={cn(
                  "w-full text-left p-3 hover:bg-gray-100 transition-colors",
                  currentSessionId === session.id && "bg-idea-lightblue",
                  isCollapsed && "flex justify-center"
                )}
                onClick={() => selectSession(session.id)}
              >
                {isCollapsed ? (
                  <div className="h-8 w-8 rounded-full bg-idea-primary flex items-center justify-center text-white">
                    {session.title.charAt(0)}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="font-medium text-sm truncate">{session.title}</span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500 truncate max-w-[120px]">
                        {session.lastMessage}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(new Date(session.timestamp))}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => handleRenameSession(session)}>
                <Pencil className="h-4 w-4 mr-2" />
                Rename
              </ContextMenuItem>
              <ContextMenuItem 
                className="text-red-500 focus:text-red-500 focus:bg-red-50"
                onClick={() => handleDeleteSession(session)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
      
      <div className={cn(
        "mt-auto border-t border-gray-200 p-4",
        isCollapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed && "flex-col"
        )}>
          <div className="h-8 w-8 rounded-full bg-idea-primary flex items-center justify-center text-white shrink-0">
            U
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <div className="text-sm font-medium">User</div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">Pro Plan</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded">
                  Pro
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Idea</DialogTitle>
            <DialogDescription>
              Enter a new name for this idea.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              placeholder="Idea name"
              autoFocus
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRename}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this idea
              and all its associated messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatSidebar;
