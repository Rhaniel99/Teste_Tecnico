import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Meu App",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}