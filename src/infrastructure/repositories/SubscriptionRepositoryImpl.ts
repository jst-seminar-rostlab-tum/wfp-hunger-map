import { ISubscribe } from '@/domain/entities/subscribe/Subscribe';
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
}
