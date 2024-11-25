import CustomCard from '@/components/Cards/Card';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { cardsWrapperClass } from '@/utils/primitives';

export default class AccordionOperations {
  static getAccordionData(): AccordionItemProps[] {
    return [
      {
        title: 'Food Security',
        infoIcon: <CustomInfoCircle />,
        content: (
          <div className={cardsWrapperClass}>
            <CustomCard
              title="Population"
              content={[{ imageSrc: '/Images/Population.svg', text: '4.4 Mio', altText: 'Population Icon' }]}
            />
            <CustomCard
              title="Food Consumption"
              content={[
                { imageSrc: '/Images/FoodConsumption.svg', text: '11.2 Mio', altText: 'Population Icon' },
                { imageSrc: '/Images/ArrowRed.svg', text: '+ 0.19 Mio', timeText: '3 Months ago', altText: 'Icon' },
                {
                  imageSrc: '/Images/ArrowGreen.svg',
                  text: '- 2.5 Mio ',
                  timeText: 'A Month ago',
                  altText: 'Other Icon',
                },
              ]}
            />
          </div>
        ),
      },
      {
        title: 'Nutrition',
        infoIcon: <CustomInfoCircle />,
        content: (
          <div className={cardsWrapperClass}>
            <CustomCard
              title="Acute Nutrition"
              content={[{ imageSrc: '/Images/Acute.svg', text: '28.0% of Cereals', altText: 'Icon' }]}
            />
            <CustomCard
              title="Chronic Nutrition"
              content={[{ imageSrc: '/Images/Chronic.svg', text: '28.0% of Cereals', altText: 'Icon' }]}
            />
          </div>
        ),
      },
      {
        title: 'Macroeconomic',
        infoIcon: <CustomInfoCircle />,
        content: (
          <div className={cardsWrapperClass}>
            <CustomCard
              title="Import Dependency"
              content={[{ imageSrc: '/Images/Import.svg', text: '28.0% of Cereals', altText: 'Icon' }]}
            />
          </div>
        ),
      },
      {
        title: 'Test',
        infoIcon: <CustomInfoCircle />,
        content: 'Test paragraph ',
      },
    ];
  }
}
