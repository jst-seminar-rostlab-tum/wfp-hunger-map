// Constants for typing animation
// MIN is how fast it should be in the beginning
// MAX is how fast it should be at least when calculating dynamic speed
export const TYPING_SPEEDS = {
  MIN_SPEED: 0.5,
  MAX_SPEED: 10,
};

// Storage key template strings
export const STORAGE_KEYS = {
  COMPLETION: (id: string) => `message-${id}-completed`,
  PROGRESS: (id: string) => `message-${id}-progress`,
};
