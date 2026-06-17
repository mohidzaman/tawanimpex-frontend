// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Adds `.visible` class when element enters viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Observe a parent and add .visible to all children with .reveal class.
 * Enables stagger animation via .delay-* CSS classes.
 */
export function useStaggerReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px', ...options }
    );

    const observeChildren = (node) => {
      const children = node.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      children.forEach((child) => {
        if (!child.classList.contains('visible')) {
          observer.observe(child);
        }
      });
    };

    // Initial observation
    observeChildren(parent);

    // Observe changes inside parent (dynamic updates)
    const mutationObserver = new MutationObserver(() => {
      observeChildren(parent);
    });

    mutationObserver.observe(parent, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return ref;
}
