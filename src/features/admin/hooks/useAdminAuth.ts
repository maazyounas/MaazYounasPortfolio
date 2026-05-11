"use client";

import { useState, useEffect, useCallback } from "react";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "sonner";
import { signIn, signOut, useSession } from "next-auth/react";
import { adminService } from "../../../lib/adminService";

// Custom hook for session timeout
export const useSessionTimeout = (logoutCallback: () => void, idleTimeout = 5 * 60 * 1000) => {
    const onIdle = useCallback(() => {
        toast.warning("Session expired due to inactivity");
        logoutCallback();
    }, [logoutCallback]);

    useIdleTimer({
        onIdle,
        timeout: idleTimeout,
        debounce: 500,
    });
};

export const useAdminAuth = () => {
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ username: string; role: string } | null>(null);
    const [lockUntil, setLockUntil] = useState<Date | null>(null);

    const logout = useCallback(async () => {
        await signOut({ redirect: false });
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    // Set up session timeout (idle) in the client.
    useSessionTimeout(logout, 5 * 60 * 1000);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setIsAuthenticated(true);
            setUser({
                username: session.user.name || session.user.email || "admin",
                role: (session.user as { role?: string }).role || "admin",
            });
        } else if (status === "unauthenticated") {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [session, status]);

    const login = async (
        username: string,
        password: string,
    ): Promise<boolean> => {
        const now = new Date();

        if (lockUntil && now < lockUntil) {
            const timeLeft = Math.ceil((lockUntil.getTime() - now.getTime()) / 60000);
            toast.error(`Account locked. Try again in ${timeLeft} minutes.`);
            return false;
        }

        try {
            const settings = await adminService.getSecuritySettings();
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                const newAttempts = (localStorage.getItem("admin_login_attempts")
                    ? Number(localStorage.getItem("admin_login_attempts"))
                    : 0) + 1;
                localStorage.setItem("admin_login_attempts", newAttempts.toString());

                if (newAttempts >= settings.maxLoginAttempts) {
                    const lockTime = new Date(now.getTime() + settings.lockoutDuration * 60000);
                    setLockUntil(lockTime);
                    localStorage.setItem("admin_lock_until", lockTime.toISOString());
                    toast.error(`Too many failed attempts. Account locked for ${settings.lockoutDuration} minutes.`);
                } else {
                    toast.error(
                        `Invalid credentials. ${settings.maxLoginAttempts - newAttempts} attempts remaining.`,
                    );
                }

                return false;
            }

            localStorage.removeItem("admin_login_attempts");
            localStorage.removeItem("admin_lock_until");
            toast.success("Welcome back!");
            return true;
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login.");
            return false;
        }
    };

    useEffect(() => {
        const savedLock = localStorage.getItem("admin_lock_until");
        if (savedLock) {
            const lockTime = new Date(savedLock);
            if (lockTime > new Date()) {
                setLockUntil(lockTime);
            }
        }
    }, []);

    return { isAuthenticated, user, login, logout, lockUntil };
};
