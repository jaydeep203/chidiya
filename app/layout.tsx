import type { Metadata } from "next";
import "./globals.css";
import Modal from "./providers/Modal";
import ToastProvider from "./providers/ToastProvider";



export const metadata: Metadata = {
  title: "Chidiya",
  description: "Write, Read and enjoy the content on Chidiya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="
        bg-zinc-900
      ">
          <ToastProvider />
          <Modal />
          {children}
      </body>
    </html>
  );
}
