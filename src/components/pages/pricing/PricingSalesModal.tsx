import { Button, Input, Label } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LogoIcon } from "@/icons";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toast_Message } from "@/constants";
import { checkEmail } from "@/utils";
interface props {
  onOpenChange: () => void;
}

export default function PricingPageModal({ onOpenChange }: props) {
  const [userSalesData, setuserSalesData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const { toast } = useToast();

  const resetUserData = () => {
    setuserSalesData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const value = event.target?.value;
    setuserSalesData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleFormSubmit = () => {
    if (
      !userSalesData.name ||
      !userSalesData.email ||
      !userSalesData.company ||
      !userSalesData.message
    ) {
      toast({
        variant: "error",
        title: Toast_Message.SalesEmptyFormField,
      });
    } else if (checkEmail(userSalesData.email)) {
      toast({
        variant: "error",
        title: Toast_Message.InvalidEmail,
      });
    } else {
      onOpenChange();
      resetUserData();
    }
  };
  return (
    <DialogContent className="flex min-h-[36rem] flex-col items-center justify-center">
      <LogoIcon />
      <h3 className="text-2xl font-semibold">Talk to us</h3>
      <div className="mb-2 w-[90%]">
        <Label htmlFor="name">Full Name</Label>
        <Input
          key={"name"}
          className="placeholder:text-lightGreyText focus:border-[1px] focus:ring-0 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 active:border-[1px] active:ring-0"
          placeholder="Full Name"
          onChange={(e) => handleChange(e, "name")}
        />
      </div>
      <div className="mb-2 w-[90%]">
        <Label htmlFor="company">Company Name</Label>
        <Input
          key={"company"}
          className="placeholder:text-lightGreyText focus:border-[1px] focus:ring-0 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 active:border-[1px] active:ring-0"
          placeholder="Company Name"
          onChange={(e) => handleChange(e, "company")}
        />
      </div>
      <div className="mb-2 w-[90%]">
        <Label htmlFor="name">Company Email</Label>
        <Input
          key={"email"}
          className="placeholder:text-lightGreyText focus:border-[1px] focus:ring-0 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 active:border-[1px] active:ring-0"
          placeholder="Company Email"
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
      <div className="w-[90%]">
        <Label htmlFor="name">Message</Label>
        <Textarea
          key={"message"}
          className="min-h-28 resize-none overflow-auto  placeholder:text-lightGreyText"
          placeholder="Message"
          onChange={(e) => {
            setuserSalesData((prevData) => ({
              ...prevData,
              message: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex w-[90%] items-center justify-center">
        <Button onClick={handleFormSubmit} className="w-[80%]">
          Submit
        </Button>
      </div>
    </DialogContent>
  );
}
