import { colors } from "@/styles/colors";

export function SadEmoji({ selected }: { selected: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_5813_90481)">
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke={
            selected
              ? colors.likeEmojiStrokeBlueSelected.DEFAULT
              : colors.likeEmojiStrokeBlue.DEFAULT
          }
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 10H9.01"
          stroke={
            selected
              ? colors.likeEmojiStrokeBlueSelected.DEFAULT
              : colors.likeEmojiStrokeBlue.DEFAULT
          }
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 10H15.01"
          stroke={
            selected
              ? colors.likeEmojiStrokeBlueSelected.DEFAULT
              : colors.likeEmojiStrokeBlue.DEFAULT
          }
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.5 15.2497C9.82588 14.9171 10.2148 14.6529 10.6441 14.4725C11.0734 14.2921 11.5344 14.1992 12 14.1992C12.4656 14.1992 12.9266 14.2921 13.3559 14.4725C13.7852 14.6529 14.1741 14.9171 14.5 15.2497"
          stroke={
            selected
              ? colors.likeEmojiStrokeBlueSelected.DEFAULT
              : colors.likeEmojiStrokeBlue.DEFAULT
          }
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5813_90481">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
