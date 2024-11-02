import { Conflict } from '@/domain/entities/alerts/Conflict';
import { Hazard } from '@/domain/entities/alerts/Hazard';
import { FeatureCollectionWrapper } from '@/domain/entities/common/FeatureCollectionWrapper';
import { ResponseWrapper } from '@/domain/entities/common/ResponseWrapper';
import { AlertRepository } from '@/domain/repositories/AlertRepository';

export class AlertRepositoryImpl implements AlertRepository {
  async getHazardData(): Promise<Hazard[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdc.json`);
    const data: ResponseWrapper<Hazard> = await response.json();
    return data.body;
  }

  async getConflictData(): Promise<Conflict[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acled.geojson`);
    const data: FeatureCollectionWrapper<Conflict> = await response.json();
    return data.body.features;
  }
}
