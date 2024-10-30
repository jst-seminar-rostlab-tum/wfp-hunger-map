import CountryRepositoryImpl from './infrastructure/repositories/CountryRepositoryImpl';

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

export default container;
