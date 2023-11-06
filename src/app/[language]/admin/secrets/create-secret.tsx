import FormTextInput from "@/components/form/text-input/form-text-input";
import {
  useCreateSecretService
} from "@/services/api/services/secrets";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

type CreateSecretFormData = {
  pieceName: string;
  clientId: string;
  clientSecret: string;
};

const useValidationEditSecretSchema = () => {
  const { t } = useTranslation("secrets");

  return yup.object().shape({
    pieceName: yup
      .string()
      .required(t("secrets:inputs.pieceName.validation.required")),
    clientId: yup
      .string()
      .required(t("secrets:inputs.clientId.validation.required")),
    clientSecret: yup
      .string()
      .required(t("secrets:inputs.clientSecret.validation.required")),
  });
};

function CreateSecretFormActions() {
  const { t } = useTranslation("secrets");
  const { isSubmitting } = useFormState();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("secrets:actions.create")}
    </Button>
  );
}

export const CreateSecret = ({
  onCreated,
}: {
  onCreated: (secret: CreateSecretFormData) => void;
}) => {
  const validationSchema = useValidationEditSecretSchema();
  const fetchSecretCreate = useCreateSecretService();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("secrets");

  const methods = useForm<CreateSecretFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      pieceName: "",
      clientId: "",
      clientSecret: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: CreateSecretFormData) => {
    console.log("formData", formData);
    const { status } = await fetchSecretCreate(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      enqueueSnackbar(t(`secrets:alerts.create.error`), {
        variant: "error",
      });
      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED) {
      onCreated(formData);
      enqueueSnackbar(t(`secrets:alerts.create.success`), {
        variant: "success",
      });
    } else {
      enqueueSnackbar(t(`secrets:alerts.create.error`), {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" gap={0}>
          <FormTextInput<CreateSecretFormData>
            name="pieceName"
            label={t("secrets:inputs.pieceName.label")}
          />
          <FormTextInput<CreateSecretFormData>
            name="clientId"
            label={t("secrets:inputs.clientId.label")}
          />
          <FormTextInput<CreateSecretFormData>
            name="clientSecret"
            label={t("secrets:inputs.clientSecret.label")}
          />
          <CreateSecretFormActions />
        </Stack>
      </form>
    </FormProvider>
  );
};
