import { Button } from '@nextui-org/button';
import { ArrowRightLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { useMediaQuery } from '@/utils/resolution';

export default function CompareButton() {
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { selectedMapType } = useSelectedMap();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const router = useRouter();
  const handleCompareButtonClick = () => {
    router.push(
      `comparison-portal?countries=${selectedCountryId}&tab=region&regionComparisonCountry=${selectedCountryId}`
    );
    setSelectedCountryId(null);
  };

  if (selectedCountryId === null || selectedMapType !== GlobalInsight.FOOD) {
    return null;
  }

  return isMobile ? (
    <Button
      color="primary"
      className="flex items-center space-x-2"
      variant="solid"
      onClick={handleCompareButtonClick}
      isIconOnly
    >
      <ArrowRightLeft />
    </Button>
  ) : (
    <Button
      color="primary"
      className="flex items-center space-x-2"
      variant="solid"
      startContent={<ArrowRightLeft />}
      onClick={handleCompareButtonClick}
    >
      Compare
    </Button>
  );
}
