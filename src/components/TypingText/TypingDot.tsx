import React from 'react';

export default function TypingDots() {
  return (
    <div className="flex mt-4 ml-2 space-x-2">
      <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse dot-delay-1" />
      <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse dot-delay-2" />
      <span className="inline-block w-2 h-2 bg-current rounded-full animate-pulse dot-delay-3" />
    </div>
  );
}
