// TypingTextProps is a type that defines the props for the TypingText component
export default interface TypingTextProps {
  text: string;
  speed?: number;
  endSentencePause?: number;
  onTypingComplete?: () => void;
}
