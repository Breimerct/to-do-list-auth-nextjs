import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ProtectedRoute from "@/components/protected-route";
import GlobalLoading from "@/components/global-loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                <ToastContainer theme="colored" />
            </body>
        </html>
    );
};

export default RootLayout;
