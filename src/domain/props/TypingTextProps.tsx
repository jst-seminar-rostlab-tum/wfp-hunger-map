// TypingTextProps is a type that defines the props for the TypingText component
export default interface TypingTextProps {
  text: string;
  id: string;
  speed?: number;
  isUserMessageSent?: boolean;
  chatIndex?: number;
  onTypingStart?: (chatIndex: number, isTyping: boolean) => void;
  onTypingComplete?: () => void;
}
