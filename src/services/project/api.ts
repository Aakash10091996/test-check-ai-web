import apiClient from "@/config/apiClient";
import type { MarketplaceProject } from "@/types/project";
const PROJECTS_URL = `/component-packs`;

export const projectApi = {
  getProjectByName: (name: string) => ({
    func: () => apiClient.get<MarketplaceProject[]>(`${PROJECTS_URL}/name?name=${name}`),
    key: ["getProjectByName", name],
    successMessage: "",
    errorMessage: "",
  }),
};
