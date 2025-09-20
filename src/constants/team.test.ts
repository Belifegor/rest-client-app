import { describe, it, expect } from "vitest";
import { team } from "@/constants/team";

describe("team data", () => {
  it("should contain exactly 3 members", () => {
    expect(team).toHaveLength(3);
  });

  it("each member should have required fields", () => {
    team.forEach((member) => {
      expect(member).toHaveProperty("avatar");
      expect(member).toHaveProperty("name");
      expect(member).toHaveProperty("role");
      expect(member).toHaveProperty("description");
      expect(member).toHaveProperty("contributions");
      expect(Array.isArray(member.contributions)).toBe(true);
      expect(member.contributions.length).toBeGreaterThan(0);
      expect(member).toHaveProperty("github");
    });
  });

  it("each member should have a valid GitHub link", () => {
    team.forEach((member) => {
      expect(member.github).toMatch(/^https:\/\/github\.com\/[A-Za-z0-9_-]+$/);
    });
  });

  it("should contain Alexandr as team lead", () => {
    const alex = team.find((m) => m.github.includes("Belifegor"));
    expect(alex?.role).toBe("about-us.roles.teamLead");
  });

  it("should contain Anna and Victoria as developers", () => {
    const anna = team.find((m) => m.github.includes("ann-sm"));
    const vika = team.find((m) => m.github.includes("blk-thorn"));

    expect(anna?.role).toBe("about-us.roles.developer");
    expect(vika?.role).toBe("about-us.roles.developer");
  });
});
