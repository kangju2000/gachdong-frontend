import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error }: FallbackProps) {
  return <div>{error.message}</div>;
}
