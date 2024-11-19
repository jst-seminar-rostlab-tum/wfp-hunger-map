import { TYPING_SPEEDS } from '@/domain/constant/chatbot/TypingText';
import { TypingProgress } from '@/domain/entities/chatbot/TypingText';

export default class TypingAnimationOperations {
  /**
   * Saves the current progress of the typing animation to localStorage
   * so that the animation can be continued from the same point after re-opening the chat
   * simulating a continues typing animation in the background
   */
  static saveAnimatedProgress(currentCharIndex: number, progressKey: string): void {
    const progress: TypingProgress = {
      index: currentCharIndex + 1,
      timestamp: Date.now(),
    };
    localStorage.setItem(progressKey, JSON.stringify(progress));
  }

  /**
   * Restores typing progress (how far the animation has been completed) from localStorage
   * so that the animation can be continued from the same point after re-opening the chat
   * simulating a continues typing animation in the background
   */
  static restoreAnimatedProgress(progressKey: string, textLength: number): number {
    const storedProgress = localStorage.getItem(progressKey);
    if (storedProgress) {
      const progress: TypingProgress = JSON.parse(storedProgress);
      const elapsedTime = Date.now() - progress.timestamp;
      const avgCharTime = (TYPING_SPEEDS.MIN_SPEED + TYPING_SPEEDS.MAX_SPEED) / 2;
      const estimatedProgress = Math.floor(elapsedTime / avgCharTime);
      const calculatedProgressIndex = Math.min(progress.index + estimatedProgress, textLength);
      return calculatedProgressIndex;
    }
    return 0; // no progress, i.e. start from the beginning
  }

  static normalizeMarkdown(rawText: string): string {
    return rawText
      .trim()
      .replace(/\r\n|\r/g, '\n')
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .replace(/\n\s*\n\s*\n/g, '\n\n');
  }
}
