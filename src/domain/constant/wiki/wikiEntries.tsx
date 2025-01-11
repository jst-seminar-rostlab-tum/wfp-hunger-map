import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { WikiEntry } from '@/domain/entities/wiki/WikiEntry';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const wikiItems = (
  [
    descriptions.fcs,
    descriptions.hazards,
    descriptions.malnutritionAcute,
    descriptions.malnutritionChronic,
    descriptions.rainfall,
    descriptions.rCsi,
    descriptions.undernourishment,
    descriptions.vegetation,
  ] as WikiEntry[]
)
  .map((wikiEntry) => ({ ...wikiEntry, description: undefined, content: wikiEntry.description }))
  .sort((a, b) => a.title?.localeCompare(b.title));

export default SearchOperations.makeAccordionItemsSearchable(wikiItems);
