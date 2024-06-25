export const getTabIconColor = (
  tabSelectedName: string,
  tabName: string,
  theme: string | undefined = "light"
): string => {
  if (tabSelectedName === tabName) {
    return theme === "light" ? "white" : "white";
  } else {
    return theme === "light" ? "black" : "white";
  }
};
