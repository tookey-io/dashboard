"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AutomationPage = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);

  const { otp } = useParams();

  // Get the token from the server and authenticate in automation
  useEffect(() => {
    const automation = async () => {
      console.log("automation otp");
      setFrameUrl(
        `${process.env.NEXT_PUBLIC_AUTOMATION_ROOT}/sign-in?otp=${otp}`
      );
    };
    if (!otp || typeof otp !== "string") return;

    automation();
  }, [otp]);

  return (
    <Box flexGrow="1" display="flex" flexDirection="column">
      {frameUrl && (
        <iframe
          ref={ref}
          src={frameUrl}
          style={{
            flexGrow: 1,
            maxHeight: "100%",
            width: "100%",
            border: "none",
          }}
        ></iframe>
      )}
    </Box>
  );
};

export default withPageRequiredAuth(AutomationPage);
