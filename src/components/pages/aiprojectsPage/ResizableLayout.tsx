"use client";
import ChatPage from "@/components/pages/chatPage";
import Canvas from "@/components/pages/aiprojectsPage/Canvas";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
// import { useClerk, useUser } from "@clerk/nextjs";
// import { useEffect } from "react";

interface ResizableLayoutProps {
  defaultLayout: number[];
  isVersionCreationPending: boolean;
}

export function ResizableLayout({
  defaultLayout,
  isVersionCreationPending = false,
}: ResizableLayoutProps): JSX.Element {
  // const clerk = useClerk();
  // const users = useUser();
  // useEffect(() => {
  //   clerk.openSignUp();
  // }, [users?.user]);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={28}>
        <ChatPage isVersionCreationPending={isVersionCreationPending} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={40}>
        <Canvas isVersionCreationPending={isVersionCreationPending} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
