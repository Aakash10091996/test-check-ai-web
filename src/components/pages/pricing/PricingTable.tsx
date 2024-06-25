import { PRICING_BENEFITS, PRICING_PLANS } from "@/constants/PricingConstant";
import { CheckIcon, CrossIcon } from "@/icons";

// Define type for list item
interface ListItem {
  listItem: string;
  pro: JSX.Element;
  premium: JSX.Element;
  enterprise: JSX.Element;
}

const listItemSet = PRICING_BENEFITS;

const listItemData: ListItem[] = Array.from(listItemSet).map((item: string) => ({
  listItem: item,
  pro: PRICING_PLANS[0].FEATURES_LIST.includes(item) ? <CheckIcon /> : <CrossIcon />,
  premium: PRICING_PLANS[1].FEATURES_LIST.includes(item) ? <CheckIcon /> : <CrossIcon />,
  enterprise: PRICING_PLANS[2].FEATURES_LIST.includes(item) ? <CheckIcon /> : <CrossIcon />,
}));

export default function PricingTable() {
  return (
    <table className="border-t-[1px] border-black">
      <tbody>
        {listItemData.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border-b-[1px] ${rowIndex === 0 && "border-b border-t-[2px]"} dark:border-border`}
          >
            <td
              className={`min-w-[300px] flex-wrap border-t-0 py-4 text-base max-sm:min-w-[140px]`}
            >
              {rowIndex === 0 ? (
                <span className="inline bg-gradient-to-r from-purpleGradient via-redGradient to-yellowGradient bg-clip-text leading-tight text-transparent">
                  {row.listItem}
                </span>
              ) : (
                row.listItem
              )}
            </td>
            <td className=" w-[17.4rem] border-t-0 text-center text-base leading-[0.2rem]">
              <div className="flex w-full justify-center"> {row.pro}</div>
            </td>
            <td className="w-[17.4rem] border-t-0 bg-blueOverlay text-center text-base leading-[0.2rem]">
              <div className="flex w-full justify-center leading-[0.2rem]"> {row.premium}</div>
            </td>
            <td className=" w-[17.4rem] border-t-0 text-center text-base leading-[0.2rem]">
              <div className="flex w-full justify-center "> {row.enterprise}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
