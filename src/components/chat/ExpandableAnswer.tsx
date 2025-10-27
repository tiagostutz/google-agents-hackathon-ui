import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MarkdownContent from './MarkdownContent';

interface ExpandableAnswerProps {
  summary?: string;
  detailed?: string;
  fallback: string; // Use this if summary/detailed not available
}

const ExpandableAnswer: React.FC<ExpandableAnswerProps> = ({ summary, detailed, fallback }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If no summary/detailed, just show the fallback content
  if (!summary && !detailed) {
    return (
      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-2xl">
        <MarkdownContent content={fallback} />
      </div>
    );
  }

  // Determine what to show
  const hasExpandable = summary && detailed && summary !== detailed;
  const displayText = isExpanded ? (detailed || fallback) : (summary || fallback);

  return (
    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-2xl">
      <MarkdownContent content={displayText} />

      {hasExpandable && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more details
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableAnswer;
