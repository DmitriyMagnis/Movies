import { useEffect, useRef, useState, type MutableRefObject } from 'react';

interface Options {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export const useIntersectionObserver = (
  options: Options = {}
): HookReturnType => {
  const { threshold = 1, root = null, rootMargin = '0px' } = options;
  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setEntry(entry);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, {
      threshold,
      root,
      rootMargin,
    });
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin]);

  return [targetRef, entry];
};
