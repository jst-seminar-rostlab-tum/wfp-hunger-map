import { Chart } from '@/components/chart.tsx';
import MapCaller from '@/components/map-caller.tsx';

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <section className="h-80 w-full">
        <MapCaller />
      </section>
      <Chart />
    </section>
  );
}
