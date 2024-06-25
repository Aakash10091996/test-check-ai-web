import { colors } from "@/styles/colors";

export function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.381 1.66666L13.3627 4.24229C12.3755 3.66449 11.2264 3.33332 10 3.33332C6.31811 3.33332 3.33334 6.31809 3.33334 9.99999C3.33334 11.2143 3.65799 12.3527 4.22522 13.3333M7.61906 18.3333L6.63729 15.7577C7.62448 16.3355 8.77357 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 9.99999C16.6667 8.7857 16.342 7.64723 15.7748 6.66666"
        stroke={colors.foreground}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
