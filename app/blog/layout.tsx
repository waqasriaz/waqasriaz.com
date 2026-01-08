import BlogLoadingBar from "@/components/blog/BlogLoadingBar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogLoadingBar />
      {children}
    </>
  );
}
