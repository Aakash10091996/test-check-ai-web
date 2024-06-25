"use client";
import { Button, Dialog, DialogContent } from "@/components/ui";
import { RootContext } from "@/providers/ContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const UpgradeToThemeModal = () => {
  const { openModal, setOpenModal } = useContext(RootContext);
  const router = useRouter();
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent
        onInteractOutside={() => {
          setOpenModal(false);
        }}
        className="flex h-36 flex-col items-center justify-between"
      >
        <p>The component that you requested will be generated without Theme</p>
        <div className="flex gap-4">
          <Button
            variant="default"
            onClick={() => {
              router.push("/checkout");
              setOpenModal(false);
            }}
          >
            Upgrade to Premium
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
