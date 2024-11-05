import { SenderRole } from '@/domain/enums/SenderRole';

export interface IMessage {
  id: string;
  content: string;
  role: SenderRole.USER | SenderRole.ASSISTANT;
  dataSources?: string[];
}

export interface IChat {
  id: number;
  title: string;
  messages: IMessage[];
}

// static data for the chatbot
export const DEFAULT_PROMPT = [
  { id: 1, value: 'What is the current hunger situation in Africa?' },
  { id: 2, value: 'How does climate change affect food security?' },
  { id: 3, value: "What are WFP's main initiatives to combat hunger?" },
];

export const DEFAULT_DATA_SOURCES = ['HungerMap Live', 'WFP Country Reports', 'FAO Statistics'];

export const DATA_SOURCES = 'Data sources:';

export const WELCOME_MESSAGE = 'Welcome to HungerMap ChatBot!';

export const SUB_WELCOME_MESSAGE = 'How can I assist you today?';

export const NEW_CHAT_BUTTON = 'New Chat';

export const CHAT_TITLE = 'HungerMap ChatBot';
