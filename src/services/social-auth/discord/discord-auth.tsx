"use client";

import { useTranslation } from "@/services/i18n/client";
import Button from "@mui/material/Button";
import useDiscordAuth from "./use-discord-auth";

export default function DiscordAuth({ connect }: { connect?: boolean }) {
  const Discord = useDiscordAuth();
  const { t } = useTranslation("common");

  const onLogin = async () => {
    Discord.login(connect);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#7289da",
          ":hover": { bgcolor: "#5e78d5" },
          ":active": { bgcolor: "#5e78d5" },
          ":focus": { bgcolor: "#5e78d5" },
        }}
        onClick={onLogin}
      >
        {t("common:auth.discord.action")}
      </Button>
    </>
  );
}
