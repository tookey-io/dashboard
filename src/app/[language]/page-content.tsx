"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";

function Home() {
  return (
    <Container maxWidth="xl">
      <Dashboard />
    </Container>
  );
};


export default withPageRequiredAuth(Home);