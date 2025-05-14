import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface IPostApiState {
    loading: boolean;
    error: string | null;
    data: object | null;
}
interface IMutateProps {
    apiPath?: string;
    method?: "PUT" | "DELETE" | "POST" | "GET";
    baseURL?: string;
    withCredentials?: boolean;
    contentType?: string;
}
type TMutateReturn = [
    (object: any, params?: any) => any,
    boolean,
    object | null
];
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
                        data: null,
                        error: "UnexpectedErrorOccurred",
                        loading: false,
                    };
                default:
                    setResponseData({
                        loading: false,
                        error: "beklenmeyen hata",
                        data: null,
                    });

                    return {
                        data: null,
                        error: "beklenmeyen hata",
                        loading: false,
                    };
            }
        }
        setResponseData({ loading: false, error: null, data: response.data });

        return { loading: false, error: null, data: response.data };
    };

    return [fetchApi, responseData.loading, responseData.data];
};
export default useMutateApi;
