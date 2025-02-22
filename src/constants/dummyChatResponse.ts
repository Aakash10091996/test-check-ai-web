export const DUMMY_CHAT_RESPONSE = {
  id: "420be603-346d-4aa3-a4ce-7c4fe0c05f4d",
  component_id: "9d3fdeea-d34b-4c40-a2f1-d35b333618ac",
  component_id_version: 0,
  show_component: true,
  message_data: {
    prompt: "",
    isAi: true,
    suggestions: null,
    suggestionChosen: false,
    chosenSuggestionIndex: null,
    text: "",
    timestamp: "2024-06-03T05:28:29.982Z",
    sent_at: "",
  },
  timestamp: "2024-06-03T05:28:29.984Z",
  component_status: "GENERATION_SUCCESS",
  created_at: "2024-06-03T05:28:29.984Z",
  updated_at: "2024-06-03T05:28:29.984Z",
  component: {
    rating: 0,
    component: {},
    id: "9d3fdeea-d34b-4c40-a2f1-d35b333618ac",
    name: "BreadcrumbNavigation",
    prompt:
      "Make-breadcrumbs-clickable-links,-allowing-users-to-navigate-back-to-previous-sections-within-the-hierarchy.-This-streamlines-user-journeys-and-provides-easy-backtracking.",
    code_status: "READY",
    project_id: "eb69c2a4-bbc2-440a-be00-3e8dc9fd1a23",
    language: "JS",
    ui_lib: "tailwind",
    version: 0,
    code: "import React from 'react';\nimport { FiChevronRight } from 'react-icons/fi';\n\nconst breadcrumbsData = [\n  { id: 1, name: 'Home', link: '#', current: false },\n  { id: 2, name: 'Category', link: '#', current: false },\n  { id: 3, name: 'Subcategory', link: '#', current: false },\n  { id: 4, name: 'Product', link: '#', current: true }\n];\n\nconst Breadcrumbs = () => {\n  return (\n    <nav aria-label=\"breadcrumb\" className=\"flex py-3 px-5 rounded-lg bg-gray-50 text-sm\">\n      <ol className=\"inline-flex items-center space-x-2\">\n        {breadcrumbsData.map((breadcrumb, index) => (\n          <li key={breadcrumb.id} className=\"flex items-center\">\n            {index > 0 && <FiChevronRight className=\"mx-2 text-gray-400\" aria-hidden=\"true\" />}\n            <a href={breadcrumb.link} className={`${breadcrumb.current ? 'text-gray-500' : 'text-blue-600 hover:text-blue-800'} flex items-center`}>{breadcrumb.name}</a>\n          </li>\n        ))}\n      </ol>\n    </nav>\n  );\n};\n\nexport default Breadcrumbs;",
    ai_component_id: "665d5480f45174df98ae2a0a",
    url: "https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/AI_DATA_BUCKET/o/AI_DEV/SCREEN_SHOT/60906893-cc7a-4563-82c6-dd25d157e25a.png",
    theme: '{"theme_config":false}',
    dependencies: ["react", "react-dom", "react-icons", "tailwindcss"],
    created_at: "2024-06-03T05:27:38.584Z",
    updated_at: "2024-06-03T05:28:29.984Z",
  },
};
