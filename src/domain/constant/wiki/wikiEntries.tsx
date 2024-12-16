import {
  foodSecurityDescriptions,
  nutritionDescriptions,
  seasonalDescriptions,
} from '@/domain/constant/dataSources/dataSourceDescriptions';
import { WikiEntry } from '@/domain/entities/wiki/WikiEntry';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const wikiEntries = (
  [
    foodSecurityDescriptions.fcs,
    nutritionDescriptions.malnutritionAcute,
    nutritionDescriptions.malnutritionChronic,
    seasonalDescriptions.rainfall,
    foodSecurityDescriptions.rCsi,
    foodSecurityDescriptions.undernourishment,
    seasonalDescriptions.vegetation,
  ] as WikiEntry[]
)
  .map((wikiEntry) => ({ ...wikiEntry, description: undefined, content: wikiEntry.description }))
  .sort((a, b) => a.title?.localeCompare(b.title));

export default SearchOperations.makeAccordionItemsSearchable(wikiEntries);
