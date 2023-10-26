"use client";

import { useAuthGoogleLoginService } from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FullPageLoader } from "@/components/full-page-loader";
import useLanguage from "@/services/i18n/use-language";

export default function GoogleAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authGoogleLoginService = useAuthGoogleLoginService();
  const language = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);

    const { status, data } = await authGoogleLoginService({
      idToken: tokenResponse.credential,
    });

    console.log({ status, data })

    if (status === HTTP_CODES_ENUM.OK || status === HTTP_CODES_ENUM.CREATED) {
      setTokensInfo({
        token: data.access.token,
        refreshToken: data.refresh.token,
        tokenExpires: new Date(data.access.validUntil).getTime(),
      });
      setUser(data.user);
    }
    setIsLoading(false);
  };

  return (
    <>
      <GoogleLogin onSuccess={onSuccess} locale={language} />
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}
