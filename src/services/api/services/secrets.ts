import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

type SecretsResponse = {
    [app: string]: {
        clientId: string;
        clientSecret?: string;
    }
}

export function useGetSecretsService() {
    const fetch = useFetch()

    return useCallback(() => {
        const requestUrl = new URL(`${API_URL}/api/secrets/apps`);
        return fetch(requestUrl, {
          method: "GET",
        }).then(wrapperFetchJsonResponse<SecretsResponse>);
    }, [fetch])
}

type CreateOrUpdateSecretRequest = {
    pieceName: string;
    clientSecret: string;
    clientId: string;
}

type CreateOrUpdateSecretResponse = {
    id: number;
    pieceName: string;
    clientId: string;
}

export function useUpdateSecretService() {
    const fetch = useFetch()

    return useCallback((request: CreateOrUpdateSecretRequest) => {
        const requestUrl = new URL(`${API_URL}/api/secrets`);
        return fetch(requestUrl, {
          method: "PATCH",
          body: JSON.stringify(request)
        }).then(wrapperFetchJsonResponse<CreateOrUpdateSecretResponse>);
    }, [fetch])
}

export function useCreateSecretService() {
    const fetch = useFetch()

    return useCallback((request: CreateOrUpdateSecretRequest) => {
        const requestUrl = new URL(`${API_URL}/api/secrets`);
        return fetch(requestUrl, {
          method: "POST",
          body: JSON.stringify(request)
        }).then(wrapperFetchJsonResponse<CreateOrUpdateSecretResponse>);
    }, [fetch])

}