import apiClient from "@/config/apiClient";
import type { CreateThemePayload, Theme, UpdateThemePayload } from "@/types/theme";

export const themeApi = {
  create: () => ({
    func: (data: CreateThemePayload) => apiClient.post<Theme>(`/global-theme`, data),
    key: ["createTheme"],
    successMessage: "",
    errorMessage: "",
  }),
  get: (field?: string) => ({
    func: () => apiClient.get<Array<Theme>>(`/global-theme/?field=${field}`),
    key: ["getThemes"],
    successMessage: "",
    errorMessage: "",
  }),
  update: () => ({
    func: (data: UpdateThemePayload) =>
      apiClient.patch<Theme>(`/global-theme/${data?.id}`, data?.data),
    key: ["updateTheme"],
    successMessage: "",
    errorMessage: "",
  }),
};
