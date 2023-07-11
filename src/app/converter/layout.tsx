import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptorank test - Converter",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
