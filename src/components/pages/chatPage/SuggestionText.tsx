import { useState } from "react";
import { LeftDownArrow } from "@/icons";
function SuggestionText({
  suggestionText,
  isSelected,
  isDisabled,
  onClick,
}: {
  suggestionText: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="button"
      className={`mb-1.5 inline-flex h-[30px] w-full items-center justify-start gap-x-2 rounded-[3px] border border-greyWhite px-3 py-2 text-left align-middle text-sm font-normal leading-[18px] text-lightBlack hover:border-blackVariant dark:border-blackBgNewVariant dark:bg-blackBgNewVariant dark:text-white dark:shadow-suggestionShadow dark:hover:border-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-accent
      ${isSelected ? "cursor-default border-blackVariant bg-blackVariant text-white dark:border-blackBgNewVariant dark:bg-blackBgNewVariant" : "bg-greyWhite"}
      `}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="w-[calc(100%-12px)] truncate">{suggestionText}</span>
      {isHovered && !isSelected && (
        <div
          className={`flex size-[16.67px] items-center justify-center rounded border border-pureBlack-foreground dark:border-white ${isSelected && "border-white bg-blackVariant text-white"}
        `}
        >
          <div
            className={`text-pureBlack-foreground dark:text-white ${isSelected && "text-white"}`}
          >
            <LeftDownArrow />
          </div>
        </div>
      )}
    </button>
  );
}

export default SuggestionText;
