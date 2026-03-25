"use client"

import { useEffect } from "react"

interface WindowWithGA extends Window {
  gtag: (type: 'event', eventName: string, params?: Record<string, string>) => void;
}

declare const window: WindowWithGA;

export function TrackClicks() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track-event]");
      if (!el || !window.gtag) return;

      const event = el.dataset.trackEvent!;
      const params: Record<string, string> = {};

      if (el.dataset.trackCategory) params.event_category = el.dataset.trackCategory;
      if (el.dataset.trackLabel) params.event_label = el.dataset.trackLabel;
      if (el.dataset.trackUrl) params.link_url = el.dataset.trackUrl;

      try {
        window.gtag("event", event, params);
      } catch {
        // silently ignore tracking errors
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
