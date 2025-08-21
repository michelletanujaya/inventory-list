import { useRouter } from "next/router";

export const useProjectId = (): string => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return id;
  }

  if (Array.isArray(id) && id.length > 0) {
    return id[0];
  }

  return "";
};
