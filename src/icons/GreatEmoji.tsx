import { colors } from "@/styles/colors";

export function GreatEmoji({ selected }: { selected: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_5813_90505)">
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
          d="M9 9H9.01"
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
          d="M15 9H15.01"
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
          d="M16 13H8M8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13H8Z"
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
        <clipPath id="clip0_5813_90505">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
