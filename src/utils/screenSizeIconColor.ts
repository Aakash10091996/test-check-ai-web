export const getColor = (
  sizeSelectedValue: string,
  screenValue: string,
  theme: string | undefined = "light"
): string => {
  const isSelected = sizeSelectedValue === screenValue;
  const colorForSelected = theme === "light" ? "blue" : "blue";
  const colorForNotSelected = theme === "light" ? "black" : "white";

  return isSelected ? colorForSelected : colorForNotSelected;
};
