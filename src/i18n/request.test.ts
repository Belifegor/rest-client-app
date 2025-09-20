import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasLocale } from "next-intl";
import type { getRequestConfig as originalGetRequestConfig } from "next-intl/server";
import getRequestConfig from "./request";

vi.mock("../../messages/en.json", () => ({
  default: { welcome: "Welcome!" },
}));
vi.mock("../../messages/ru.json", () => ({
  default: { welcome: "Добро пожаловать!" },
}));

vi.mock("next-intl", () => ({
  hasLocale: vi.fn(),
}));

vi.mock("./routing", () => ({
  routing: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
}));

type RequestConfigFn = Parameters<typeof originalGetRequestConfig>[0];

vi.mock("next-intl/server", () => ({
  getRequestConfig: (fn: RequestConfigFn) => fn,
}));

describe("request config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle valid locale", async () => {
    vi.mocked(hasLocale).mockReturnValue(true);

    const config = await getRequestConfig({ requestLocale: Promise.resolve("en") });

    expect(hasLocale).toHaveBeenCalledWith(["en", "ru"], "en");
    expect(config).toEqual({
      locale: "en",
      messages: { welcome: "Welcome!" },
    });
  });

  it("should handle invalid locale and fallback to default", async () => {
    vi.mocked(hasLocale).mockReturnValue(false);

    const config = await getRequestConfig({ requestLocale: Promise.resolve("fr") });

    expect(hasLocale).toHaveBeenCalledWith(["en", "ru"], "fr");
    expect(config).toEqual({
      locale: "en",
      messages: { welcome: "Welcome!" },
    });
  });

  it("should fallback when locale is null", async () => {
    vi.mocked(hasLocale).mockReturnValue(false);

    const config = await getRequestConfig({
      requestLocale: Promise.resolve(null as unknown as string),
    });

    expect(hasLocale).toHaveBeenCalledWith(["en", "ru"], null);
    expect(config).toEqual({
      locale: "en",
      messages: { welcome: "Welcome!" },
    });
  });

  it("should fallback when locale is undefined", async () => {
    vi.mocked(hasLocale).mockReturnValue(false);

    const config = await getRequestConfig({ requestLocale: Promise.resolve(undefined) });

    expect(hasLocale).toHaveBeenCalledWith(["en", "ru"], undefined);
    expect(config).toEqual({
      locale: "en",
      messages: { welcome: "Welcome!" },
    });
  });

  it("should correctly resolve async requestLocale", async () => {
    vi.mocked(hasLocale).mockReturnValue(true);

    const config = await getRequestConfig({
      requestLocale: Promise.resolve("ru"),
    });

    expect(hasLocale).toHaveBeenCalledWith(["en", "ru"], "ru");
    expect(config).toEqual({
      locale: "ru",
      messages: { welcome: "Добро пожаловать!" },
    });
  });
});
