/* ads layout.tsx to optimize component rendering by isolating the layout logic to can
 *prevent unnecessary re-renders and avoid loading scripts that aren't needed for the current component
 */
export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
