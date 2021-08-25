import dynamic from 'next/dynamic';

export * from './avatar';
export * from './button';
export * from './checkbox';
export * from './collapse';
export * from './date-picker';
export * from './drawer';
export * from './dropdown';
export * from './evaluate';
export * from './form-item';
export * from './input';
export * from './modal';
export * from './select';
export * from './select-multi';
export * from './tabs';
export const Editor = dynamic(() => import('./editor'), { ssr: false });
