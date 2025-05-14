
import { useState } from 'react';
import { useChat, ChatSession } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2 } from 'lucide-react';
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
import { toast } from 'sonner';

const SessionManagement = () => {
  const { sessions, currentSessionId, selectSession, renameSession, deleteSession } = useChat();
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sessionToManage, setSessionToManage] = useState<ChatSession | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleOpenRenameDialog = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent session selection when clicking rename
    setSessionToManage(session);
    setNewTitle(session.title);
    setIsRenameDialogOpen(true);
  };

  const handleOpenDeleteDialog = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent session selection when clicking delete
    setSessionToManage(session);
    setIsDeleteDialogOpen(true);
  };

  const handleRename = () => {
    if (sessionToManage && newTitle.trim()) {
      renameSession(sessionToManage.id, newTitle.trim());
      toast.success('Session renamed successfully');
      setIsRenameDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (sessionToManage) {
      deleteSession(sessionToManage.id);
      toast.success('Session deleted successfully');
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3">Manage Ideas</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className={`flex items-center justify-between p-2 rounded ${
              currentSessionId === session.id ? 'bg-idea-lightblue' : 'bg-white'
            } border hover:bg-gray-50`}
          >
            <div 
              className="flex-1 cursor-pointer truncate px-2" 
              onClick={() => selectSession(session.id)}
            >
              <span className="font-medium">{session.title}</span>
              <p className="text-xs text-gray-500 truncate">{session.lastMessage}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => handleOpenRenameDialog(session, e)}
                className="h-8 w-8 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => handleOpenDeleteDialog(session, e)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
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
            <Button onClick={handleRename}>Save Changes</Button>
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
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SessionManagement;
