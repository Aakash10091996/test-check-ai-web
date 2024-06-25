interface FeaturedGeneration {
  image: JSX.Element;
  prompt: string;
}

export const FeaturedGenerations: FeaturedGeneration[] = [
  {
    image: <img src="/img/FeaturedGenerateCard2.png" className="size-full" />,
    prompt:
      "Create a dashboard component with cards showing statistics, with line and bar charts, and a table. Make sure it is fully responsive. Also create a table below the Charts.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard3.png" className="size-full" />,
    prompt: "Sign up card with social login buttons.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard4.png" className="size-full" />,
    prompt:
      "Create a visually appealing, easy to read interface for customer testimonials that is responsive across all devices.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard5.png" className="size-full" />,
    prompt:
      "Design a product carousel with scrollable product cards, navigation arrows, and hover effects for additional details. Add any random images instead of blurred images and add some more content related to this carousel.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard6.png" className="size-full" />,
    prompt:
      "Design a visually appealing pricing plan that effectively communicates the value proposition of the product or service. Consider incorporating multiple tiers with distinct features and pricing points to cater to different customer segments. Ensure the plan is responsive and accessible across various devices. Additionally, explore the use of visual elements, such as icons or illustrations, to enhance clarity and engagement. Provide a clear call to action for each pricing tier to encourage conversion. Finally, consider including testimonials or case studies to reinforce the value offered by each tier. Add a chip to standard plan with Popular content.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard7.png" className="size-full" />,
    prompt:
      "Create a chat UI featuring over 10 chat descriptions with sending and receiving times, a left section displaying contacts, user avatars, send buttons, and a search bar, all styled with vibrant yet formal colors Also Add a basic conversation between the users with relevant icons & time update.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard8.png" className="size-full" />,
    prompt:
      "Design an accordion page interface with multiple collapsible sections, each featuring a clear header with a bold title and an icon. Use vibrant yet formal colors, like blue and gray. Include images and avatars for visual context and personalization. Ensure smooth animations, hover effects, and full responsiveness.",
  },
  {
    image: <img src="/img/FeaturedGenerateCard9.png" className="size-full" />,
    prompt:
      'Create a company homepage for Pure Code with the following components: Navigation bar: Including the company logo on the left, and menu items ("Home," "Services," "About," "Pages," "Testimonials") on the right, with a prominent "Contact Support" button. Main section: Featuring a large headline with the text "Bring your ideas & projects to life faster with Pure Code," a sub headline describing Pure Code as a revolutionary developer tool, and a paragraph detailing the features and benefits of the product. Call to action buttons: Two buttons below the description paragraph labeled "Discover More" and "Contact Us.',
  },
];
