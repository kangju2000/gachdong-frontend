import { NavigationSection } from './navigation-section';
import { AuthSection } from './auth-section';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { authQueries } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerToken } from '@/lib/auth/cookies';

export async function Header() {
  const { accessToken } = await getServerToken();

  return (
    <PrefetchHydration queries={accessToken ? [authQueries.profile()] : []}>
      <header className="bg-background fixed top-0 z-50 w-full border-b">
        <div className="mx-auto flex h-[68px] max-w-[980px] items-center justify-between px-4 py-4">
          <NavigationSection />
          {accessToken ? (
            <AuthSection />
          ) : (
            <Button asChild>
              <Link href="/login">로그인</Link>
            </Button>
          )}
        </div>
      </header>
      <div className="h-[68px]" />
    </PrefetchHydration>
  );
}
