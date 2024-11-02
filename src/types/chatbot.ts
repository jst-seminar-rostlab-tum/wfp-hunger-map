export interface IMessage {
  text: string;
  sender: 'user' | 'ai';
  dataSources?: string[];
}

export interface IChat {
  id: number;
  title: string;
  messages: IMessage[];
}

export const DEFAULT_PROMPT = [
  { id: 1, value: 'What is the current hunger situation in Africa?' },
  { id: 2, value: 'How does climate change affect food security?' },
  { id: 3, value: "What are WFP's main initiatives to combat hunger?" },
];
