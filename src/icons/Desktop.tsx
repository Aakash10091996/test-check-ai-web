export function DesktopIcon({ color = "currentColor" }) {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3103_44478)">
        <g clipPath="url(#clip1_3103_44478)">
          <rect
            x="11.6665"
            y="7.66666"
            width="16.6667"
            height="13.3333"
            rx="3"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M17.5 24.3333L20 24.3333M22.5 24.3333L20 24.3333M20 24.3333L20 21"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.1665 18.5L20.8332 18.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_3103_44478">
          <rect width="40" height="32" rx="8" fill="white" />
        </clipPath>
        <clipPath id="clip1_3103_44478">
          <rect width="20" height="20" fill="white" transform="translate(10 6)" />
        </clipPath>
      </defs>
    </svg>
  );
}
