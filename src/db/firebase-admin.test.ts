import { describe, it, expect, vi, beforeEach } from "vitest";

type AppStub = { name: string };
const st = vi.hoisted(() => ({
  apps: [] as AppStub[],
  initArgs: null as null | { credential: unknown },
  lastCertArg: null as null | {
    projectId: string;
    clientEmail: string;
    privateKey?: string;
  },
  lastAuthApp: null as AppStub | null,
  lastDbApp: null as AppStub | null,
}));

vi.mock("firebase-admin/app", () => {
  return {
    cert: (sa: { projectId: string; clientEmail: string; privateKey?: string }) => {
      st.lastCertArg = sa;
      return { __cred: true, sa };
    },
    getApps: () => st.apps,
    initializeApp: (opts: { credential: unknown }) => {
      st.initArgs = opts;
      const app: AppStub = { name: "new-app" };
      st.apps = [app];
      return app;
    },
  };
});

vi.mock("firebase-admin/auth", () => ({
  getAuth: (app: AppStub) => {
    st.lastAuthApp = app;
    return { __auth: true };
  },
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: (app: AppStub) => {
    st.lastDbApp = app;
    return { __db: true };
  },
}));

const loadModule = async () => {
  vi.resetModules();
  return await import("./firebase-admin");
};

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv };
  st.apps = [];
  st.initArgs = null;
  st.lastCertArg = null;
  st.lastAuthApp = null;
  st.lastDbApp = null;
});

describe("firebase admin init (admin.ts)", () => {
  it("init: когда нет приложений — вызывает initializeApp(cert(serviceAccount)), заменяет \\n в приватном ключе, и передает app в getAuth/getFirestore", async () => {
    process.env.FIREBASE_PROJECT_ID = "proj";
    process.env.FIREBASE_CLIENT_EMAIL = "svc@proj";
    process.env.FIREBASE_PRIVATE_KEY = "-----BEGIN-----\\nLINE1\\nLINE2\\n-----END-----\\n";

    const mod = await loadModule();

    expect(st.lastCertArg).toEqual({
      projectId: "proj",
      clientEmail: "svc@proj",
      privateKey: "-----BEGIN-----\nLINE1\nLINE2\n-----END-----\n",
    });

    expect(st.initArgs).not.toBeNull();

    expect(st.lastAuthApp).toEqual(st.apps[0]);
    expect(st.lastDbApp).toEqual(st.apps[0]);

    expect(mod.adminAuth).toBeTruthy();
    expect(mod.db).toBeTruthy();
  });

  it("reuse: когда приложение уже есть — не вызывает initializeApp/cert и использует существующий app", async () => {
    st.apps = [{ name: "existing" }];

    delete process.env.FIREBASE_PRIVATE_KEY;
    process.env.FIREBASE_PROJECT_ID = "proj";
    process.env.FIREBASE_CLIENT_EMAIL = "svc@proj";

    const mod = await loadModule();

    expect(st.lastCertArg).toBeNull();
    expect(st.initArgs).toBeNull();

    expect(st.lastAuthApp).toEqual(st.apps[0]);
    expect(st.lastDbApp).toEqual(st.apps[0]);

    expect(mod.adminAuth).toBeTruthy();
    expect(mod.db).toBeTruthy();
  });
});
