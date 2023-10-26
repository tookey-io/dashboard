export const isTwitterAuthEnabled =
  process.env.NEXT_PUBLIC_IS_TWITTER_AUTH_ENABLED === "true";
export const twitterClientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!;
export const twitterLoginRedirectUrl = '/oauth/twitter/login'
export const twitterConnectRedirectUrl = '/oauth/twitter/connect'
export const twitterScopes = process.env.NEXT_PUBLIC_TWITTER_SCOPES!
