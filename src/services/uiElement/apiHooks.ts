import type { ElementDetails, CategoryItem } from "@/types/uiElement";
import type { ErrorData, ResponseData } from "@/utils";
import { queryFunction } from "@/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { uiElementsApi } from "@/services/uiElement/api";

/**
 * page: uiElements, data: all ui element categories in left sidebar
 */
export const useUiElementCategories = (
  options: {
    onSuccess?: (data: ResponseData<CategoryItem[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = uiElementsApi.getUielementsCategories();
  return useQuery<ResponseData<CategoryItem[]>, ErrorData>({
    queryKey: key,
    queryFn: () =>
      queryFunction<ResponseData<CategoryItem[]>>(
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

/**
 * page: uiElements, data: paginated uiElement details for each Category (on click on element from sidebar)
 */
export const useUiElementListPerCategory = (
  elementSelected: string,
  options: {
    onSuccess?: (data: ResponseData<ElementDetails[]>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } =
    uiElementsApi.getUiElementListPerCategory(elementSelected);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status, error, isLoading } =
    useInfiniteQuery<ResponseData<ElementDetails[]>, ErrorData>({
      queryKey: key,
      queryFn: ({ pageParam }) =>
        queryFunction<ResponseData<ElementDetails[]>>(
          func.bind(null, pageParam as number),
          onSuccess,
          onError,
          showServerMessage,
          showErrorMessage,
          successMessage,
          errorMessage
        ),
      initialPageParam: 0,
      getNextPageParam: (
        lastPage: ResponseData<ElementDetails[]>,
        allPages: ResponseData<ElementDetails[]>[]
      ) => {
        const getSum = (total: number, item: ResponseData<ElementDetails[]>) => {
          return total + Math.round(item?.data?.length ?? 0);
        };

        const arrayLength = allPages.reduce(getSum, 0);
        if (lastPage?.data?.length) return arrayLength;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const flatMapData = data?.pages?.flatMap((page) => page.data) ?? [];

  return {
    data: flatMapData,
    isFetchingNextPage,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isLoading,
  };
};
