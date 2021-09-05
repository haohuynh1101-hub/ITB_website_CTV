import dynamic from 'next/dynamic';

export * from './components';
export const EvaluatePersonalContainer = dynamic(
  () => import('./EvaluatePersonalContainer'),
  {
    ssr: false,
  }
);
