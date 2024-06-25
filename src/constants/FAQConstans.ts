export type FAQItem = {
  index: string;
  question: string;
  answer: string;
};
export const FAQCONSTANT: FAQItem[] = [
  {
    index: "1",
    question: "What frameworks does PureCode AI support?",
    answer:
      "PureCode AI currently supports React + TailwindCSS and React + Material UI. Support for React +Shadcn UI and HTML+ Bootstrap is coming soon.",
  },
  {
    index: "2",
    question: "How can I bring my own theme?",
    answer:
      "By selecting the Upload Theme option, users can copy and paste their tailwind.config.js by clicking theme option in the generate box. From there, the uploaded theme can be saved and applied to all generated and updated components.",
  },
  {
    index: "3",
    question: "Why should I use the VS Code Extension?",
    answer:
      "The VS Code Extension gives users the ease and convenience of applying their theme and generating/updating components straight from their editor. All the features available on the web version are available on the VS Code Extension.",
  },
  {
    index: "4",
    question: "How can I generate better components?",
    answer:
      "Users can generate more complex and robust components by providing more detailed text prompts and continuing to update their initial prompts after subsequent generations.",
  },
  {
    index: "5",
    question: "How does the pick and edit feature work?",
    answer:
      "When updating a component, users can select any section/element from rendered output by clicking “Pick and edit” button from bottom-right of canvas. Changes can then be provided in the popup box that appears next to the selected element.",
  },
];
