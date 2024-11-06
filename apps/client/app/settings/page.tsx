import { PrefetchHydration } from '@/components/PrefetchHydration';
import SettingsContainer from './settings-container';
import { authQueries } from '@/apis/auth';

export default function Settings() {
  return (
    <PrefetchHydration queries={[authQueries.profile()]}>
      <main className="mx-auto max-w-[980px] px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">설정</h1>
        <SettingsContainer />
      </main>
    </PrefetchHydration>
  );
}
