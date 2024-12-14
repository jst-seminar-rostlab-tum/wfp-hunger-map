import AccordionContainer from '@/components/Accordions/AccordionContainer';
import { TITLE } from '@/domain/entities/download/Country';

export default function Loading() {
  const loading = true;

  return (
    <div>
      <h1>Download Portal</h1>
      <AccordionContainer
        items={[
          {
            title: 'Country Reports',
          },
          {
            title: TITLE,
          },
        ]}
        loading={loading}
      />
    </div>
  );
}
