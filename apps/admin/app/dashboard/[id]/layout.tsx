import { Sidebar } from './sidebar';
import { Header } from './header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      <Sidebar selectedClub={{ id: 1 }} onClubChange={() => {}} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-950 p-6">{children}</main>
      </div>
    </div>
  );
}
