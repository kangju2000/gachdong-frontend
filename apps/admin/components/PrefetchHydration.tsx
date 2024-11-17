import { QueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { cache, type PropsWithChildren } from 'react';
import { HydrateOnClient } from './hydrate-on-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUseQueryOptions = UseQueryOptions<any, any, any, any>;

type Props = {
  queries: AnyUseQueryOptions[];
};

export async function PrefetchHydration({ queries, children }: PropsWithChildren<Props>) {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  await Promise.all(
    queries.map(query =>
      queryClient.prefetchQuery({
        ...query,
        staleTime: 5 * 1000,
        gcTime: 10 * 1000,
      })
    )
  );

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
}
