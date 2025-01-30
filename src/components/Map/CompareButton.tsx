import { Button } from '@nextui-org/button';
import { ArrowRightLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { useMediaQuery } from '@/utils/resolution';

import { Tooltip } from '../Tooltip/Tooltip';

export default function CompareButton() {
  const { selectedCountryId } = useSelectedCountryId();
  const { selectedMapType } = useSelectedMap();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const router = useRouter();
  const handleCompareButtonClick = () => {
    router.push(
      `comparison-portal?countries=${selectedCountryId}&tab=region&regionComparisonCountry=${selectedCountryId}`
    );
  };

  if (selectedCountryId === null || selectedMapType !== GlobalInsight.FOOD) {
    return null;
  }

  return isMobile ? (
    <Tooltip text="Compare Countries" placement="bottom">
      <Button color="primary" variant="solid" onClick={handleCompareButtonClick} isIconOnly>
        <ArrowRightLeft />
      </Button>
    </Tooltip>
  ) : (
    <Button color="primary" variant="solid" startContent={<ArrowRightLeft />} onClick={handleCompareButtonClick}>
      Compare
    </Button>
  );
}
