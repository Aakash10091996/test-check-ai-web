"use client";
import { Dialog, DialogContent, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { CloseIcon, ExpandscreenIcon } from "@/icons";
import Canvas from "@/components/pages/aiprojectsPage/Canvas";
import { Button } from "@/components/ui";
import { Output } from "@/constants";
import { useChat } from "@/hooks/aiChat/useChat";

interface RenderProps {
  isVersionCreationPending: boolean;
}
function RenderOutputModal({ isVersionCreationPending = false }: RenderProps) {
  const { isCreatingChat, isUpdatingChat } = useChat();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isCreatingChat || isUpdatingChat}
          variant={"default"}
          size={"sm"}
          className="inline-flex items-center justify-center gap-x-1 bg-output text-output-foreground shadow-none hover:bg-output lg:hidden"
        >
          {Output}
          <ExpandscreenIcon width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex min-h-screen max-w-full flex-col px-0 py-2"
        removeDefaultClose={true}
      >
        <Canvas isVersionCreationPending={isVersionCreationPending} />
        <DialogClose asChild>
          <Button
            size={"icon"}
            variant="secondary"
            className="absolute right-4 top-[17px] size-8 bg-muted hover:bg-muted/60"
          >
            <CloseIcon className="size-5 stroke-labelText" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export default RenderOutputModal;
