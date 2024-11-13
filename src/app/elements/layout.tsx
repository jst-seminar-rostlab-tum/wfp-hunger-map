import { Topbar } from '@/components/Topbar/Topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
}
