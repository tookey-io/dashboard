import { useCallback } from "react";
import { AUTH_OPT } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export const useAutomationOneTimeService = () => {
    const fetchBase = useFetch();
    return useCallback(() => fetchBase(AUTH_OPT, { method: "GET"}).then(wrapperFetchJsonResponse<{token: string}>), [fetchBase]);
}