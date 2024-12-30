type GtagArgs = [
  type: 'event',
  action: string,
  params: {
    link_url: string;
    link_text: string;
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
      window.gtag('event', 'click', {
        link_url: event.action,
        link_text: event.label,
      });
    }
  };

  return { trackEvent };
}; 