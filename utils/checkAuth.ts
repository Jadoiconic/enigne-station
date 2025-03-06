"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const useCheckAuth = () => {
    const router = useRouter();
    const currentUser = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        if (!currentUser) {
            router.push("/auth/signin"); 
        }
    }, [currentUser, router]);

    return currentUser;
};

export default useCheckAuth;
