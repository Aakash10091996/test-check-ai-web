import { DialogContent } from "@/components/ui/dialog";
import { Button, Dialog } from "@/components/ui";
import { useRouter } from "next/navigation";
import { CHECKOUT } from "@/constants";

// import { Label } from "@/components/ui/label";

interface Props {
  errorMessage: string;
  setCreateChatErrorMessage: (errMsg: string) => void;
}
export default function ChatPageModal({ errorMessage, setCreateChatErrorMessage }: Props) {
  const router = useRouter();

  return (
    <Dialog
      open={errorMessage !== ""}
      onOpenChange={() => {
        if (errorMessage !== "") {
          setCreateChatErrorMessage("");
        }
      }}
    >
      <DialogContent className="flex min-h-[18rem] flex-col items-center justify-center">
        <p>{errorMessage}</p>
        {/* <Button onClick={() => setCreateChatErrorMessage("")}>Ok</Button> */}
        <div className="flex gap-4">
          <Button
            variant="default"
            onClick={() => {
              router.push(CHECKOUT);
            }}
          >
            Checkout
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setCreateChatErrorMessage("");
            }}
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
