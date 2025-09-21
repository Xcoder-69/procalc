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
        <stop offset="0%" stopColor="hsl(330, 83%, 58%)" />
        <stop offset="100%" stopColor="hsl(280, 83%, 58%)" />
      </linearGradient>
    </defs>
    <path
      stroke="url(#logo-gradient)"
      d="M12.55,2.429A5.823,5.823,0,0,0,8.429,0H5.823A5.823,5.823,0,0,0,0,5.823v2.606a5.823,5.823,0,0,0,2.429,4.122"
      transform="translate(4 4)"
    />
     <path
      stroke="url(#logo-gradient)"
      d="M2.429,12.55A5.823,5.823,0,0,0,0,8.429V5.823A5.823,5.823,0,0,0,5.823,0h2.606a5.823,5.823,0,0,0,4.122,2.429"
       transform="translate(4 4) rotate(180) translate(-12.551 -12.55)"
    />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="hsl(var(--primary) / 0.1)" stroke="url(#logo-gradient)" strokeWidth="0.5" />
    <line x1="10" y1="10.5" x2="10" y2="10.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="10.5" x2="12" y2="10.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="10.5" x2="14" y2="10.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="12.5" x2="10" y2="12.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="12.5" x2="12" y2="12.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="12.5" x2="14" y2="12.5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
