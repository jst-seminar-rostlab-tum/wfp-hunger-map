import { ISubscribe, ISubscribeResponse, ITopic } from '@/domain/entities/subscribe/Subscribe';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async subscribe(subscribe: ISubscribe): Promise<ISubscribeResponse> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_SERVICE}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribe),
      });

      // TODO: wait backend to return the failed message when subscribe failed
      return Promise.resolve({
        ok: response.ok,
        message: response.ok ? 'Subscribed successfully' : 'Failed to subscribe',
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSubscribeTopic(): Promise<ITopic[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_SERVICE}/topics`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return Promise.resolve(data);
        }
      }
      return Promise.reject(new Error('Failed to fetch topics'));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
