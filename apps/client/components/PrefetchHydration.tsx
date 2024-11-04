import { QueryClient } from '@tanstack/react-query';
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { cache, Suspense, type PropsWithChildren } from 'react';
import { HydrateOnClient } from './hydrate-on-client';

type Props<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = {
  queries: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>[];
};

export async function PrefetchHydration<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({ queries, children }: PropsWithChildren<Props<TQueryFnData, TError, TData, TQueryKey>>) {
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
