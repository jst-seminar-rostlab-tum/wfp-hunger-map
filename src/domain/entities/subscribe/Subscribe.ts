export interface ITopic {
  topic_id: string;
  topic_name: string;
  topic_description: string;
  options?: string[];
}

export interface ISubscribe {
  name: string;
  email: string;
  topic_id?: string;
  organization: string;
  options?: string[];
}
