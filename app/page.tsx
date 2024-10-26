import { Button } from '@nextui-org/button';

import { Chart } from '@/components/chart.tsx';
import MapCaller from '@/components/map-caller.tsx';

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="flex gap-2">
        <Button color="primary">Primary button</Button>
        <Button color="secondary">Secondary button</Button>
        <Button color="primary" isDisabled>
          Disabled button
        </Button>
        <Button variant="bordered">Outlined button</Button>
        <Button className="bg-clusterGreen">Cluster green</Button>
        <Button className="bg-clusterOrange">Cluster orange</Button>
        <Button className="bg-clusterRed">Cluster red</Button>
      </div>
      <section className="h-80 w-full">
        <MapCaller />
      </section>
      <Chart />
    </section>
  );
}
