import type { Theme } from "@/types/theme";
import { queryFunction, type ErrorData, type ResponseData } from "@/utils";
import { themeApi } from "@/services/theme/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";

export const useCreateTheme = (
  options: {
    onSuccess?: (data: ResponseData<Theme>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = themeApi.create();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<Theme>) => {
      trackMixpanelEvent(MIXPANEL_EVENTS.THEME_CREATE, {});
      if (onSuccess) {
        await queryClient.invalidateQueries({
          queryKey: themeApi.get().key,
        });
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

export const useUpdatetheme = (
  options: {
    onSuccess?: (data: ResponseData<Theme>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = themeApi.update();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: async (data: ResponseData<Theme>) => {
      if (onSuccess) {
        await queryClient.invalidateQueries({
          queryKey: themeApi.get().key,
        });
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

export const useGetTheme = (
  options: {
    onSuccess?: (data: ResponseData<Theme[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
    field: string;
  } = { showServerMessage: false, showErrorMessage: false, field: "theme_json" }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = themeApi.get(options.field);
  return useQuery<ResponseData<Theme[]>, ErrorData>({
    queryKey: [key],
    queryFn: () =>
      queryFunction<ResponseData<Theme[]>>(
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
