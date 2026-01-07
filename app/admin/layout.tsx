import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin - Waqas Riaz",
    default: "Admin Panel - Waqas Riaz",
  },
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
