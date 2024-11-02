import Chatbot from '@/components/Chatbot/Chatbot';
import MapLoader from '@/components/Map/MapLoader';

export default function Home() {
  return (
    <div className="relative bg-black h-full w-full">
      <Chatbot />
      <MapLoader />
    </div>
  );
}
