"use client";

import { useTranslation } from "@/services/i18n/client";
import Button from "@mui/material/Button";
import useTwitterAuth from "./use-twitter-auth";

export default function TwitterAuth({ connect }: { connect?: boolean }) {
  const twitter = useTwitterAuth();
  const { t } = useTranslation("common");

  const onLogin = async () => {
    twitter.login(connect);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={onLogin}>
        {t("common:auth.discord.action")}
      </Button>
    </>
  );
}
