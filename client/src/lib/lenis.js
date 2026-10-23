import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function scrollToTarget(target) {
  try {
    if (typeof target === 'number') {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }

    let el = null;
    if (typeof target === 'string') {
      el = document.querySelector(target);
    } else if (target?.current) {
      el = target.current;
    } else if (target instanceof Element) {
      el = target;
    }

    if (el) {
      if (lenisInstance) {
        lenisInstance.scrollTo(el, { duration: 1.2, offset: -60 });
      } else if (el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  } catch (err) {
    console.warn("Scroll fallback:", err);
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}
