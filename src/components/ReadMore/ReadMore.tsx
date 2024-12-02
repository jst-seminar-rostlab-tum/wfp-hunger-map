import { Button } from '@nextui-org/react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

export function ReadMore({
  children,
  maxHeight = 100,
  maxExpandedHeight,
  className = '',
  expandButtonText = 'Read More',
  collapseButtonText = 'Show Less',
}: {
  children: ReactNode;
  maxHeight?: number;
  maxExpandedHeight?: number;
  className?: string;
  expandButtonText?: string;
  collapseButtonText?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const updateHeight = () => {
    if (contentRef.current) {
      const { scrollHeight } = contentRef.current;
      setContentHeight(scrollHeight);
      setIsOverflowing(scrollHeight > maxHeight);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [maxHeight, children]);

  const expandedHeight = maxExpandedHeight ?? contentHeight;

  return (
    <div className={className}>
      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? `${expandedHeight}px` : `${maxHeight}px`,
          overflow: isExpanded ? 'auto' : 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
        aria-expanded={isExpanded}
      >
        {children}
      </div>

      {isOverflowing && (
        <div className="flex justify-center mt-2">
          <Button
            variant="light"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            endContent={isExpanded ? <ArrowUp2 size={16} /> : <ArrowDown2 size={16} />}
            aria-label={isExpanded ? collapseButtonText : expandButtonText}
          >
            {isExpanded ? collapseButtonText : expandButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}
