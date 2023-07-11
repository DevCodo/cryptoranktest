import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptorank test - Watchlist",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
