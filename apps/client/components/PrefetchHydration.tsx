import { QueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { Suspense, cache, type PropsWithChildren } from 'react';
import { HydrateOnClient } from './hydrate-on-client';
import { LoadingSpinner } from './loading-spinner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUseQueryOptions = UseQueryOptions<any, any, any, any>;

type Props = {
  queries: AnyUseQueryOptions[];
  fallback?: React.ReactNode;
};

export async function PrefetchHydration({
  queries,
  fallback = <LoadingSpinner />,
  children,
}: PropsWithChildren<Props>) {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  for (const query of queries) {
    await queryClient.prefetchQuery({
      ...query,
      staleTime: 5 * 1000,
      gcTime: 10 * 1000,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </HydrateOnClient>
  );
}
