import { InfoCircledIcon } from "@radix-ui/react-icons";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export interface Error {
  isError: boolean;
  errorMessage: string;
}

interface ErrorDialogProps {
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
  name: string | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  themes: string[];
}
const ErrorDialog = ({ error, setError, name, setName, themes }: ErrorDialogProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (!themes.includes(name!)) {
      setIsValid(true);
    }
  }, [name, themes]);
  return (
    <div className="fixed top-52 z-50 flex flex-col items-center justify-center gap-y-3 rounded-md bg-aiBackgroundDark px-12 py-4 shadow-md">
      {error.isError && !isValid ? (
        <div className="flex w-full items-center justify-start gap-x-1 text-red400">
          <InfoCircledIcon width={16} height={16} className="rounded-full bg-red400 text-white" />
          <p className="text-xs">{error.errorMessage}</p>
        </div>
      ) : (
        <div className="flex w-full items-center justify-start gap-x-1 text-green400">
          <InfoCircledIcon width={16} height={16} className="rounded-full bg-green400 text-white" />
          <p className="text-xs">Looks Good!</p>
        </div>
      )}
      <input
        className={`flex h-8 w-full items-center rounded-md border p-2 text-sm placeholder:items-center placeholder:text-xs focus-visible:outline-none ${!isValid ? "border-red400" : ""} bg-theme-custom-button`}
        placeholder="Name"
        id="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="flex gap-2">
        <button
          className="w-1/2 rounded-md bg-theme-cancel-button px-4 py-1 text-xs font-semibold"
          onClick={() => {
            setError({
              isError: false,
              errorMessage: "",
            });
          }}
        >
          Cancel
        </button>
        <button
          className="w-1/2 rounded-md bg-primary px-4 py-1 text-xs font-semibold text-white hover:bg-blue-500"
          disabled={name?.trim() === "" || !name}
          onClick={() => {
            setError({
              isError: false,
              errorMessage: "",
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ErrorDialog;
