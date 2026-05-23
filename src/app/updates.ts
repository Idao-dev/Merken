import type { UpdateStatus } from "./i18n";

export type Distribution = "installer" | "portable";

export const repositoryUrl = "https://github.com/Idao-dev/Merken";
export const latestReleaseUrl = "https://github.com/Idao-dev/Merken/releases/latest";

export function distributionFromEnv(value: string | undefined): Distribution {
  return value === "portable" ? "portable" : "installer";
}

export function updateStateClass(status: UpdateStatus): string {
  if (status === "upToDate" || status === "installed") {
    return "state-success";
  }

  if (status === "available") {
    return "state-warning";
  }

  if (status === "error") {
    return "state-error";
  }

  if (status === "checking" || status === "installing" || status === "unconfigured") {
    return "state-info";
  }

  return "";
}
