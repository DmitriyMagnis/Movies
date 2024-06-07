import { useEffect, useRef, useState, type MutableRefObject } from 'react';

interface Options {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export const useIntersectionObserver = (
  options: Options = {}
): HookReturnType => {
  const {
    threshold = 1,
    root = null,
    rootMargin = '0px',
    onIntersect,
  } = options;
  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onIntersect?.();
        }

        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin, onIntersect]);

  return [targetRef, entry];
};
