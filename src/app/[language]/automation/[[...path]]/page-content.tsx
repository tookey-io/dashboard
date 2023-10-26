"use client";

import { useAutomationOneTimeService } from "@/services/api/services/automation";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useRef, useState } from "react";

const AutomationPage = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [frameUrl, setFrameUrl] = useState<string>(process.env.NEXT_PUBLIC_AUTOMATION_ROOT!);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const automationOneTimeService = useAutomationOneTimeService();

  // Extract the path from the URL and store in redirectTo state
  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = window.location.href.split("/automation")[1];
    setRedirectTo(path);
  }, []);

  // Get the token from the server and authenticate in automation
  useEffect(() => {
    const automation = async () => {
      console.log("automation otp");
      const { data } = await automationOneTimeService();
      if (data && "token" in data) {
        setFrameUrl(
          `${process.env.NEXT_PUBLIC_AUTOMATION_ROOT}/sign-in?otp=${data.token}`
        );
      }
    };
    automation();
  }, []);

  const [currentPath, setCurrentPath] = useState<string>("/");
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data.type === "routeChanged" &&
        typeof e.data.url === "string"
      ) {
        const newUrl = e.data.url as string;
        console.log("new url", newUrl, authenticated, redirectTo);

        if (newUrl.startsWith("/sign-in")) return;

        if (!authenticated) {
          setTimeout(() => setAuthenticated(true), 200);
        } else if (currentPath !== newUrl) {
          setCurrentPath(newUrl);
          window.history.pushState({}, "", `/en/automation${newUrl}`);
        }
      }
    };

    console.log('add event listener')
    window.addEventListener("message", onMessage);

    return () => {
      console.log('remove event listener')
      window.removeEventListener("message", onMessage);
    };
  }, [authenticated, currentPath]);

  useEffect(() => {
    if (authenticated && redirectTo) {
      setFrameUrl(`${process.env.NEXT_PUBLIC_AUTOMATION_ROOT}${redirectTo}`);
      setRedirectTo(null);
    }
  }, [redirectTo, authenticated]);

  const loading = useMemo(() => {
    return !authenticated || Boolean(redirectTo);
  }, [redirectTo, authenticated]);

  return (
    <Box flexGrow="1" display="flex" flexDirection="column">
      <iframe
        ref={ref}
        src={frameUrl}
        style={{
          opacity: loading ? 0 : 1,
          flexGrow: loading ? 0 : 1,
          maxHeight: loading ? "0px" : "100%",
          width: "100%",
          border: "none",
        }}
      ></iframe>
      {loading && (
        <Box
          flexGrow="1"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Box>
  );
};

export default withPageRequiredAuth(AutomationPage);
