import React, { useEffect, useState } from 'react';

import TypingTextProps from '@/domain/props/TypingTextProps';

/**
 * TypingText component displays text as if it is being typed out
 * @param param0 is a component that displays text as if it is being typed out
 * @returns typing text animation component
 */
export default function TypingText({ text, speed = 50, endSentencePause = 500, onTypingComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState<string>('');

  // Generate random speed for each character
  // TBD: since we get all text from backend and show animation in front-end,
  // Is it really necessary to generate random speed for each character?
  // This component could be removed when text rendering is done from markdown
  const getCharacterSpeed = (char: string) => {
    if (['.', '?', '!'].includes(char)) {
      return endSentencePause; // set more pause for end of sentence
    }
    return Math.floor(Math.random() * speed); // random speed for each character
  };

  useEffect(() => {
    let index = 0;

    const typeCharacter = () => {
      if (index < text.length - 1) {
        const currentChar = text[index];
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
        setTimeout(typeCharacter, getCharacterSpeed(currentChar)); // Generate a new timeout with random speed
      } else if (onTypingComplete) {
        onTypingComplete(); // Call onTypingComplete callback when typing is complete
      }
    };

    typeCharacter(); // Start typing

    return () => {
      index = text.length; // Cleanup function to stop typing when component unmounts
    };
  }, [text, speed]);

  return (
    <p className="break-words text-justify">
      {displayedText}
      {/* show typing cursor */}
      {displayedText.length < text.length && <span className="inline-block animate-blink">|</span>}
    </p>
  );
}
