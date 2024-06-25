import apiClient from "@/config/apiClient";
import type { CategoryItem, ElementDetails } from "@/types/uiElement";
const UI_ELEMENT_URL = "/uielements";

export const uiElementsApi = {
  getUielementsCategories: () => ({
    func: () => apiClient.get<CategoryItem[]>(`${UI_ELEMENT_URL}/listcategory`),
    key: ["getUielementsCategory"],
    successMessage: "",
    errorMessage: "",
  }),

  getUielementsList: (name: string) => ({
    func: () =>
      apiClient.get<ElementDetails[]>(`${UI_ELEMENT_URL}/listelements?elementName=${name}`),
    key: ["getUielementsList", name],
    successMessage: "",
    errorMessage: "my custom message",
  }),

  getUiElementListPerCategory: (elementSelected: string, limit = 5) => ({
    func: (offset = 1) =>
      apiClient.get<ElementDetails[]>(
        `${UI_ELEMENT_URL}/listelements?elementName=${elementSelected}&limit=${limit}&offset=${offset}`
      ),
    key: ["getUielementsListInfinite", elementSelected],
    successMessage: "",
    errorMessage: "",
  }),
};
