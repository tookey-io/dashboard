"use client";

import { useTranslation } from "@/services/i18n/client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function AdminHome() {
  const { t } = useTranslation("admin-panel-home");
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{
        p: theme.spacing(4)
    }}>
      <Typography variant="h1">{t("title")}</Typography>
      <Typography variant="body1">{t("description")}</Typography>
      <Button href="/admin/users">Users</Button>
    </Container>
  );
}
