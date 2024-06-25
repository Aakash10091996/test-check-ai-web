import apiClient from "@/config/apiClient";
import type { ProfileDetails } from "@/types/profile";

export const proflieApi = {
  getProfileDetails: () => ({
    func: () => apiClient.get<ProfileDetails>(`/profile`),
    key: ["getProfileDetails"],
    successMessage: "",
    errorMessage: "",
  }),
  updateUserDetails: () => ({
    func: (prompt: string) =>
      apiClient.patch(`/admin/users/prompt`, {
        prompt: prompt,
      }),
    key: ["updateUserDetails"],
    successMessage: "",
    errorMessage: "",
  }),
};

type VSCodeToken = {
  authToken: string;
  id?: string;
};

export const getVSCodeAuthToken = async () => {
  return await apiClient.get<VSCodeToken>(`/vscode/authtoken`);
};
