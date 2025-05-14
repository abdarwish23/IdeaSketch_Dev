
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

type UsedToolProps = {
  tool: string;
  toolInput: any;
  toolOutput: string;
};

const UsedToolsDisplay = ({ tools, isLoading = false }: { tools: UsedToolProps[], isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Tools Being Used...</h3>
        <Card className="bg-slate-50 border border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-idea-primary">
              <Skeleton className="h-5 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="py-3 px-4 text-sm">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!tools || tools.length === 0) return null;
  
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Tools Used</h3>
      {tools.map((tool, index) => (
        <Card key={index} className="bg-slate-50 border border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-idea-primary">
              {formatToolName(tool.tool)}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-3 px-4 text-sm">
            <div className="mb-2">
              <span className="font-medium">Input:</span> {formatToolInput(tool.toolInput)}
            </div>
            <div>
              <span className="font-medium">Output:</span>
              <div className="mt-2 whitespace-pre-wrap bg-white p-3 rounded border border-slate-200 text-xs overflow-auto max-h-60 markdown-content">
                <ReactMarkdown>{tool.toolOutput}</ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to format tool name for display
const formatToolName = (toolName: string) => {
  return toolName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format tool input for display
const formatToolInput = (toolInput: any) => {
  if (typeof toolInput === 'object' && toolInput.input) {
    return toolInput.input;
  }
  return JSON.stringify(toolInput);
};

export default UsedToolsDisplay;
