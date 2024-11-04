import { NavigationSection } from './navigation-section';
import { AuthSection } from './auth-section';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { authQueries } from '@/apis/auth';

export function Header() {
  return (
    <PrefetchHydration queries={[authQueries.profile()]}>
      <header className="bg-background sticky top-0 z-50 border-b">
        <div className="mx-auto flex min-h-[68px] max-w-[980px] items-center justify-between px-4 py-4">
          <NavigationSection />
          <AuthSection />
        </div>
      </header>
    </PrefetchHydration>
  );
}
