import React from "react";
import ChatCommonTitle from "@/components/pages/chatPage/ChatCommonTitle";
import { Button } from "@/components/ui";
import { RetryIcon } from "@/icons";

interface Props {
  createComponentOrVersion: () => void;
}

function ChatRetry({ createComponentOrVersion }: Props) {
  return (
    <li className="flex w-full items-end p-0">
      <div className="w-full">
        <ChatCommonTitle />
        <div className="mb-[12px] mt-2 flex">
          <div className="flex h-9 w-fit cursor-default items-center rounded border border-error bg-errorVariant px-3 text-[13px] font-normal leading-[18px] text-inputBox hover:bg-errorVariant dark:text-white">
            Generation failure
          </div>
          <Button
            icon={<RetryIcon />}
            className="ml-1.5 gap-[3px] border-none bg-transparent p-0 text-[11px] font-normal leading-[18px] text-greyWhite-foreground underline shadow-none hover:bg-transparent"
            onClick={createComponentOrVersion}
          >
            Retry
          </Button>
        </div>
      </div>
    </li>
  );
}

export default ChatRetry;
