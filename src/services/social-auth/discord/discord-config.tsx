export const isDiscordAuthEnabled =
  process.env.NEXT_PUBLIC_IS_DISCORD_AUTH_ENABLED === "true";
export const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!;
export const discordLoginRedirectUrl = '/oauth/discord/login'
export const discordConnectRedirectUrl = '/oauth/discord/connect'
export const discordScopes = 'identify email guilds.members.read'
export const discordAuthUrl = 'https://discord.com/api/oauth2/authorize?client_id=1166359213509976154&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord&response_type=code&scope=identify%20email%20guilds.members.read'
