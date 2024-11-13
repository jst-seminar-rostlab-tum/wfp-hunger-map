import { Topbar } from '@/components/Topbar/Topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar />
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 about-page">{children}</main>
    </div>
  );
}
