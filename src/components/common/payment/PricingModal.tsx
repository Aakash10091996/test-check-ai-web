import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PricingNewIcon } from "@/icons";
import { PRICING_PLANS, pricingText } from "@/constants/pricing";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PricingModal = ({ isOpen, setIsOpen }: IProps) => {
  const [isSelected, setIsSelected] = useState(1);
  const onSelectHandler = (item: number) => {
    setIsSelected(item);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent removeDefaultClose={true}>
        <DialogHeader>
          <DialogTitle className="text-[25px] font-bold">
            {pricingText.HEADING_TEXT}{" "}
            <Label className="text-[25px] font-bold text-primary">
              {pricingText.HEADING_TEXT_HIGHLIGHT}
            </Label>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="flex flex-col gap-2 space-y-2">
              {PRICING_PLANS[1].FEATURES_LIST.map((item, index) => (
                <div key={index} className="ml-4 flex items-center gap-2">
                  <PricingNewIcon />
                  <Label className="text-[14px] font-normal">{item}</Label>
                </div>
              ))}
            </div>
            <div className="ml-4">
              <Label className="text-[19px] font-medium">{pricingText.PAY_FREQUENCY}</Label>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div
                onClick={() => onSelectHandler(0)}
                className={`flex h-[100px] w-[190px] cursor-pointer flex-col justify-around gap-0 rounded-lg border  ${isSelected == 0 ? "border-2 border-primary" : "border-gray-400"} p-3`}
              >
                <Label>Monthly plan</Label>
                <Label>
                  <Label className="text-[24px] font-bold">${PRICING_PLANS[1].PRICE}</Label>/month
                </Label>
              </div>
              <div
                onClick={() => onSelectHandler(1)}
                className={`flex h-[100px] w-[190px] cursor-pointer flex-col justify-around gap-0 rounded-lg border  ${isSelected == 1 ? "border-2 border-primary" : "border-gray-400"} p-3`}
              >
                <Label>
                  Yearly plan
                  <Label className="ml-3 rounded-md border border-primary bg-primary px-[6px] py-[2px] text-white">
                    {PRICING_PLANS[1].DISCOUNT} Off
                  </Label>
                </Label>

                <Label>
                  <Label className="text-[24px] font-bold">
                    ${PRICING_PLANS[1].ANNUAL_PRICING}
                  </Label>
                  /month
                </Label>
              </div>
            </div>
            <div>
              <Button className="m-auto mt-5 block w-[86%]">
                {pricingText.GET_ACCESS_TO_PURECODE}
              </Button>
              <Label className="mt-4 flex justify-center font-extralight">
                *{pricingText.CANCEL_SUBSCRIPTION}
              </Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PricingModal;
