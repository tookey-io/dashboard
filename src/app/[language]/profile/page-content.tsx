"use client";
import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

function Profile() {
  const { user } = useAuth();
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item xs="auto">
          <StyledAvatar
            alt={user?.firstName + " " + user?.lastName}
            src={user?.photo?.path}
          />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {user?.email}
          </Typography>
          <Grid container>
            <Grid item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Profile);
