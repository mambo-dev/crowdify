import "../globals.css";
import { Inter } from "next/font/google";
import { cn } from "../../lib/utils";
import Providers from "../../components/providers";
import { Toaster } from "../../components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
