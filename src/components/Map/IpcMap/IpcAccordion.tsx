import CustomAccordion from '@/components/Accordions/Accordion';
import CustomCard from '@/components/Cards/Card';
import IpcAccordionProps from '@/domain/props/IpcAccordionProps';
import { cardsWrapperClass } from '@/utils/primitives';

import { ReactComponent as FoodConsumption } from '../../../../public/Images/FoodConsumption.svg';
import { ReactComponent as Population } from '../../../../public/Images/Population.svg';

export default function IpcAccordion({ countryData }: IpcAccordionProps) {
  const deltaOneMonth = countryData?.fcsMinus1 ? countryData.fcs - countryData.fcsMinus1 : null;
  const deltaThreeMonth = countryData?.fcsMinus3 ? countryData.fcs - countryData.fcsMinus3 : null;
  return (
    <div className="absolute w-[350px] left-[108px] top-4 z-9999">
      <CustomAccordion
        items={[
          {
            title: 'Food Security',
            iconSrc: '/Images/InfoIcon.svg',
            content: (
              <div className={cardsWrapperClass}>
                <CustomCard
                  title="Population"
                  content={[
                    {
                      svgIcon: <Population className="w-full h-full object-contain" />,
                      text: countryData?.population ? `${countryData.population.toFixed(2)} M` : 'N/A',
                      altText: 'Population Icon',
                    },
                  ]}
                />
                <CustomCard
                  title="People with insufficient food consumption"
                  content={[
                    {
                      svgIcon: <FoodConsumption className="w-full h-full object-contain" />,
                      text: countryData?.fcs ? `${countryData.fcs.toFixed(2)} M` : 'N/A',
                      altText: 'Food Consumption Icon',
                    },
                    {
                      imageSrc: deltaOneMonth && deltaOneMonth > 0 ? '/Images/ArrowGreen.svg' : '/Images/ArrowRed.svg',
                      text: deltaOneMonth ? `${deltaOneMonth.toFixed(2)} M` : 'N/A',
                      timeText: '1 Months ago',
                      altText: 'Other Icon',
                    },
                    {
                      imageSrc:
                        deltaThreeMonth && deltaThreeMonth > 0 ? '/Images/ArrowGreen.svg' : '/Images/ArrowRed.svg',
                      text: deltaThreeMonth ? `${deltaThreeMonth.toFixed(2)} M` : 'N/A',
                      timeText: '3 Month ago',
                      altText: 'Other Icon',
                    },
                  ]}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
