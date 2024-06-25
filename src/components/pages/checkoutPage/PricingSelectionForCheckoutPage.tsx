// import { PRICING_PLANS_SIGNUP } from "@/constants/pricing";

import { openSans400 } from "@/styles/fonts";
import { SecuredByStripe } from "@/components/pages/checkoutPage/SecuredByStripe";
import { Label } from "@/components/ui";

function PricingSelectionForCheckoutPage() {
  return (
    <div className="flex flex-col items-start justify-between">
      <div>
        <div className="h-fit  w-[294.66px] rounded-md border border-inputBox-foreground p-[23px] pr-[21px] dark:bg-blackVariantBg ">
          <div className="mb-5 flex items-center justify-between text-sm font-semibold leading-[21px] text-black dark:text-white">
            <div>PureCode AI Pro Free Trial</div>
            <div>$0.00</div>
          </div>
          <div
            className={`text-base ${openSans400.className} leading-[28px] text-black dark:text-white`}
          >
            14-day free trial. Cancel anytime. Converts to paid subscription after the trial period
            ends.
          </div>
        </div>
        <div className="mt-4 flex h-[58px] w-full items-center justify-between rounded-xl border border-warning bg-orangeBg-foreground px-4 dark:bg-orangeBg">
          <Label className="text-base font-bold leading-6 text-black dark:text-white">
            Due today
          </Label>
          <Label className="text-base font-semibold leading-6 text-black dark:text-white">
            $0.00
          </Label>
        </div>
      </div>
      <div className="mb-[5.7rem] hidden md:block">
        <SecuredByStripe />
      </div>
    </div>
  );
}

export default PricingSelectionForCheckoutPage;
