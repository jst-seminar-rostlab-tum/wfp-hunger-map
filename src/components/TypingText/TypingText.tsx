import React, { useEffect, useState } from 'react';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { STORAGE_KEYS, TYPING_SPEEDS } from '@/domain/constant/chatbot/TypingText';
import { TypingProgress } from '@/domain/entities/chatbot/TypingText';
import type TypingTextProps from '@/domain/props/TypingTextProps';

// Markdown components configuration
const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-0" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="text-sm sm:text-base my-2 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-2 sm:pl-4 my-2 space-y-1 text-sm sm:text-base" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-2 sm:pl-4 my-2 space-y-1 text-sm sm:text-base" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="ml-2" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-2 sm:pl-3 my-2 italic text-sm sm:text-base"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // may be removed later since code rendering not supported
  code: ({ children, ...props }) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-xs sm:text-sm" {...props}>
      {children}
    </code>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-brand hover:text-brandHover underline text-sm sm:text-base"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

  hr: (props) => <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />,
};

/**
 * Utility function to normalize markdown text
 * Removes extra whitespace and normalizes line endings
 */
const normalizeMarkdown = (rawText: string): string => {
  return rawText
    .trim()
    .replace(/\r\n|\r/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
};

/**
 * TypingText Component
 * Renders markdown text with a typewriter effect
 *
 * @param {Object} props - The properties object
 * @param {string} props.text - The initial markdown text to be displayed
 * @param {string} props.id - Unique identifier for the text
 * @param {number} [props.speed=TYPING_SPEEDS.MIN_SPEED] - Typing speed in milliseconds
 * @param {boolean} props.isUserMessageSent - Flag indicating if a (new) user message is sent
 * @param {function} props.onTypingStart - Callback function to be called when typing starts
 * @param {number} [props.chatIndex=1] - Index of the chat
 * @param {function} props.onTypingComplete - Callback function to be called when typing completes
 * @returns {JSX.Element} The TypingText component
 */
export default function TypingText({
  text: initialText,
  id,
  speed = TYPING_SPEEDS.MIN_SPEED,
  isUserMessageSent,
  onTypingStart,
  chatIndex = 1,
  onTypingComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const normalizedText = normalizeMarkdown(initialText);

  useEffect(() => {
    let currentIndex = 0;

    const completionKey = STORAGE_KEYS.COMPLETION(id);
    const progressKey = STORAGE_KEYS.PROGRESS(id);

    /**
     * Runs at the beginning of typing animation
     * sets isTyping to false so that dot animation
     * gets cancelled
     */
    const handleTypingStart = async () => {
      if (onTypingStart) {
        await onTypingStart(chatIndex, false);
      }
    };

    /**
     * Calculates typing delay based on progress for
     * dynamic typing animation
     */
    const calculateDelay = (progress: number): number => {
      const progressRatio = progress / normalizedText.length;
      return speed + progressRatio * progressRatio * (TYPING_SPEEDS.MAX_SPEED - TYPING_SPEEDS.MIN_SPEED);
    };

    /**
     * Handles typing animation completion
     */
    const handleTypingComplete = () => {
      localStorage.setItem(completionKey, 'true');
      localStorage.removeItem(progressKey);
      onTypingComplete?.();
    };

    /**
     * Restores typing progress from localStorage
     */
    const restoreProgress = () => {
      const storedProgress = localStorage.getItem(progressKey);
      if (storedProgress) {
        const progress: TypingProgress = JSON.parse(storedProgress);
        const elapsedTime = Date.now() - progress.timestamp;
        const avgCharTime = (TYPING_SPEEDS.MIN_SPEED + TYPING_SPEEDS.MAX_SPEED) / 2;
        const estimatedProgress = Math.floor(elapsedTime / avgCharTime);

        currentIndex = Math.min(progress.index + estimatedProgress, normalizedText.length);
      }
      return currentIndex;
    };

    /**
     * Main typing animation function.
     * Saves progress and estimates further progress
     * for simulating continues typing animation in the background
     *  when chat is re-opened
     */
    const animateText = () => {
      if (currentIndex < normalizedText.length) {
        const delay = calculateDelay(currentIndex);
        setDisplayedText(normalizedText.slice(0, currentIndex + 1));

        // Save progress
        const progress: TypingProgress = {
          index: currentIndex + 1,
          timestamp: Date.now(),
        };
        localStorage.setItem(progressKey, JSON.stringify(progress));

        currentIndex += 1;
        setTimeout(animateText, delay);
      } else {
        handleTypingComplete();
      }
    };

    handleTypingStart();

    // Check if animation is already completed
    if (localStorage.getItem(completionKey) === 'true') {
      setDisplayedText(normalizedText);
    } else {
      // Restore progress and continue animation
      currentIndex = restoreProgress();
      setDisplayedText(normalizedText.slice(0, currentIndex));

      if (currentIndex < normalizedText.length) {
        animateText();
      } else {
        handleTypingComplete();
      }
    }

    // Cleanup function
    return () => {
      if (currentIndex < normalizedText.length) {
        const progress: TypingProgress = {
          index: currentIndex,
          timestamp: Date.now(),
        };
        localStorage.setItem(progressKey, JSON.stringify(progress));
      }
    };
  }, [normalizedText, id, isUserMessageSent]);

  return (
    <div className="prose dark:prose-invert max-w-none break-words text-justify">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={markdownComponents}>
        {displayedText + (displayedText.length === normalizedText.length ? '' : '|')}
      </Markdown>
    </div>
  );
}
