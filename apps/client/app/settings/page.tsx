import { PrefetchHydration } from '@/components/PrefetchHydration';
import { authQueries } from '@/apis/auth';
import { ProfileForm } from './components/profile-form';
import { AccountForm } from './components/account-form';

export default function Settings() {
  return (
    <PrefetchHydration queries={[authQueries.profile()]}>
      <main className="mx-auto max-w-[980px] px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">설정</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileForm />
          <AccountForm />
        </div>
      </main>
    </PrefetchHydration>
  );
}
