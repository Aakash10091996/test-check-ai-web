import apiClient from "@/config/apiClient";
import type {
  ComponentInfo,
  ComponentsDetails,
  CreateComponentPayload,
  CreateNewProjectPayload,
  CreateProjectPayload,
  ProjectDetails,
  AIProjectListResponse,
  StartNewChatPayload,
  AiChatMessage,
  AddNewMessagePayload,
} from "@/types/ai";
import type { ProfileDetails } from "@/types/profile";

const getUpdatedComponentVersionPayload = (data: AddNewMessagePayload) => {
  if (data.componentId) {
    delete data.componentId;
  }
  return data;
};

export const aiApi = {
  createProject: () => ({
    func: (data: CreateProjectPayload) => apiClient.post<ProjectDetails>(`/project-ai`, data),
    key: ["createProject"],
    successMessage: "",
    errorMessage: "",
  }),
  getProjectList: () => ({
    func: () => apiClient.get<AIProjectListResponse>(`/project-ai`),
    key: ["getProjectList"],
    successMessage: "",
    errorMessage: "",
  }),
  createProjectFromMarketplace: () => ({
    func: (data: CreateNewProjectPayload) =>
      apiClient.post<ComponentsDetails>(`/components-ai/newproject`, data),
    key: ["createAIProjectFromMarketplace"],
    successMessage: "",
    errorMessage: "",
  }),
  getProjectComponentList: (projectId: string, marketplace = false) => ({
    func: () =>
      apiClient.get<ComponentInfo[]>(`/components-ai/${projectId}?marketplace=${marketplace}`),
    key: ["getProjectComponentList", projectId],
    successMessage: "",
    errorMessage: "",
  }),
  createComponentInProject: () => ({
    func: (data: { payload: CreateComponentPayload; projectId: string }) =>
      apiClient.post<ComponentsDetails>(`/components-ai/${data.projectId}`, data.payload),
    key: ["generateComponentInProject"],
    successMessage: "Component created successfully",
    errorMessage: "",
  }),
  createComponentVersion: () => ({
    func: (data: { payload: CreateComponentPayload; projectId: string; componentId: string }) =>
      apiClient.post<ComponentsDetails>(
        `/components-ai/${data.projectId}/components/${data.componentId}`,
        data.payload
      ),
    key: ["generateComponentVersion"],
    successMessage: "",
    errorMessage: "",
  }),

  getComponentVersionList: (componentId?: string, marketplace?: boolean) => ({
    func: () =>
      apiClient.get<ComponentsDetails[]>(
        `/components-ai/components/${componentId}?marketplace=${marketplace}`
      ),
    key: ["getComponentVersionList"],
    successMessage: "",
    errorMessage: "",
  }),

  getComponentConversation: (componentId: string) => ({
    func: () => apiClient.get<AiChatMessage[]>(`/chat-ai/${componentId}`),
    key: ["getComponentConversation", componentId],
    successMessage: "",
    errorMessage: "",
  }),

  startNewChat: () => ({
    func: (data: StartNewChatPayload) =>
      apiClient.post<ComponentsDetails>(`/chat-ai/new-chat`, data),
    key: ["startNewChat"],
    successMessage: "",
    errorMessage: "",
  }),

  addNewMessageToChat: (componentId: string) => ({
    func: (data: AddNewMessagePayload) =>
      apiClient.post<ComponentsDetails>(
        `/chat-ai/${data.componentId ? data.componentId : componentId}`,
        getUpdatedComponentVersionPayload(data)
      ),
    key: ["generateComponentVersion", componentId],
    successMessage: "",
    errorMessage: "",
  }),

  createGuestUser: () => ({
    func: () => apiClient.post<ProfileDetails>(`/admin/users/guest`),
    key: ["createGuestUser"],
    successMessage: "",
    errorMessage: "",
  }),
  linkGuestUser: () => ({
    func: (data: { guestUserId: string }) =>
      apiClient.post<ProfileDetails>(`/admin/users/link-guest`, data),
    key: ["linkGuestUser"],
    successMessage: "",
    errorMessage: "",
  }),
  getLatestComponentStatus: () => ({
    func: () => apiClient.get<ComponentsDetails>(`/components-ai/latest-component-status`),
    key: ["getLatestComponentStatus"],
    successMessage: "",
    errorMessage: "",
  }),
  updateComponentVersion: (componentId: string) => ({
    func: (data: { code: string; versionNo: number; componentId: string | string[] }) =>
      apiClient.post<ComponentsDetails>(`/components-ai/components/update/${componentId}`, data),
    key: ["updateComponentVersion", componentId],
    successMessage: "",
    errorMessage: "",
  }),
  updateLikedStatus: (componentId: string) => ({
    func: (data: { versionNo: number; rating: number }) =>
      apiClient.put<ComponentsDetails>(`/components-ai/rating/${componentId}`, data),
    key: ["updateLikedStatus", componentId],
    successMessage: "",
    errorMessage: "",
  }),
  addFeedback: () => ({
    func: (data: { emoji: string; message: string }) =>
      apiClient.post<null>(`/admin/users/feedback`, data),
    key: ["addFeedback"],
    successMessage: "",
    errorMessage: "",
  }),
};
