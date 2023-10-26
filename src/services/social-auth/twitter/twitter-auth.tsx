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
      <Button
        variant="contained"
        sx={{
          bgcolor: "#1DA1F2",
          ":hover": { bgcolor: "#0d95e8" },
          ":active": { bgcolor: "#0d95e8" },
          ":focus": { bgcolor: "#0d95e8" },
        }}
        onClick={onLogin}
      >
        {t("common:auth.twitter.action")}
      </Button>
    </>
  );
}
