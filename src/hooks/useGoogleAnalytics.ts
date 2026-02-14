type GtagParams = Record<string, string | number | boolean>;

interface WindowWithGA extends Window {
  gtag: (type: 'event', eventName: string, params?: GtagParams) => void;
}

declare const window: WindowWithGA;

export const useGoogleAnalytics = () => {
  const trackEvent = async (
    eventName: string,
    params?: GtagParams
  ): Promise<void> => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      if (window.gtag) {
        try {
          window.gtag('event', eventName, params ?? {});
        } catch (error) {
          console.error('Google Analytics tracking error:', error);
        }
      }
      resolve();
    });
  };

  return { trackEvent };
};
