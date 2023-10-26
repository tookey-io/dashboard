"use client";

import { useCallback, useMemo } from "react";
import { twitterClientId, twitterConnectRedirectUrl, twitterLoginRedirectUrl, twitterScopes, isTwitterAuthEnabled } from "./twitter-config";
import { TwitterContext } from "./twitter-context";

type TwitterAuthProviderProps = {
  children: React.ReactNode;
};

function TwitterProvider({ children }: TwitterAuthProviderProps) {
  const login = useCallback((connect?: boolean) => {
    const params = new URLSearchParams()
    const redirectPath = connect ? twitterConnectRedirectUrl:  twitterLoginRedirectUrl
    params.append('response_type', 'code')
    params.append('client_id', twitterClientId)
    params.append('redirect_uri', `${window.location.origin}${redirectPath}`)
    params.append('scope', twitterScopes)
    params.append('state', 'state')
    params.append('code_challenge', 'challenge')
    params.append('code_challenge_method', 'plain')
    window.location.href = 'https://twitter.com/i/oauth2/authorize?' + params.toString()
  }, []);

  const valueContext = useMemo(() => ({ login }), [login]);

  return (
    <TwitterContext.Provider value={valueContext}>
      {children}
    </TwitterContext.Provider>
  );
}

export default function TwitterAuthProvider({
  children,
}: TwitterAuthProviderProps) {
  return isTwitterAuthEnabled ? (
    <TwitterProvider>{children}</TwitterProvider>
  ) : (
    children
  );
}
