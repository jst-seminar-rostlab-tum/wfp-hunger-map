import { SubmitStatus } from '../enums/SubscribeTopic';

export interface SubmitButtonProps {
  label: string;
  submitStatus: SubmitStatus;
  className: string;
}
