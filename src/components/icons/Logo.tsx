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
    <rect width="18" height="18" x="3" y="3" rx="4" stroke="url(#logo-gradient)" />
    <path d="M8 8h8" stroke="url(#logo-gradient)" strokeWidth="2"/>
    <path d="M8 16h8" stroke="url(#logo-gradient)" strokeWidth="2"/>
    <path d="M12 4v16"  stroke="url(#logo-gradient)" strokeWidth="0.5" />
    <path d="M4 12h16"  stroke="url(#logo-gradient)" strokeWidth="0.5"/>
  </svg>
);
