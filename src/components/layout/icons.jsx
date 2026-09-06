/**
 * Minimal stroke-icon set — one visual language for the whole nav, no
 * emoji. Kept to a single file since they're small and share a viewBox.
 */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconHome = (props) => (
  <svg {...base} {...props}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const IconExplore = (props) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="18" cy="7" r="2.2" />
    <circle cx="8" cy="18" r="2.2" />
    <circle cx="17" cy="17" r="2.2" />
    <path d="M7.8 7.2 16.2 6.8M7.3 8.1l1 8.1M9.8 18l5.8-.8" />
  </svg>
);

export const IconPlay = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l6-3.5-6-3.5Z" />
  </svg>
);

export const IconJourney = (props) => (
  <svg {...base} {...props}>
    <path d="M4 19 9 8l4 6 3-5 4 10" />
    <circle cx="9" cy="8" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLibrary = (props) => (
  <svg {...base} {...props}>
    <path d="M5 4.5h4.5v15H5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" />
    <path d="M10.5 4.5H15a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4.5Z" />
    <path d="M17 6.3 20.2 7.2a1 1 0 0 1 .7 1.23l-2.9 12.06" />
  </svg>
);

export const IconProfile = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8.2" r="3.4" />
    <path d="M5 20c1-3.6 4-5.6 7-5.6s6 2 7 5.6" />
  </svg>
);

export const IconSpark = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5c.4 3.3 1.6 5.6 4.5 6.5-2.9.9-4.1 3.2-4.5 6.5-.4-3.3-1.6-5.6-4.5-6.5 2.9-.9 4.1-3.2 4.5-6.5Z" />
    <path d="M19 15c.2 1.4.7 2.3 2 2.8-1.3.5-1.8 1.4-2 2.8-.2-1.4-.7-2.3-2-2.8 1.3-.5 1.8-1.4 2-2.8Z" />
  </svg>
);

export const IconToken = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.3 14.2c.4.9 1.3 1.4 2.5 1.4 1.6 0 2.7-.8 2.7-1.9 0-2.6-5.2-1.3-5.2-3.8 0-1.1 1.1-1.9 2.6-1.9 1.1 0 2 .5 2.4 1.3M12 7.3v9.4" />
  </svg>
);
