import type { Metadata } from "next";
import AdminUsersList from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "admin-panel-users");

  return {
    title: t("title"),
  };
}

export default AdminUsersList;
