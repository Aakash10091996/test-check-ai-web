import { Label } from "@/components/ui";
import Link from "next/link";
import { addHyphen, useComponentsView } from "@/utils";
import { COMPONENTS } from "@/constants";
import type { ComponentAnalyticsData } from "@/types/typesense";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";

interface Props {
  details: ComponentAnalyticsData;
  SkeletonComponent: React.ComponentType<unknown> | undefined;
}

function AllComponentsCard({ details, SkeletonComponent }: Props) {
  const { framework } = useComponentsView();

  return (
    <Link
      href={`${COMPONENTS}/${framework}/${addHyphen(details.component_tags[0])}`}
      onClick={() =>
        trackMixpanelEvent(MIXPANEL_EVENTS.COMPONENT_CLICK, { tag: details.component_tags[0] })
      }
      key={details.component_id}
      className="col-span-1 flex h-[194px] w-[306px] cursor-pointer flex-col items-center"
    >
      <div className="group mx-auto flex h-[150px] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-lg bg-lightGray dark:border dark:bg-transparent dark:shadow-suggestionShadow dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-accent">
        {SkeletonComponent ? <SkeletonComponent /> : null}
      </div>
      <div className="flex h-[44px] w-full flex-row items-center justify-between gap-1 px-[15px]">
        <Label className="text-sm font-medium leading-5 text-foreground">
          {details.component_tags[0]}
        </Label>
        <Label className="text-sm font-medium leading-5 text-breadcrumbGreyText dark:text-darkGreyText-foreground">
          {details.framework_select} components
        </Label>
      </div>
    </Link>
  );
}

export default AllComponentsCard;
