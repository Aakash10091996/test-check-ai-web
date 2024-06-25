import type { ProfileDetails } from "@/types/profile";
import type { ErrorData, ResponseData } from "@/utils";
import { queryFunction } from "@/utils";
import { proflieApi } from "@/services/profile/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export const useGetProfileDetails = (
  options: {
    onSuccess?: (data: ResponseData<ProfileDetails>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { isSignedIn } = useAuth();
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = proflieApi.getProfileDetails();
  return useQuery<ResponseData<ProfileDetails>, ErrorData>({
    queryKey: key,
    enabled: isSignedIn ? true : false,
    retryDelay: 3000,
    queryFn: () =>
      queryFunction<ResponseData<ProfileDetails>>(
        func,
        onSuccess,
        onError,
        showServerMessage,
        showErrorMessage,
        successMessage,
        errorMessage
      ),
    // staleTime: 0, // Data is considered stale immediately
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserDetails = () => {
  const { key, func } = proflieApi.updateUserDetails();
  return useMutation({
    mutationKey: key,
    mutationFn: func,
  });
};
