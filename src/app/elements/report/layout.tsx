import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report Viewer',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="">{children}</main>
    </div>
  );
}
