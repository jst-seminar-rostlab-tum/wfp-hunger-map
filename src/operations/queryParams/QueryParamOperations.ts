import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

/**
 * Convert the `alert=...` query param string into an `AlertType`.
 * @param {string | null} alertParam the query param, e.g. 'countryAlerts'
 * @param {number} countryId the currently selected country
 * @return {AlertType} an AlertType to work with
 */
export const readAlertFromQueryParam = (alertParam: string | null, countryId: number | null) => {
  switch (alertParam) {
    case 'none':
      return null;
    case 'conflicts':
      return AlertType.CONFLICTS;
    case 'hazards':
      return AlertType.HAZARDS;
    case 'countryAlerts':
      return AlertType.COUNTRY_ALERTS;
    default:
      if (countryId) return null;
      return AlertType.COUNTRY_ALERTS;
  }
};

/**
 * Convert the `mapType=...` query param string into a `GlobalInsight` value.
 * @param {string | null} mapTypeParam the query param, e.g. 'food'
 * @return {AlertType} an AlertType to work with
 */
export const readMapTypeFromQueryParam = (mapTypeParam: string | null) => {
  switch (mapTypeParam) {
    case 'nutrition':
      return GlobalInsight.NUTRITION;
    case 'ipc':
      return GlobalInsight.IPC;
    case 'rainfall':
      return GlobalInsight.RAINFALL;
    case 'vegetation':
      return GlobalInsight.VEGETATION;
    default:
      return GlobalInsight.FOOD;
  }
};
