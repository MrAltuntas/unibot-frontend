"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useMutateApi from "@/Hooks/useMutateApi";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (
        email: string,
        password: string,
        rememberMe?: boolean
    ) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const [loginApi] = useMutateApi({
        apiPath: `/sessions/login`,
        method: "POST",
    });

    const [checkTokenApi] = useMutateApi({
        apiPath: `/sessions/checkAccessToken`,
        method: "POST",
    });

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await checkTokenApi({});
                    if (response.error === null && response.data?.user) {
                        setUser(response.data.user);
                    } else {
                        logout();
                    }
                } catch (error) {
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (
        email: string,
        password: string,
        rememberMe = false
    ) => {
        setIsLoading(true);

        try {
            const response = await loginApi({ email, password });

            if (response.error) {
                const err: any = new Error(
                    typeof response.error === "string"
                        ? response.error
                        : "Invalid credentials"
                );

                if (response.status) err.status = response.status;
                if (response.statusCode) err.statusCode = response.statusCode;
                throw err;
            }

            if (!response.data) {
                throw new Error("No response data received");
            }

            const { accessToken, refreshToken, user } = response.data;

            localStorage.setItem("accessToken", accessToken);
            if (rememberMe && refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }

            setUser(user);
        } catch (error) {
            console.error("[AUTH] Login error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
