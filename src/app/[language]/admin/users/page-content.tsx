"use client";

import {
  useGetUserOtpService,
  useGetUsersService,
} from "@/services/api/services/users";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useAsync } from "@/services/helpers/use-async";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default withPageRequiredAuth(
  function AdminUsersList() {
    const getUsersSerivce = useGetUsersService();
    const getUserOtpService = useGetUserOtpService();
    const router = useRouter()

    const [usersResult, fetchUsers] = useAsync(
      async () =>
        getUsersSerivce({
          page: 0,
          limit: 1000,
        }),
      []
    );

    const [otpResult, fetchOtp] = useAsync(async (id: number) => {
      return getUserOtpService({ id });
    }, []);

    const users = useMemo(() => {
      if (!usersResult) return null;
      if (usersResult.status !== "complete") return null;

      if (usersResult.result.status === HTTP_CODES_ENUM.OK) {
        return usersResult.result.data;
      } else {
        return null;
      }
    }, [JSON.stringify(usersResult)]);

    const usersError = useMemo(() => {
      if (!usersResult) return null;
      if (usersResult.status !== "error") return null;

      return usersResult.error;
    }, [usersResult]);

    const handleAuth = async (id: number) => {
      await fetchOtp(id);
    };

    useEffect(() => {
      console.log(otpResult);
      if (!otpResult) return;
      if (otpResult.status !== "complete") return;
      if (otpResult.result.status !== HTTP_CODES_ENUM.OK) return;

      router.push(`/en/admin/automation/${otpResult.result.data.token}`);
    }, [otpResult])

    useEffect(() => {
      fetchUsers();
    }, []);

    return (
      <>
        <Typography variant="h2">Users ({users?.length || "..."})</Typography>
        {users &&
          users.map((user) => (
            <Card key={user.id}>
              <Typography variant="h4">{user.fullName}</Typography>
              <Button onClick={() => handleAuth(user.id)}>
                See automation
              </Button>
            </Card>
          ))}
        {usersError && (
          <Typography variant="h4">Error: {usersError.message}</Typography>
        )}
      </>
    );
  },
  { roles: [2, 3, 100] }
);
