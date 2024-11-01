import { Conflict } from '../entities/alerts/Conflict';
import { Hazard } from '../entities/alerts/Hazard';

export interface AlertRepository {
  /**
   * Returns all the hazards (flooding, forest fire, etc.) in the world
   */
  getHazardData(): Promise<Hazard[]>;

  /**
   * Returns all the conflicts (battles, riots, etc.) in the world
   */
  getConflictData(): Promise<Conflict[]>;
}
