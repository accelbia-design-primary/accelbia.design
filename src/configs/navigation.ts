/**
 * Navigation configuration for the application
 * Control visibility and state of navigation elements site-wide
 */

export interface NavigationConfig {
  buttonVisible: boolean;
  buttonDisabled?: boolean; // If true, shows the element but makes it non-clickable (grayed out)
}

export interface NavigationElements {
  about: NavigationConfig;
  contact: NavigationConfig;
  explore: NavigationConfig;
  workForUs: NavigationConfig;
  secrets: NavigationConfig;
  feedback: NavigationConfig;
}

/**
 * Navigation configuration
 * Set buttonVisible: true to show the element
 * Set buttonVisible: false to hide the element completely
 * Set buttonDisabled: true to show the element but make it non-clickable (grayed out)
 */
export const navigationConfig: NavigationElements = {
  about: {
    buttonVisible: true,
    buttonDisabled: false,
  },
  contact: {
    buttonVisible: true,
    buttonDisabled: false,
  },
  explore: {
    buttonVisible: false,
    buttonDisabled: false,
  },
  workForUs: {
    buttonVisible: true,
    buttonDisabled: false,
  },
  secrets: {
    buttonVisible: false,
    buttonDisabled: false,
  },
  feedback: {
    buttonVisible: true,
    buttonDisabled: true,
  },
};

/**
 * Helper function to check if a navigation element should be shown
 */
export const isNavigationEnabled = (
  element: keyof NavigationElements
): boolean => {
  return navigationConfig[element].buttonVisible;
};

/**
 * Helper function to check if a navigation element should be disabled
 */
export const isNavigationDisabled = (
  element: keyof NavigationElements
): boolean => {
  return navigationConfig[element].buttonDisabled || false;
};

/**
 * Helper function to get navigation element classes
 */
export const getNavigationClasses = (
  element: keyof NavigationElements,
  baseClass: string,
  disabledClass: string
): string => {
  if (!isNavigationEnabled(element)) return "";
  return isNavigationDisabled(element)
    ? `${baseClass} ${disabledClass}`
    : baseClass;
};
