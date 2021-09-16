import { useEffect, useRef } from 'react';

export const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (!elementRef || !elementRef.current) return;
    elementRef.current.scrollIntoView();
  }, []);
  return <div ref={elementRef} />;
};
