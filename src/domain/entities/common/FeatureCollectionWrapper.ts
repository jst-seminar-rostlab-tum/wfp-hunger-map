export interface FeatureCollectionWrapper<T> {
  statusCode: string;
  body: {
    type: string;
    features: T[];
  };
}
