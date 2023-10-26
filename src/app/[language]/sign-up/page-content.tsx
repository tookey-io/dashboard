"use client";
import FormTextInput from "@/components/form/text-input/form-text-input";
import Link from "@/components/link";
import {
  useAuthLoginService,
  useAuthSignUpService,
} from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useTranslation } from "@/services/i18n/client";
import { isFacebookAuthEnabled } from "@/services/social-auth/facebook/facebook-config";
import { isGoogleAuthEnabled } from "@/services/social-auth/google/google-config";
import SocialAuth from "@/services/social-auth/social-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("sign-up");

  return yup.object().shape({
    firstName: yup
      .string()
      .required(t("sign-up:inputs.firstName.validation.required")),
    lastName: yup
      .string()
      .required(t("sign-up:inputs.lastName.validation.required")),
    email: yup
      .string()
      .email(t("sign-up:inputs.email.validation.invalid"))
      .required(t("sign-up:inputs.email.validation.required")),
    password: yup
      .string()
      .min(6, t("sign-up:inputs.password.validation.min"))
      .required(t("sign-up:inputs.password.validation.required")),
  });
};

function FormActions() {
  const { t } = useTranslation("sign-up");
  const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="sign-up-submit"
      fullWidth
    >
      {t("sign-up:actions.submit")}
    </Button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const fetchAuthSignUp = useAuthSignUpService();
  const { t } = useTranslation("sign-up");
  const validationSchema = useValidationSchema();

  const methods = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = async (formData: SignUpFormData) => {
    const { data: dataSignUp, status: statusSignUp } = await fetchAuthSignUp(
      formData
    );

    if (statusSignUp === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(dataSignUp.errors) as Array<keyof SignUpFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `sign-up:inputs.${key}.validation.server.${dataSignUp.errors[key]}`
            ),
          });
        }
      );

      return;
    }

    const { data: dataSignIn, status: statusSignIn } = await fetchAuthLogin({
      email: formData.email,
      password: formData.password,
    });

    if (statusSignIn === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: dataSignIn.access.token,
        refreshToken: dataSignIn.refresh.token,
        tokenExpires: new Date(dataSignIn.access.validUntil).getTime(),
      });
      setUser(dataSignIn.user);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">{t("sign-up:title")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="firstName"
                label={t("sign-up:inputs.firstName.label")}
                type="text"
                autoFocus
                testId="firstName"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="lastName"
                label={t("sign-up:inputs.lastName.label")}
                type="text"
                testId="lastName"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="email"
                label={t("sign-up:inputs.email.label")}
                type="email"
                testId="email"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="password"
                label={t("sign-up:inputs.password.label")}
                type="password"
                testId="password"
              />
            </Grid>

            <Grid item xs={12}>
              <FormActions />
              <Button
                variant="text"
                color="inherit"
                LinkComponent={Link}
                href="/sign-in"
                fullWidth
              >
                {t("sign-up:actions.accountAlreadyExists")}
              </Button>
            </Grid>

            {[isGoogleAuthEnabled, isFacebookAuthEnabled].some(Boolean) && (
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label={t("sign-up:or")} />
                </Divider>

                <SocialAuth />
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function SignUp() {
  return <Form />;
}

export default withPageRequiredGuest(SignUp);
