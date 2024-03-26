import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProtectedRoute from "@/components/protected-route";
import GlobalLoading from "@/components/global-loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "To Do List",
    description: "To do list app.",
};

interface IProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalLoading />
                <ProtectedRoute>{children}</ProtectedRoute>
            </body>
        </html>
    );
};

export default RootLayout;
