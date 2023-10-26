"use client";

import { FullPageLoader } from "@/components/full-page-loader";
import { useAuthTwitterLoginService } from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const TwitterAuth = ({ connect }: { connect?: boolean }) => {
  const theme = useTheme()
  const { language } = useParams();
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const authDiscordLoginService = useAuthTwitterLoginService(connect);
  const queries = useSearchParams();
  const code = useMemo(() => queries.get("code"), [queries]);

  const onLogin = async () => {
    if (!code || !language) return;
    console.log("login with discord", code, language);
    try {
      setIsLoading(true);

      const { status, data } = await authDiscordLoginService({
        code,
        codeVerifier: "challenge"
      });

      console.log("login with discord", status, data);

      if (status === HTTP_CODES_ENUM.OK || status === HTTP_CODES_ENUM.CREATED) {
        setTokensInfo({
          token: data.access.token,
          refreshToken: data.refresh.token,
          tokenExpires: new Date(data.access.validUntil).getTime(),
        });
        setUser(data.user);
        router.replace("/");
      } else if (data) {
        setError(data);
      } else if (status === HTTP_CODES_ENUM.NO_CONTENT) {
        router.replace("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    onLogin();
  });

  return (
    <>
      <FullPageLoader isLoading={isLoading} />

      <Modal open={Boolean(error)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: 1,
            overflow: "auto",
            transform: "translate(-50%, -50%)",
            outline: "none",
            bgcolor: "background.paper",
            p: { xs: theme.spacing(1), md: theme.spacing(4) },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="error"
            sx={{ mb: theme.spacing(2) }}
          >
            Error
          </Typography>
          <pre
            style={{
              backgroundColor: grey[900],
              maxWidth: "680px",
              width: "100%",
              color: "white",
              overflow: "auto",
              scrollbarGutter: "stable",
              margin: 0,
              padding: theme.spacing(1),
            }}
          >
            {JSON.stringify(error, null, 2)}
          </pre>

          <Button
            onClick={() => router.replace("/")}
            sx={{ mt: theme.spacing(2) }}
            variant="contained"
            color="primary"
          >
            Sign Again
          </Button>
        </Box>
      </Modal>
    </>
  );
};
