"use client";
import { useUserStore } from "@/store/user.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, setUser } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : null;

            if (user) setUser(user);

            if (!user && !pathname.includes("auth")) router.replace("/auth/login");
        }

        if (user && pathname.includes("auth")) router.replace("/");
    }, [user]);

    return children;
};

export default ProtectedRoute;
