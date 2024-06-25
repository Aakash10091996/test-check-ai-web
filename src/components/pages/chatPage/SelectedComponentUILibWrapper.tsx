import { UiLibSelect } from "@/components/common/UiLibSelect";
import { useGetComponentConversation } from "@/services/ai/apiHooks";

export default function SelectedComponentUILibWrapper({ componentId }: { componentId: string }) {
  const { data: componentConversation } = useGetComponentConversation(componentId);
  return (
    <UiLibSelect
      uiLib={
        componentConversation?.data?.find((item) => item.show_component === true)?.component
          ?.ui_lib ?? ""
      }
      isDisabled={true}
      otherClasses="border-none outline-none focus:ring-0 max-w-fit px-0 sm:px-0 bg-transparent"
      showCustomizeValue={true}
      isAiPage={true}
    />
  );
}
