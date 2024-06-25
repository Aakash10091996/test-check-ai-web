import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import ChatCommonTitle from "@/components/pages/chatPage/ChatCommonTitle";
import { getPromptWithoutHyphenAndFirstCapLetter } from "@/utils";
import { localStorageKeyNames, DUMMY_CHAT_RESPONSE } from "@/constants";
import { ComponentShowMessage } from "@/components/pages/chatPage/ComponentShowMessage";

function DummyComponentCreation() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div
        style={{ height: "calc(100vh - 20.5rem)" }}
        className={`flex flex-col ${loading ? "justify-between" : "justify-end"}`}
      >
        {loading ? (
          <>
            <div className="flex flex-col items-center">
              <Loader />
              <p className="mt-[-82px] text-sm font-normal leading-[18px] text-primary dark:text-primary">
                Generating Component
              </p>
            </div>
            <div className="w-full gap-x-2 px-3 py-2 sm:gap-x-4">
              <CommonHeader />
              <div>
                <ChatCommonTitle />
                <div className="mb-4 flex">
                  <div className="flex h-9 w-fit items-center justify-center gap-x-2 rounded bg-blue50 px-3 text-[13px] font-normal leading-[18px] text-blue400">
                    Generating
                    <div
                      className="inline-block size-5 animate-spin rounded-full border-4 border-blue400"
                      style={{ borderStyle: "solid dotted dotted dotted" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full gap-x-2 px-3 py-2 sm:gap-x-4">
            <CommonHeader />
            <ChatCommonTitle />
            <div className="mt-2 w-full max-w-[90%]">
              <ComponentShowMessage
                isVersionCreationPending={false}
                chatMessage={DUMMY_CHAT_RESPONSE}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DummyComponentCreation;

const CommonHeader = () => {
  return (
    <div className="mb-[9px]">
      {localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ? (
        <>
          <ChatCommonTitle
            title="User"
            otherClass={{
              textClasses: "text-pureBlack dark:text-white capitalize",
              bulletPointClasses: "bg-pureBlack dark:bg-white",
            }}
          />
          <p className="text-sm font-normal leading-[18px] text-pureBlack dark:text-white">
            {getPromptWithoutHyphenAndFirstCapLetter(
              localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? ""
            )}
          </p>
        </>
      ) : null}
    </div>
  );
};
