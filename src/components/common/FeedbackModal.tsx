import { Button, Dialog, DialogContent } from "@/components/ui";
import { AiPageContext } from "@/context/AiPageContext";
import { setFeedbackModalOpen } from "@/providers/AiPageContextProvider";
import { useContext, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAddFeedback } from "@/services/ai/apiHooks";
import { useToast } from "@/components/ui/use-toast";
import { Toast_Message } from "@/constants";
import { montserrat700, openSans400 } from "@/styles/fonts";
import { ReactionEmojis } from "@/constants/modal.constant";

const FeedbackModal = () => {
  const {
    state: { isFeedbackModalOpen },
    dispatch,
  } = useContext(AiPageContext);
  const { toast } = useToast();

  const { mutate: addFeedback } = useAddFeedback({
    onSuccess: () => {
      dispatch(setFeedbackModalOpen(false));
      toast({
        title: Toast_Message.FeedbackSubmitted,
      });
      setSelectedEmoji("");
      setMessage("");
    },
  });
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Dialog
      open={isFeedbackModalOpen}
      onOpenChange={(bool: boolean) => {
        dispatch(setFeedbackModalOpen(bool));
      }}
    >
      <DialogContent className="focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:rounded-xl">
        <div>
          <h3 className={`text-center text-[30px] ${montserrat700.className}`}>Leave feedback</h3>
          <h5 className={`mt-1 text-center ${openSans400.className}`}>
            {"We'd love to hear what went well or how we can improve the product experience."}
          </h5>
        </div>
        <div className="w-full">
          <Textarea
            key={"message"}
            className="min-h-28 resize-none overflow-auto placeholder:text-lightGreyText"
            placeholder="What if..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>

        <div className="my-2 flex w-full items-center justify-center">
          {ReactionEmojis.map((emoji) => (
            <div
              className="mx-1 cursor-pointer border p-1"
              key={`${emoji.id}_icon`}
              style={{
                ...(selectedEmoji === emoji.name && {
                  boxShadow: "0px 4px 9px 0px hsla(216, 98%, 52%, 0.2)",
                }),
              }}
              onClick={() => {
                setSelectedEmoji(emoji.name === selectedEmoji ? "" : emoji.name);
              }}
            >
              <emoji.icon selected={selectedEmoji === emoji.name} />
            </div>
          ))}
        </div>

        <div className="flex w-full items-center justify-center">
          <Button
            disabled={selectedEmoji === "" || message === ""}
            onClick={() => {
              addFeedback({
                emoji: selectedEmoji,
                message,
              });
            }}
            className="h-[49px] w-[70%]"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
