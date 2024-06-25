export function convertCamelCaseToSpacedString(str: string) {
  const words = str?.split(/(?=[A-Z])|_|\s/);
  const capitalizedWords = words?.map((word) => {
    if (word === word?.toUpperCase()) {
      return word;
    }
    return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
  });
  return capitalizedWords?.join(" ");
}

export function convertFirstLetterToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
