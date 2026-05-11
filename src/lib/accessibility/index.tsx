/**
 * Accessibility utilities for semantic HTML and ARIA labels
 */

export interface AccessibilityProps {
  role?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  ariaLive?: "polite" | "assertive" | "off";
  ariaAtomic?: boolean;
  ariaExpanded?: boolean;
  ariaHidden?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export function createAccessibilityAttrs(props: AccessibilityProps): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};

  if (props.role) attrs.role = props.role;
  if (props.ariaLabel) attrs["aria-label"] = props.ariaLabel;
  if (props.ariaDescription) attrs["aria-description"] = props.ariaDescription;
  if (props.ariaLive) attrs["aria-live"] = props.ariaLive;
  if (props.ariaAtomic !== undefined) attrs["aria-atomic"] = props.ariaAtomic;
  if (props.ariaExpanded !== undefined) attrs["aria-expanded"] = props.ariaExpanded;
  if (props.ariaHidden !== undefined) attrs["aria-hidden"] = props.ariaHidden;
  if (props.ariaLabelledBy) attrs["aria-labelledby"] = props.ariaLabelledBy;
  if (props.ariaDescribedBy) attrs["aria-describedby"] = props.ariaDescribedBy;

  return attrs;
}

export const semanticElements = {
  button: {
    role: "button",
    tabIndex: 0,
  },
  link: {
    role: "link",
  },
  navigation: {
    role: "navigation",
    ariaLabel: "Main navigation",
  },
  main: {
    role: "main",
  },
  contentInfo: {
    role: "contentinfo",
  },
  region: (label: string) => ({
    role: "region",
    ariaLabel: label,
  }),
  complementary: {
    role: "complementary",
  },
};

export function createSkipLink(): JSX.Element {
  return (
    <a
      href="#main-content"
      className="absolute top-0 left-0 -translate-x-full focus:translate-x-0 bg-primary text-white px-4 py-2 rounded-br-lg z-50 transition-transform"
    >
      Skip to main content
    </a>
  );
}

export const keyboardNavigation = {
  enterKey: "Enter",
  spaceKey: " ",
  escapeKey: "Escape",
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  arrowLeft: "ArrowLeft",
  arrowRight: "ArrowRight",
  tabKey: "Tab",
  homeKey: "Home",
  endKey: "End",
};

export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  callback: (key: string) => void,
): void {
  callback(event.key);
}

export const focusStyles = `
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-primary
  focus:ring-offset-background
  focus:rounded-md
`;

export const visuallyHidden = "sr-only";
export const visuallyHiddenClass =
  "absolute w-px h-px p-0 -m-px overflow-hidden clip-0 whitespace-nowrap border-0";
