import React, { useEffect, useState } from 'react';

// TypingTextProps is a type that defines the props for the TypingText component
type TypingTextProps = {
  text: string;
  speed?: number;
};

/**
 * TypingText component displays text as if it is being typed out
 * @param param0 is a component that displays text as if it is being typed out
 * @returns typing text animation component
 */
export default function TypingText({ text, speed = 100 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState<string>('');

  const getRandomSpeed = () => Math.floor(Math.random() * (speed + 1));

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, getRandomSpeed());

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <p className="break-words">{displayedText}</p>;
}
