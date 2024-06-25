import { aiApi } from "@/services/ai/api";
import { useIsMutating } from "@tanstack/react-query";
import { LoaderGeneration } from "@/components/common/loaderGeneration/LoaderGeneration";

interface Props {
  bundle: string;
  sizeSelected?: string;
}
const IFrameRender = ({ bundle, sizeSelected }: Props) => {
  const isMutatingCreateComponent = useIsMutating({
    mutationKey: aiApi.createComponentInProject().key,
  });
  return (
    <>
      {isMutatingCreateComponent ? (
        <div className="flex w-full items-center justify-center">
          <LoaderGeneration />
        </div>
      ) : (
        <div className="flex size-full items-center justify-center bg-white">
          <iframe
            src=""
            sandbox="allow-scripts allow-forms"
            referrerPolicy="strict-origin"
            title="iframe"
            data-hj-allow-iframe="" // allow hotjar to track iframe
            height="100%"
            width={sizeSelected}
            srcDoc={bundle}
            className="bg-white"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default IFrameRender;
