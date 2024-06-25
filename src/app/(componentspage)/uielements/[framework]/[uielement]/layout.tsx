import { headers } from "next/headers";

export function generateMetadata(): Promise<{ title: string; description: string }> {
  const pathname = headers().get("x-next-pathname")!;
  const [, , rawLibraryName, rawComponentName] = (pathname || "").split("/");
  const libraryName = rawLibraryName?.replace(/-/g, " ");
  const componentName = rawComponentName?.replace(/-/g, " ");
  const metaTitle = `Build ${libraryName} ${componentName} components Faster using AI`;
  const metaDescription = `Speed up your ${libraryName} ${componentName} UI development by generating and customizing ${libraryName} ${componentName} components with Purecode AI.Build UI 10X Faster `;

  return Promise.resolve({
    title: `${metaTitle} `,
    description: `${metaDescription}.`,
  });
}

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
