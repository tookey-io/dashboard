"use client";

import { useCallback, useMemo } from "react";
import { discordClientId, discordConnectRedirectUrl, discordLoginRedirectUrl, discordScopes, isDiscordAuthEnabled } from "./discord-config";
import { DiscordContext } from "./discord-context";

type DiscordAuthProviderProps = {
  children: React.ReactNode;
};

function DiscordProvider({ children }: DiscordAuthProviderProps) {
  const login = useCallback((connect?: boolean) => {
    const params = new URLSearchParams()
    const redirectPath = connect ? discordConnectRedirectUrl:  discordLoginRedirectUrl
    params.append('client_id', discordClientId)
    params.append('redirect_uri', `${window.location.origin}${redirectPath}`)
    params.append('response_type', 'code')
    params.append('scope', discordScopes)
    window.location.href = 'https://discord.com/api/oauth2/authorize?' + params.toString()
  }, []);

  const valueContext = useMemo(() => ({ login }), [login]);

  return (
    <DiscordContext.Provider value={valueContext}>
      {children}
    </DiscordContext.Provider>
  );
}

export default function DiscordAuthProvider({
  children,
}: DiscordAuthProviderProps) {
  return isDiscordAuthEnabled ? (
    <DiscordProvider>{children}</DiscordProvider>
  ) : (
    children
  );
}
