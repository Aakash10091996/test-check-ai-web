"use client";
import { useParams } from "next/navigation";
import { FooterData } from "@/components/common/Footer/constant";

export default function ComponentFooter() {
  const params = useParams();
  const framework = params.framework;
  const uielement = Array.isArray(params.uielement)
    ? params.uielement[0]?.toLowerCase().replace(/-/g, "")
    : params.uielement?.toLowerCase().replace(/-/g, "");

  const data = FooterData.find((item) => {
    if (framework === "mui" && item.mui_componentName?.toLowerCase() === uielement) {
      return true;
    }
    if (framework === "tailwind" && item.tailwind_componentName?.toLowerCase() === uielement) {
      return true;
    }
    if (framework === "css" && item.css_componentName?.toLowerCase() === uielement) {
      return true;
    }
    if (!framework && item.componentName?.toLowerCase() === uielement) {
      return true;
    }
    return false;
  });

  if (!data) {
    return <div className="w-full bg-black"></div>;
  }

  return (
    <div className="w-full bg-black p-12 ">
      <div className="flex flex-wrap justify-between text-black400">
        <div className="w-full p-4 sm:w-[305px] sm:min-w-[300px] md:w-1/2 lg:w-1/4">
          <h3 className="pb-2 text-base font-semibold text-black300">
            {data.questionsAndAnswers.QuesOne}
          </h3>
          <p className="text-sm font-normal">{data.questionsAndAnswers.AnsOne}</p>
        </div>
        <div className="w-full p-4 sm:w-[305px] sm:min-w-[300px] md:w-1/2 lg:w-1/4">
          <h3 className="pb-2 text-base font-semibold text-black300">
            {data.questionsAndAnswers.QuesTwo}
          </h3>
          <p className="text-sm font-normal">{data.questionsAndAnswers.AnsTwo}</p>
        </div>
        <div className="w-full p-4 sm:w-[305px] sm:min-w-[300px] md:w-1/2 lg:w-1/4">
          <h3 className="pb-2 text-base font-semibold text-black300">
            {data.questionsAndAnswers.QuesThree}
          </h3>
          <p className="text-sm font-normal">{data.questionsAndAnswers.AnsThree}</p>
        </div>
        <div className="w-full p-4 sm:w-[305px] sm:min-w-[300px] md:w-1/2 lg:w-1/4">
          <h3 className="pb-2 text-base font-semibold text-black300">
            {data.questionsAndAnswers.QuesFour}
          </h3>
          <p className="text-sm  font-normal">{data.questionsAndAnswers.AnsFour}</p>
        </div>
      </div>
    </div>
  );
}
