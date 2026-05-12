"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const DESKTOP_MEDIA = "(min-width: 768px) and (hover: hover) and (pointer: fine)";
const SNAP_SELECTOR = "[data-scroll-assist-section]";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Mobile has native momentum scroll; Lenis interferes with position:sticky
    // freeze animations on mobile so skip it entirely below 768px.
    if (window.innerWidth <= 767) return;

    const snapAssistDisabled = pathname === "/custom-series" || pathname === "/signature-series";

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const desktopQuery = window.matchMedia(DESKTOP_MEDIA);
    let lastWheelDirection: 1 | -1 = 1;
    let snapLock = false;
    let snapLockTimer = 0;

    const getSnapSections = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>(SNAP_SELECTOR))
        .filter((section) => section.offsetParent !== null);

      if (pathname === "/restaurants") {
        return sections.filter((section) => section.dataset.scrollAssistRestaurants === "true");
      }

      return sections;
    };

    const releaseSnapLock = () => {
      window.clearTimeout(snapLockTimer);
      snapLockTimer = window.setTimeout(() => {
        snapLock = false;
      }, 950);
    };

    const scrollToSection = (section: HTMLElement) => {
      snapLock = true;
      lenis.scrollTo(section, {
        duration: 1.45,
        easing: (t) => (
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2
        ),
        lock: true,
      });
      releaseSnapLock();
    };

    const maybeAssistToSection = () => {
      if (!desktopQuery.matches || snapLock || document.documentElement.classList.contains("intro-running")) {
        return;
      }

      const sections = getSnapSections();
      if (sections.length < 2) return;

      const viewportH = window.innerHeight;

      if (lastWheelDirection > 0) {
        const currentIndex = sections.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top < 0 && rect.bottom <= viewportH * 1.08 && rect.bottom > viewportH * 0.18;
        });

        if (currentIndex === -1) return;

        const nextSection = sections[currentIndex + 1];
        if (sections[currentIndex].dataset.scrollAssistSkipNext === "true") return;
        if (nextSection) scrollToSection(nextSection);
        return;
      }

      const currentIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -viewportH * 0.08 && rect.top < viewportH * 0.52;
      });

      const previousSection = sections[currentIndex - 1];
      if (sections[currentIndex]?.dataset.scrollAssistSkipPrev === "true") return;
      if (previousSection) scrollToSection(previousSection);
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      lastWheelDirection = event.deltaY > 0 ? 1 : -1;
      window.setTimeout(maybeAssistToSection, 140);
    };

    // Only pause while the homepage intro is actively running. Non-home pages do
    // not add intro-done, so treating its absence as a lock can freeze scrolling.
    const html = document.documentElement;
    const syncIntroState = () => {
      if (html.classList.contains("intro-running")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    syncIntroState();
    const observer = new MutationObserver(syncIntroState);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    if (!snapAssistDisabled) {
      window.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      if (!snapAssistDisabled) {
        window.removeEventListener("wheel", handleWheel);
      }
      window.clearTimeout(snapLockTimer);
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
