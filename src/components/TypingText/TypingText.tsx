import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import MarkdownComponents from '@/components/TypingText/MarkdownComponents';
import { STORAGE_KEYS, TYPING_SPEEDS } from '@/domain/constant/chatbot/TypingText';
import type TypingTextProps from '@/domain/props/TypingTextProps';
import TypingAnimationOperations from '@/operations/chatbot/TypingAnimationOperations';

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
  textID,
  isUserMessageSent, // TBD: remove this prop? (depending on how typing dots is handled)
  onTypingStart,
  chatIndex = 1,
  onTypingComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const normalizedText = TypingAnimationOperations.normalizeMarkdown(initialText);
  const completionKey = STORAGE_KEYS.COMPLETION(textID);
  const progressKey = STORAGE_KEYS.PROGRESS(textID);

  useEffect(() => {
    /**
     * Runs at the beginning of typing animation
     * sets isTyping to false so that dot animation
     * gets cancelled
     */
    const handleTypingStart = async (): Promise<void> => {
      if (onTypingStart) {
        await onTypingStart(chatIndex, false);
      }
    };

    /**
     * Runs when the typing animation is finished to mark it as completed
     * (so that it does not get simulated as if it was running in the background)
     * and removes the progress from localStorage
     */
    const handleFinishedAnimation = (): void => {
      localStorage.setItem(completionKey, 'true');
      localStorage.removeItem(progressKey);
    };

    /**
     * Calculates typing delay for the speed of the typing animation.
     * Uses a quadratic function based approach.
     */
    const calculateDelay = (progress: number): number => {
      const progressRatio = progress / normalizedText.length;
      return (
        TYPING_SPEEDS.MIN_SPEED + progressRatio * progressRatio * (TYPING_SPEEDS.MAX_SPEED - TYPING_SPEEDS.MIN_SPEED)
      );
    };

    /**
     * Updates the displayed text with the current progress of the typing animation
     * and saves the progress to localStorage
     */
    const updateDisplayedTextProgress = (currentCharIndex: number): void => {
      setDisplayedText(normalizedText.slice(0, currentCharIndex + 1));
      TypingAnimationOperations.saveAnimatedProgress(currentCharIndex, progressKey);
    };

    /**
     * Main Typing Animation function:
     * Handles the typing animation by progressively displaying characters
     * from the normalized text. It calculates the delay for each character
     * based on the current typing speed and updates the displayed text
     * accordingly. The function continues to call itself recursively until
     * all characters have been displayed, at which point it triggers the
     * completion handler to mark the animation as completed.
     */
    const animateText = (currentCharIndex: number): void => {
      const isAnimationCompleted = localStorage.getItem(completionKey) === 'true';
      if (!isAnimationCompleted) {
        if (currentCharIndex < normalizedText.length) {
          const animationDelay = calculateDelay(currentCharIndex);
          updateDisplayedTextProgress(currentCharIndex);
          setTimeout(() => animateText(currentCharIndex + 1), animationDelay);
        } else {
          handleFinishedAnimation();
        }
      } else {
        setDisplayedText(normalizedText);
      }
    };

    const currentCharIndex = TypingAnimationOperations.restoreAnimatedProgress(progressKey, normalizedText.length);
    handleTypingStart();
    animateText(currentCharIndex);

    return () => {
      onTypingComplete?.();
    };
  }, [normalizedText, textID, isUserMessageSent]);

  return (
    <div className="prose dark:prose-invert max-w-none break-words text-justify">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={MarkdownComponents}>
        {displayedText + (displayedText.length === normalizedText.length ? '' : '|')}
      </Markdown>
    </div>
  );
}
