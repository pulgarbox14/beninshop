/**
 * Jeu d'icones SVG utilise dans toute l'application.
 * Chaque icone accepte une taille et herite de la couleur du texte.
 */
const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export const IconMapPin = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconPhone = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const IconTruck = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const IconSearch = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconCart = ({ size = 22 }) => (
  <svg {...base(size)}>
    <circle cx="9" cy="20" r="1.6" />
    <circle cx="18" cy="20" r="1.6" />
    <path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
  </svg>
);

export const IconUser = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconMenu = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconClose = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconArrowRight = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const IconArrowUp = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

export const IconShield = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const IconHeadset = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
    <path d="M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" />
    <path d="M18 17v1a3 3 0 0 1-3 3h-2" />
  </svg>
);

export const IconBadge = ({ size = 22 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.2 14.3-1.4 7 5.2-2.6 5.2 2.6-1.4-7" />
  </svg>
);

export const IconMail = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7 10-7" />
  </svg>
);

export const IconClock = ({ size = 16 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconTrash = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);

export const IconEdit = ({ size = 17 }) => (
  <svg {...base(size)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

export const IconPlus = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconCheck = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const IconBox = ({ size = 26 }) => (
  <svg {...base(size)}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </svg>
);

export const IconUsers = ({ size = 26 }) => (
  <svg {...base(size)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9.5" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16.5 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);

export const IconMoney = ({ size = 26 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6v12M15 9.2A3 3 0 0 0 12.5 8h-1a2.5 2.5 0 0 0 0 5h1a2.5 2.5 0 0 1 0 5h-1A3 3 0 0 1 9 16.8" />
  </svg>
);

export const IconDashboard = ({ size = 19 }) => (
  <svg {...base(size)}>
    <path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
  </svg>
);

export const IconTag = ({ size = 19 }) => (
  <svg {...base(size)}>
    <path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

export const IconSettings = ({ size = 19 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 13.7H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10.3 3V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const IconLogout = ({ size = 19 }) => (
  <svg {...base(size)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);

export const IconChevronDown = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconAlert = ({ size = 26 }) => (
  <svg {...base(size)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const IconStar = ({ size = 15, filled = true, half = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.6"
  >
    {half && (
      <defs>
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}
    <path
      fill={half ? 'url(#half-star)' : undefined}
      d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
    />
  </svg>
);

export const IconFacebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2a1 1 0 0 1 1-1z" />
  </svg>
);

export const IconInstagram = ({ size = 18 }) => (
  <svg {...base(size)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
);

export const IconWhatsapp = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.1l-.4-.2-2.5.7.7-2.4-.2-.4A8 8 0 0 1 12 4zm-3.3 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3l-.6-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4 0-.5.2-.7l.4-.6.2-.5-.1-.4-.7-1.7c-.2-.4-.4-.4-.6-.4z" />
  </svg>
);

export const IconYoutube = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12zM10 15V9l5.2 3z" />
  </svg>
);
