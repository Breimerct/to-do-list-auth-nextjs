"use client";
import { useCommonStore } from "@/store/common.store";
import { LoaderIcon } from "./icons";

const GlobalLoading = () => {
    const { globalLoading } = useCommonStore();

    return (
        globalLoading && (
            <div className="min-h-svh w-full  grid place-content-center absolute top-0 left-0 bg-white/55 z-10">
                <figure className="animate-spin">
                    <LoaderIcon size={100} />
                </figure>
            </div>
        )
    );
};

export default GlobalLoading;
