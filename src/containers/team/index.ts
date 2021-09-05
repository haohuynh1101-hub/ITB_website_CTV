import dynamic from 'next/dynamic';

export * from './TeamContainer';
export const TeamEvaluationContainer = dynamic(
  () => import('./TeamEvaluation'),
  {
    ssr: false,
  }
);
