"use client";

import { useGetSecretsService } from "@/services/api/services/secrets";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useAsync } from "@/services/helpers/use-async";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo } from "react";
import { CreateSecret } from "./create-secret";
import { EditSecret } from "./edit-secret";

export default withPageRequiredAuth(
  function AdminSecretsList() {
    const getSecretsService = useGetSecretsService();

    const [secretsResult, fetchSecrets] = useAsync(
      () => getSecretsService(),
      []
    );

    const secrets = useMemo(() => {
      if (!secretsResult) return null;
      if (secretsResult.status !== "complete") return null;

      if (secretsResult.result.status === HTTP_CODES_ENUM.OK) {
        return secretsResult.result.data;
      } else {
        return null;
      }
    }, [JSON.stringify(secretsResult)]);

    const secretsError = useMemo(() => {
      if (!secretsResult) return null;
      if (secretsResult.status !== "error") return null;

      return secretsResult.error;
    }, [secretsResult]);

    useEffect(() => {
      fetchSecrets();
    }, []);

    return (
      <Container maxWidth="xl">
        <Typography variant="h2">
          Secrets ({secrets ? Object.values(secrets).length : "..."})
        </Typography>
        {secrets &&
          Object.entries(secrets).map(
            ([pieceName, { clientId, clientSecret }]) => (
              <EditSecret
                key={pieceName}
                pieceName={pieceName}
                clientId={clientId}
                clientSecret={clientSecret}
              />
            )
          )}
        <CreateSecret onCreated={() => fetchSecrets()} />
        {secretsError && (
          <Typography variant="h4">Error: {secretsError.message}</Typography>
        )}
      </Container>
    );
  },
  { roles: [2, 3, 100] }
);
