import Footer from "@/components/common/Footer";
import ComponentFooter from "@/components/common/Footer/ComponentFooter";

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-[calc(100dvh-64px)]">{children}</div>
      <Footer isComponent={true} />
      <ComponentFooter />
    </div>
  );
}
