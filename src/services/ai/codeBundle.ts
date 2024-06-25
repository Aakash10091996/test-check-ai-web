import { BABEL_URL } from "@/config/constants";
import { MAIN_SCRIPT } from "@/constants/iframeScript";
import type { BundleDetails, BundlePayload } from "@/types/ai";

export const codeBundle = async (ui_lib: string, data: BundlePayload): Promise<BundleDetails> => {
  const response = await fetch(`${BABEL_URL}/${ui_lib}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const bundledCode = (await response.json()) as BundleDetails;
  bundledCode.code = bundledCode?.code
    ? bundledCode.code.replace("</body>", `${MAIN_SCRIPT}</body>`)
    : "";
  return bundledCode;
};
