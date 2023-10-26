"use client";

import Grid from "@mui/material/Grid";
import FacebookAuth from "./facebook/facebook-auth";
import { isFacebookAuthEnabled } from "./facebook/facebook-config";
import GoogleAuth from "./google/google-auth";
import { isGoogleAuthEnabled } from "./google/google-config";
import { isDiscordAuthEnabled } from "./discord/discord-config";
import DiscordAuth from "./discord/discord-auth";
import { isTwitterAuthEnabled } from "./twitter/twitter-config";
import TwitterAuth from "./twitter/twitter-auth";

export default function SocialAuth() {
  return (
    <Grid container spacing={2}>
      {isGoogleAuthEnabled && (
        <Grid item xs={12}>
          <GoogleAuth />
        </Grid>
      )}
      {isFacebookAuthEnabled && (
        <Grid container item xs={12} direction="column">
          <FacebookAuth />
        </Grid>
      )}
      {isDiscordAuthEnabled && (
        <Grid container item xs={12} direction="column">
          <DiscordAuth />
        </Grid>
      )}
      {isTwitterAuthEnabled && (
        <Grid container item xs={12} direction="column">
          <TwitterAuth />
        </Grid>
      )}
    </Grid>
  );
}
