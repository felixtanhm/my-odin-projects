import { Inter } from "next/font/google";
import "./reset.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Felix's Odin Projects",
  description:
    "A compilation of projects done from The Odin Project's full stack javascript web development course.",
};

export default function RootLayout({ children }) {
  const timestamp = new Date().toLocaleString();

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>{timestamp}</footer>
      </body>
    </html>
  );
}
