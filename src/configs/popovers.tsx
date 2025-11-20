export type PopoverType = "feedback" | "contact" | "careers";

export interface PopoverConfig {
  type: PopoverType;
  urlParam: string;
  title: string;
  description: string;
}

/**
 * Configuration mapping for all popovers in the application
 * Maps URL parameters to popover types and their metadata
 */
export const POPOVER_CONFIGS: Record<PopoverType, PopoverConfig> = {
  feedback: {
    type: "feedback",
    urlParam: "feedback",
    title: "Share Your Feedback",
    description:
      "Your feedback helps us improve and deliver better experiences.",
  },
  contact: {
    type: "contact",
    urlParam: "contact",
    title: "Get in Touch",
    description:
      "Ready to transform your ideas into reality? Let's discuss your next project.",
  },
  careers: {
    type: "careers",
    urlParam: "careers",
    title: "Career Opportunities",
    description:
      "Explore our open positions and join us in building exceptional digital experiences.",
  },
};

/**
 * Helper function to get popover config by URL parameter
 */
export const getPopoverConfigByParam = (
  param: string
): PopoverConfig | undefined => {
  return Object.values(POPOVER_CONFIGS).find(
    (config) => config.urlParam === param
  );
};

/**
 * Helper function to generate popover URL
 */
export const generatePopoverUrl = (
  baseUrl: string,
  popoverType: PopoverType
): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("popover", POPOVER_CONFIGS[popoverType].urlParam);
  return url.toString();
};

/**
 * Helper function to clean popover parameter from URL
 */
export const cleanPopoverFromUrl = (): void => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.delete("popover");
  window.history.replaceState({}, "", newUrl.toString());
};
