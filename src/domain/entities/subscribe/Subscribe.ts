export interface IOption {
  report_id: string;
  report_name: string;
}

export interface ITopic {
  is_country_selectable: boolean;
  topic_id: string;
  topic_name: string;
  topic_description: string;
  options?: IOption[] | undefined;
}

export interface ISubscribe {
  name: string;
  email: string;
  topic_id?: string;
  organization: string;
  options_id?: string[];
}
