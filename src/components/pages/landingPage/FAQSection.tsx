import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import type { FAQItem } from "@/constants/FAQConstans";
import { FAQCONSTANT } from "@/constants/FAQConstans";
function FAQSection() {
  return (
    <div className="my-12 flex flex-col items-center justify-center gap-12 align-middle max-sm:my-20">
      <div className=" text-4xl font-semibold">FAQ</div>
      <Accordion
        collapsible
        type="single"
        className="min-w-[45%] max-md:w-full max-md:px-4 max-sm:px-4 md:w-[80%] lg:w-[75%] xl:w-[45%]"
      >
        {FAQCONSTANT.map((faq: FAQItem) => (
          <AccordionItem
            key={faq.index}
            value={`item-${faq.index}`}
            className=" my-5 rounded-lg border bg-popover px-5 py-2 md:px-7 md:py-3 "
          >
            <AccordionTrigger className="text-start text-base font-semibold text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-start  text-base font-normal text-testimonialText">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQSection;
