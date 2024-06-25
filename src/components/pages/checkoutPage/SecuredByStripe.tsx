import { AMEXCARDIcon, MasterCardIcon, UnionPayCardIcon, VisaIcon } from "@/icons";
import { Separator } from "@/components/ui/separator";
export const SecuredByStripe = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-1 text-[13px] font-normal text-foreground/80">
        Secured by <div className="text-sm font-bold text-foreground/100">stripe</div>
      </div>
      <Separator orientation="vertical" className="mx-4 h-5 bg-foreground" />
      <div className="flex items-center">
        <VisaIcon />
        <MasterCardIcon />
        <AMEXCARDIcon />
        <UnionPayCardIcon />
      </div>
    </div>
  );
};
