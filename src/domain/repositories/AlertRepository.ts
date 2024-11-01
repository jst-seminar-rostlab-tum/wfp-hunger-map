import { Conflict } from '../entities/alerts/Conflict';
import { Hazard } from '../entities/alerts/Hazard';

export interface AlertRepository {
  getHazardData(): Promise<Hazard[]>;
  getConflictData(): Promise<Conflict[]>;
}
