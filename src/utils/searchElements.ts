import type { CategoryItem } from "@/types";

export function filterElements(searchString: string, elements: CategoryItem[]): CategoryItem[] {
  return elements.filter((element) => {
    const elementName = element.category ? element.category.toLowerCase() : "";
    return elementName.includes(searchString.trim().toLowerCase());
  });
}
