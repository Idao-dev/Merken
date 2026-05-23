import { describe, expect, it } from "vitest";
import { distributionFromEnv, latestReleaseUrl, repositoryUrl, updateStateClass } from "../../src/app/updates";

describe("update helpers", () => {
  it("defaults to installer distribution", () => {
    expect(distributionFromEnv(undefined)).toBe("installer");
    expect(distributionFromEnv("installer")).toBe("installer");
    expect(distributionFromEnv("portable")).toBe("portable");
  });

  it("uses the public GitHub latest release URL", () => {
    expect(repositoryUrl).toBe("https://github.com/Idao-dev/Merken");
    expect(latestReleaseUrl).toBe("https://github.com/Idao-dev/Merken/releases/latest");
  });

  it("maps update states to visual classes", () => {
    expect(updateStateClass("upToDate")).toBe("state-success");
    expect(updateStateClass("available")).toBe("state-warning");
    expect(updateStateClass("error")).toBe("state-error");
  });
});
