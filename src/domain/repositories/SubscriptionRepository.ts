import { ISubscribe } from '../entities/subscribe/Subscribe';

export default interface SubscriptionRepository {
  /**
   * Subscribes a user to a topic.
   * @param subscribe is the subscription details.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  subscribe(subscribe: ISubscribe): Promise<boolean>;
}
