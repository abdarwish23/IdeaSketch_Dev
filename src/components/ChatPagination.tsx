
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChatMessage } from '@/contexts/ChatContext';

interface ChatPaginationProps {
  messages: ChatMessage[];
  itemsPerPage: number;
  onPageChange: (messages: ChatMessage[]) => void;
}

const ChatPagination = ({ messages, itemsPerPage, onPageChange }: ChatPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  
  // Always show the most recent messages by default
  const getPagedMessages = (page: number) => {
    const startIndex = messages.length - (page * itemsPerPage);
    const endIndex = messages.length - ((page - 1) * itemsPerPage);
    return messages.slice(Math.max(0, startIndex), endIndex).reverse();
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(getPagedMessages(page));
  };

  // Don't render pagination if there's only one page or no messages
  if (totalPages <= 1 || messages.length === 0) {
    return null;
  }
  
  return (
    <Pagination className="my-4">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        
        {/* Show up to 5 page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          // Calculate which pages to show based on current page
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ChatPagination;
