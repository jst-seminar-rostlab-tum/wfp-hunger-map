import { AlertRepositoryImpl } from './infrastructure/repositories/AlertRepositoryImpl';
import ChatbotRepositoryImpl from './infrastructure/repositories/ChatbotRepositoryImpl';
import CountryRepositoryImpl from './infrastructure/repositories/CountryRepositoryImpl';
import GlobalDataRepositoryImpl from './infrastructure/repositories/GlobalDataRepositoryImpl';
import SubscriptionRepositoryImpl from './infrastructure/repositories/SubscriptionRepositoryImpl';

class Container {
  private dependencies: { [key: string]: unknown } = {};

  register<T>(key: string, dependency: T) {
    this.dependencies[key] = dependency;
  }

  resolve<T>(key: string): T {
    if (Object.prototype.hasOwnProperty.call(this.dependencies, key)) {
      return this.dependencies[key] as T;
    }
    throw new Error(`Dependency '${key}' is not registered.`);
  }
}

const container = new Container();

container.register('CountryRepository', new CountryRepositoryImpl());
container.register('AlertRepository', new AlertRepositoryImpl());
container.register('GlobalDataRepository', new GlobalDataRepositoryImpl());
container.register('ChatbotRepository', new ChatbotRepositoryImpl());
container.register('SubscriptionRepository', new SubscriptionRepositoryImpl());

export default container;
