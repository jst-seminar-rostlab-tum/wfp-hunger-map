import { ISubscribe, ITopic } from '../entities/subscribe/Subscribe';

export default interface SubscriptionRepository {
  /**
   * Subscribes a user to a topic.
   * @param subscribe is the subscription details.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  subscribe(subscribe: ISubscribe): Promise<boolean>;

  /**
   * get all the topics that a user can subscribe to.
   * @returns A promise that resolves to an array of topics.
   */
  getSubscribeTopic(): Promise<ITopic[]>;
}
