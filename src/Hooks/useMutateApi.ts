"use client";
import { useState, useEffect } from "react";

type ApiOptions = {
    apiPath: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    baseUrl?: string;
};

/**
 * Custom hook for making API requests
 */
const useMutateApi = ({
    apiPath,
    method,
    baseUrl,
}: ApiOptions) => {
    const resolvedBaseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const fetchApi = async (data?: any) => {
        setLoading(true);

        try {
            const token = isClient ? localStorage.getItem("accessToken") : null;

            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                ...(data && method !== "GET"
                    ? { body: JSON.stringify(data) }
                    : {}),
            };

            const response = await fetch(`${baseUrl}${apiPath}`, options);

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error("Unexpected response format:", {
                    status: response.status,
                    headers: Array.from(response.headers.entries()),
                    body: await response.text(),
                });
                throw new Error("Unexpected response format from server");
            }

            const jsonResponse = await response.json();

            return {
                data: jsonResponse.data || null,
                error:
                    jsonResponse.error ||
                    (response.ok
                        ? null
                        : { message: "Unknown error occurred" }),
                status: response.status,
                ok: response.ok,
            };
        } catch (error: any) {
            return {
                data: null,
                error: {
                    message: error.message || "Failed to connect to the server",
                    status: error.status || 500,
                },
                status: error.status || 500,
                ok: false,
            };
        } finally {
            setLoading(false);
        }
    };

    return [fetchApi, loading] as const;
};

export default useMutateApi;
