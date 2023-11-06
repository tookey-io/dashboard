import FormTextInput from "@/components/form/text-input/form-text-input";
import {
  useUpdateSecretService
} from "@/services/api/services/secrets";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

type EditSecretFormData = {
  pieceName: string;
  clientId: string;
  clientSecret: string;
};

const useValidationEditSecretSchema = () => {
  const { t } = useTranslation("secrets");

  return yup.object().shape({
    pieceName: yup
      .string()
      .matches(/^@[^\s]+/, t("secrets:inputs.pieceName.validation.pattern"))
      .required(t("secrets:inputs.pieceName.validation.required")),
    clientId: yup
      .string()
      .required(t("secrets:inputs.clientId.validation.required")),
    clientSecret: yup
      .string()
      .required(t("secrets:inputs.clientSecret.validation.required")),
  });
};

function EditSecretFormActions() {
  const { t } = useTranslation("secrets");
  const { isSubmitting } = useFormState();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("secrets:actions.update")}
    </Button>
  );
}

export const EditSecret = ({
  pieceName,
  clientId,
  clientSecret
}: Partial<EditSecretFormData>) => {
  const validationSchema = useValidationEditSecretSchema();
  const fetchSecretUpdate = useUpdateSecretService();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("secrets");

  const methods = useForm<EditSecretFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      pieceName,
      clientId,
      clientSecret
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: EditSecretFormData) => {
    console.log("formData", formData);
    const { status } = await fetchSecretUpdate(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      enqueueSnackbar(t(`secrets:alerts.update.error`), {
        variant: "error",
      });
      return;
    }

    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t(`secrets:alerts.update.success`), {
        variant: "success",
      });
    } else {
      enqueueSnackbar(t(`secrets:alerts.update.error`), {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" gap={0}>
          <FormTextInput<EditSecretFormData>
            disabled
            name="pieceName"
            label={t("secrets:inputs.pieceName.label")}
          />
          <FormTextInput<EditSecretFormData>
            name="clientId"
            label={t("secrets:inputs.clientId.label")}
          />
          <FormTextInput<EditSecretFormData>
            name="clientSecret"
            label={t("secrets:inputs.clientSecret.label")}
          />
          <EditSecretFormActions />
        </Stack>
      </form>
    </FormProvider>
  );
};
