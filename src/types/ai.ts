export interface CreateProjectPayload {
  language: string;
  ui_lib: string;
  project_name?: string;
}

export interface StartNewChatPayload {
  language: string;
  uiLib: string;
  project_name?: string;
  marketplaceData?: { packId: string; compId: string };
  componentId?: string;
  theme?: string | undefined | null;
  messageData: {
    isAi: boolean;
    text?: string;
    suggestions?: string[];
    suggestionChosen?: boolean;
    chosenSuggestionIndex?: number | null;
    prompt: string;
    timestamp: string;
  };
}

export interface AddNewMessagePayload extends StartNewChatPayload {
  fromVersion: number;
  componentId?: string;
  theme?: string | undefined | null;
}
export interface ProjectDetails {
  projects: object;
  id: string;
  name: string;
  owner_id: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIProjectListResponse {
  user_generated: ProjectList[];
  marketplace: ProjectList[];
}
export interface ProjectList {
  projects: object;
  id: string;
  name: string;
  owner_id: string;
  language: string;
  ui_lib: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  thumb_nail: string;
}
export interface ComponentInfo {
  id: string;
  name: string;
  latestVersion?: number;
  ui_lib?: string;
  theme_id?: string;
  theme_name?: string;
  // marketplace_Project?: boolean;
}
export interface CreateComponentPayload {
  language: string;
  ui_lib: string;
  prompt: string | undefined;
  fromVersion?: number;
}
export interface CreateNewProjectPayload {
  code: string;
  componentName: string;
  language: string;
  projectName: string;
  prompt: string;
  ui_lib: string;
  url: string;
}
export interface ComponentsDetails {
  component: object;
  id: string;
  name: string;
  prompt: string;
  code_status: string;
  project_id: string;
  language: string;
  ui_lib: string;
  version: number;
  code: string;
  ai_component_id: string;
  url: string;
  rating: number;
  created_at: string;
  updated_at: string;
  theme?: string;
  dependencies?: string[];
}
export interface ComponentVersionList {
  versions: ComponentsDetails[];
}
export interface BundlePayload {
  code: string;
  type: string;
  theme?: string;
  dependencies?: string[];
}
export interface BundleDetails {
  status: string;
  message: string;
  code: string;
}

export interface MessageData {
  prompt: string;
  isAi: boolean;
  suggestions: null | string[];
  suggestionChosen: boolean;
  chosenSuggestionIndex: null | number;
  text: string;
  sent_at: string;
  timestamp: string;
}

export interface AiChatMessage {
  id: string;
  component_id: string;
  component_id_version: number;
  show_component: boolean;
  message_data: MessageData;
  component_status: string;
  created_at: string;
  updated_at: string;
  component?: ComponentsDetails;
}

export interface LatestGuestCreatedComponentDetail {
  latestGuestCreatedComponentID: string;
  latestGuestCreatedComponentPrompt: string;
}
