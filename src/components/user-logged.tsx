"use client";

import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import { LogoutIcon } from "./icons";
import Link from "next/link";

const UserLogged = () => {
    const { user } = useUserStore();
    const { logout } = useAuthStore();

    return (
        <section className="flex items-center gap-4">
            <Link
                href="./profile"
                className="flex items-center gap-2 flex-nowrap hover:shadow-md p-2 rounded-md cursor-pointer transition-all"
            >
                <picture className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center">
                    {!!user ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="rounded-full w-10 h-10"
                        />
                    ) : (
                        <div className="animate-pulse bg-gray-400 rounded-full w-10 h-10"></div>
                    )}
                </picture>

                {!!user ? (
                    <span className="capitalize font-semibold">{user?.fullName}</span>
                ) : (
                    <span className="text-gray-500 animate-pulse bg-gray-400 rounded-md p-1 w-32 h-6"></span>
                )}
            </Link>

            <button onClick={logout} className="bg-red-500 text-white p-1 rounded-md">
                <LogoutIcon size={20} className="inline-block" />
            </button>
        </section>
    );
};

export default UserLogged;
