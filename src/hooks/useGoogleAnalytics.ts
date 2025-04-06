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
  // Create a Promise-based trackEvent function that works in SSR and client
  const trackEvent = async (event: { action: string; category: string; label: string }): Promise<void> => {
    if (typeof window === 'undefined') {
      // Return resolved promise in SSR context
      return Promise.resolve();
    }
    
    // Return a Promise that resolves when tracking is complete
    return new Promise((resolve) => {
      // Ensure gtag exists before trying to use it
      if (window.gtag) {
        try {
          window.gtag('event', 'click', {
            link_url: event.action,
            link_text: event.label,
          });
        } catch (error) {
          console.error('Google Analytics tracking error:', error);
        }
      }
      // Resolve immediately since GA tracking is non-blocking
      resolve();
    });
  };

  return { trackEvent };
}; 