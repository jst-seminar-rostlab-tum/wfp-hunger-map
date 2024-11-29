import { ISubscribe, ITopic } from '@/domain/entities/subscribe/Subscribe';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async subscribe(subscribe: ISubscribe): Promise<boolean> {
    try {
      // TODO: endpoint is not clear right now, can change later
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribe),
      });

      if (response.ok) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSubscribeTopic(): Promise<ITopic[]> {
    try {
      const response = await fetch(`${process.env.NEXT_EMAIL_SERVICE}/topics.json`);

      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Failed to fetch topics'));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
