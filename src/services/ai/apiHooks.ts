import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ErrorData, ResponseData } from "@/utils";
import type {
  ComponentInfo,
  ComponentsDetails,
  ProjectDetails,
  AIProjectListResponse,
  AiChatMessage,
} from "@/types/ai";
import { aiApi } from "@/services/ai/api";
import { queryFunction } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import type { ProfileDetails } from "@/types/profile";
import { getFromLocalStorage } from "@/utils/localstorage";

/**
 * page: ai, create a new user generated project from marketplace project
 */

export const useCreateProjectFromMarketplace = (
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = aiApi.createProjectFromMarketplace();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: (data: ResponseData<ComponentsDetails>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        console.log(successMessage);
        // toast message maybe
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

/**
 * page: ai, data: create new ai project without any component in it
 */
export const useCreateProject = (
  options: {
    onSuccess?: (data: ResponseData<ProjectDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.createProject();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: (data: ResponseData<ProjectDetails>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

/**
 * page: ai, data: create new component in existing project
 */
export const useCreateComponentInProject = (
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = aiApi.createComponentInProject();

  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ComponentsDetails>) => {
      const project_id = data?.data?.project_id;
      if (project_id) {
        const { key } = aiApi.getProjectComponentList(project_id, false);
        await queryClient.invalidateQueries({ queryKey: key });
      }
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        console.log(successMessage);
        // toast message maybe
        toast({
          title: "AI Components",
          description: "Successfully created components!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

/**
 * page: ai, data: create new version in existing component
 */
export const useCreateComponentVersion = (
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.createComponentVersion();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: (data: ResponseData<ComponentsDetails>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

/**
 * page: ai, data: list all versions in existing component
 */
export const useGetComponentVersionList = (
  componentId: string,
  marketplace = false,
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { isSignedIn } = useAuth();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = aiApi.getComponentVersionList(
    componentId,
    marketplace
  );
  return useQuery<ResponseData<ComponentsDetails[]>, ErrorData>({
    queryKey: [key],
    enabled: componentId && (isSignedIn ?? getFromLocalStorage("guestId") !== null) ? true : false,
    queryFn: () =>
      queryFunction<ResponseData<ComponentsDetails[]>>(
        func,
        onSuccess,
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * page: ai, usage: to list the component names in ai created project
 */

export const useGetProjectComponentList = (
  projectId: string,
  marketplace = false,
  options: {
    onSuccess?: (data: ResponseData<ComponentInfo[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { isSignedIn } = useAuth();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = aiApi.getProjectComponentList(
    projectId,
    marketplace
  );
  return useQuery<ResponseData<ComponentInfo[]>, ErrorData>({
    queryKey: key,
    enabled: isSignedIn ?? getFromLocalStorage("guestId") !== null ? true : false,
    // enabled: projectId ? true : false,
    queryFn: () =>
      queryFunction<ResponseData<ComponentInfo[]>>(
        func,
        onSuccess,
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * page: ai, projects, usage: list all the project names with thumbnails
 */
export const useGetProjectList = (
  options: {
    onSuccess?: (data: ResponseData<AIProjectListResponse>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { isSignedIn } = useAuth();

  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { func, key, successMessage, errorMessage } = aiApi.getProjectList();
  return useQuery<ResponseData<AIProjectListResponse>, ErrorData>({
    queryKey: key,
    enabled: isSignedIn ? true : false,
    queryFn: () =>
      queryFunction<ResponseData<AIProjectListResponse>>(
        func,
        onSuccess,
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetComponentConversation = (
  componentId: string,
  options: {
    onSuccess?: (data: ResponseData<AiChatMessage[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { isSignedIn } = useAuth();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { func, key, successMessage, errorMessage } = aiApi.getComponentConversation(componentId);
  return useQuery<ResponseData<AiChatMessage[]>, ErrorData>({
    queryKey: key,
    enabled: isSignedIn ? true : false,
    queryFn: () =>
      queryFunction<ResponseData<AiChatMessage[]>>(
        func,
        onSuccess,
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetLatestComponentStatus = (
  isEnabled: boolean,
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { func, key, successMessage, errorMessage } = aiApi.getLatestComponentStatus();
  const queryClient = useQueryClient();

  return useQuery<ResponseData<ComponentsDetails>, ErrorData>({
    queryKey: key,
    enabled: isEnabled,
    queryFn: () =>
      queryFunction<ResponseData<ComponentsDetails>>(
        func,
        async (data: ResponseData<ComponentsDetails>) => {
          await queryClient.invalidateQueries({
            queryKey: aiApi.getProjectComponentList("", false).key,
            refetchType: "all",
          });
          if (onSuccess) {
            onSuccess(data);
          }
        },
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateGuestUser = (
  options: {
    onSuccess?: (data: ResponseData<ProfileDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.createGuestUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ProfileDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getProjectComponentList("", false).key,
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useLinkGuestUser = (
  options: {
    onSuccess?: (data: ResponseData<ProfileDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.linkGuestUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ProfileDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getProjectComponentList("", false).key,
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useCreateNewChat = (
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.startNewChat();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ComponentsDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getProjectComponentList("", false).key,
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};
export const useAddMessageToChat = (
  componentId: string,
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.addNewMessageToChat(componentId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ComponentsDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getComponentConversation(componentId).key,
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version",
          description: "Successfully created version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useUpdateComponentVersion = (
  componentId: string,
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { toast } = useToast();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.updateComponentVersion(componentId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ComponentsDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getComponentVersionList(componentId).key,
        refetchType: "all",
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
        toast({
          title: "AI Components version edited successfully",
          description: "Successfully updated version!",
        });
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useUpdateLikedStatus = (
  componentId: string,
  options: {
    onSuccess?: (data: ResponseData<ComponentsDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.updateLikedStatus(componentId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<ComponentsDetails>) => {
      await queryClient.invalidateQueries({
        queryKey: aiApi.getComponentConversation(componentId).key,
        refetchType: "all",
      });
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useAddFeedback = (
  options: {
    onSuccess?: (data: ResponseData<null>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, errorMessage, func } = aiApi.addFeedback();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: (data: ResponseData<null>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        // toast message maybe
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};
