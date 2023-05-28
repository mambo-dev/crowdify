import DashboardSideNav from "../../../components/layout/dashboard-sidenav";
import NavBar from "../../../components/layout/navbar";
import Providers from "../../../components/providers";
import { Toaster } from "../../../components/ui/toast";
import { cn } from "../../../lib/utils";
import "../../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex items-center container justify-center pt-5">
        <DashboardSideNav />
        <div className="mb-auto flex-1 mx-auto px-4 sm:px-10 "> {children}</div>
      </div>
      <Toaster position="top-right" />
      {/*@ts-expect-error Server Component */}
      <NavBar />
    </Providers>
  );
}
