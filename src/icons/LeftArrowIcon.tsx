export function LeftArrowIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 8L6 12M6 12L10 16M6 12L18 12"
        stroke={color ? color : "#28303F"}
        fill={"#28303F"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
