import {
  Landing_Page_Components_Heading,
  Landing_Page_Components_Heading_blue,
  Landing_Page_Components_SubHeading,
} from "@/constants";
import ComponentTypesCards from "@/components/pages/landingPage/ComponentTypeCards";
import { ComponentsData } from "@/constants";

export default function ComponentsDisplay() {
  return (
    <article className="bg-background bg-opacity-[75] px-2 py-12 md:px-4 md:py-24" id="features">
      <h2 className="text-2xl font-semibold" id="Components">
        <p>
          {Landing_Page_Components_Heading}
          <span className="text-primary">{Landing_Page_Components_Heading_blue}</span>
        </p>
      </h2>
      <p className="mb-12 mt-4">{Landing_Page_Components_SubHeading}</p>
      <ComponentTypesCards DataArray={ComponentsData} />
    </article>
  );
}
