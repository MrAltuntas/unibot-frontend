import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

interface IGetApiState { loading: boolean; error: string | null; data: any | null }

interface IQueryProps {
    apiPath: string
    header?: object
    baseURL?: string
    withCredentials?: boolean
    contentType?: string
    params?: object
}

type TQueryReturn = [
    (overrideParams?: object) => Promise<{ data: any; error: string | null; loading: boolean }>,
    boolean,
        any | null
]

export default function useQueryApi({
                                        apiPath,
                                        baseURL,
                                        header,
                                        withCredentials = true,
                                        contentType = 'application/json;charset=UTF-8',
                                        params,
                                    }: IQueryProps): TQueryReturn {
    const [state, setState] = useState<IGetApiState>({
        loading: false,
        error: null,
        data: null,
    })

    // wrap in useCallback so it's stable
    const fetchApi = useCallback(
        async (overrideParams?: object) => {
            setState(s => ({ ...s, loading: true }))
            try {
                const response: AxiosResponse = await axios({
                    baseURL: baseURL ?? process.env.NEXT_PUBLIC_REACT_APP_API_URL,
                    url: apiPath,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': contentType,
                        'Accept-Language': 'tr',
                        credentials: 'include',
                        Authorization: `Bearer ${getCookie('accessToken')}`,
                        ...header,
                    },
                    withCredentials,
                    params: overrideParams ?? params,
                })
                setState({ loading: false, error: null, data: response.data.data })
                return { data: response.data.data, error: null, loading: false }
            } catch (err: any) {
                // extract a friendly error message…
                const res = err.response
                const errorMessage =
                    res?.data?.error ||
                    (Array.isArray(res?.data?.Errors)
                        ? res.data.Errors.map((e: any) => e.Message).join('. ')
                        : res?.statusText) ||
                    'Beklenmeyen hata'

                setState({ loading: false, error: errorMessage, data: null })
                return { data: null, error: errorMessage, loading: false }
            }
        },
        [apiPath, baseURL, header, withCredentials, contentType, params]
    )

    // only run once on mount or when apiPath (or any dependency) changes
    useEffect(() => {
        fetchApi()
    }, [fetchApi])

    return [fetchApi, state.loading, state.data]
}
