import { describe, it, expect, vi } from "vitest";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

vi.mock("next-intl/navigation", () => ({
  createNavigation: vi.fn(() => ({
    Link: vi.fn(),
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    getPathname: vi.fn(),
  })),
}));

vi.mock("./routing", () => ({
  routing: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
}));

describe("navigation", () => {
  it("should create navigation with correct routing", async () => {
    const navigation = await import("./navigation");

    expect(createNavigation).toHaveBeenCalledWith(routing);
    expect(navigation.getPathname).toBeDefined();
  });

  it("should export all navigation utilities", async () => {
    const navigation = await import("./navigation");

    expect(navigation.Link).toBeDefined();
    expect(navigation.redirect).toBeDefined();
    expect(navigation.usePathname).toBeDefined();
    expect(navigation.useRouter).toBeDefined();
    expect(navigation.getPathname).toBeDefined();
  });
});
