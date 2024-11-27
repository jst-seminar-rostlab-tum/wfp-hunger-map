export interface ITopic {
  id: string;
  name: string;
  options?: string[];
}

export interface ISubscribe {
  name: string;
  email: string;
  topicId?: string;
  organization: string;
  options?: string[];
}
