import { queryFunction } from "@/utils/reactQuery";
import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/project/api";
import type { MarketplaceProject } from "@/types/project";
import type { ErrorData, ResponseData } from "@/utils";

/**
 * for internal usage only for admin
 */
export const useProjectByName = (
  name: string,
  options: {
    onSuccess?: (data: ResponseData<MarketplaceProject[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = projectApi.getProjectByName(name);
  return useQuery<ResponseData<MarketplaceProject[]>, ErrorData>({
    queryKey: key,
    queryFn: () =>
      queryFunction<ResponseData<MarketplaceProject[]>>(
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
