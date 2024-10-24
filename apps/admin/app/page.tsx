import { redirect } from 'next/navigation';
async function getRecentClub(userId: string): Promise<{ id: string } | null> {
  // TODO: 데이터베이스에서 사용자의 최근 접속 동아리를 조회하는 로직 구현
  return Math.random() > 0.5 ? { id: '1' } : null;
}

export default async function Home() {
  const session = Math.random() > 0.5 ? { user: { id: '1' } } : null;

  if (!session) {
    redirect('/login');
  }

  const userId = session.user.id;
  const recentClub = await getRecentClub(userId);

  if (recentClub) {
    redirect(`/dashboard/${recentClub.id}`);
  } else {
    redirect('/dashboard');
  }
}
