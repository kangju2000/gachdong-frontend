import { QueryClient } from '@tanstack/react-query';
import type { QueryFunction, QueryKey } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { cache, type PropsWithChildren } from 'react';
import { HydrateOnClient } from './hydrate-on-client';

type Query = {
  queryKey: QueryKey;
  queryFn: QueryFunction;
};

type Props = {
  queries: Query | Query[];
};

const PrefetchHydration = async ({ queries, children }: PropsWithChildren<Props>) => {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  const queryList = Array.isArray(queries) ? queries : [queries];

  for (const { queryKey, queryFn } of queryList) {
    queryClient.prefetchQuery({ queryKey, queryFn });
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
};

export { PrefetchHydration };
