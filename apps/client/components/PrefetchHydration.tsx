import { QueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { cache, Suspense, type PropsWithChildren } from 'react';
import { HydrateOnClient } from './hydrate-on-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUseQueryOptions = UseQueryOptions<any, any, any, any>;

type Props = {
  queries: AnyUseQueryOptions[];
};

export async function PrefetchHydration({ queries, children }: PropsWithChildren<Props>) {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  for (const query of queries) {
    await queryClient.prefetchQuery(query);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <Suspense>{children}</Suspense>
    </HydrateOnClient>
  );
}
