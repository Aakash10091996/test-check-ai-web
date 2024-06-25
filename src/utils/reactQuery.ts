import type { ErrorData } from "@/utils/customFetch.ts";

interface QueryArgs {
  queryKey: string[];
}

export const asClientCallForReactQuery =
  <T>(serverFunc: (args: string[]) => Promise<T>) =>
  async (args: QueryArgs) => {
    const data = await serverFunc(args.queryKey);
    return data;
  };

export async function queryFunction<T>(
  func: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (err: ErrorData) => void,
  showServerMessage?: boolean,
  showErrorMessage?: boolean,
  successMessage = "",
  errorMessage = ""
) {
  try {
    // const data = await uiElementsApi.getUielementsList(name).func();
    const data: T = await func();
    if (showServerMessage) {
      console.log(successMessage);
      //  toast message
    }
    if (typeof onSuccess === "function") {
      onSuccess(data);
    }
    return data;
  } catch (e) {
    if (showErrorMessage) {
      console.log(errorMessage);
      //  toast message
    }
    if (typeof onError === "function") {
      onError(e as ErrorData);
    }
    throw e;
  }
}

asClientCallForReactQuery;
