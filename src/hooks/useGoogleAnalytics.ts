type GtagArgs = [
  type: 'event',
  action: string,
  params: {
    event_category: string;
    event_label: string;
    [key: string]: string;
  }
];

interface WindowWithGA extends Window {
  gtag: (...args: GtagArgs) => void;
}

declare const window: WindowWithGA;

export const useGoogleAnalytics = () => {
  const trackEvent = (event: { action: string; category: string; label: string }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
      });
    }
  };

  return { trackEvent };
}; 