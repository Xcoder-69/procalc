export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--primary) / 0.5)", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" stroke="url(#logo-gradient)" />
    <rect width="10" height="6" x="7" y="6" rx="1" fill="hsl(var(--background))" stroke="url(#logo-gradient)" strokeWidth="1" />
    <line x1="8" y1="15" x2="8" y2="15" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="12" y1="15" x2="12" y2="15" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="16" y1="15" x2="16" y2="15" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="8" y1="19" x2="8" y2="19" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="12" y1="19" x2="12" y2="19" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="16" y1="19" x2="16" y2="19" stroke="url(#logo-gradient)" strokeWidth="2" />
  </svg>
);
