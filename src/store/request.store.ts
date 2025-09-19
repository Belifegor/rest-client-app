import { create } from "zustand";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type Header = { id: string; key: string; value: string };
export type Param = { id: string; key: string; value: string };

export type AuthType = "none" | "basic" | "bearer";

export type AuthState = {
  type: AuthType;
  bearerToken: string;
  basic: { username: string; password: string };
};

type State = {
  method: HttpMethod;
  url: string;
  params: Param[];
  headers: Header[];
  body: string;
  auth: AuthState;

  setMethod: (m: HttpMethod) => void;
  setUrl: (u: string) => void;
  setBody: (b: string) => void;
  removeBody: () => void;

  addHeader: () => void;
  updateHeader: (id: string, patch: Partial<Header>) => void;
  removeHeader: (id: string) => void;
  setHeaders: (headers: Header[]) => void;

  addParam: () => void;
  updateParam: (id: string, patch: Partial<Param>) => void;
  removeParam: (id: string) => void;

  setAuthType: (t: AuthType) => void;
  setBearerToken: (token: string) => void;
  setBasicUsername: (u: string) => void;
  setBasicPassword: (p: string) => void;
};

export const useRequest = create<State>()((set) => ({
  method: "GET",
  url: "",
  params: [{ id: crypto.randomUUID(), key: "", value: "" }],
  headers: [{ id: crypto.randomUUID(), key: "", value: "" }],
  body: "",
  auth: {
    type: "none",
    bearerToken: "",
    basic: { username: "", password: "" },
  },

  setMethod: (m) => set({ method: m }),
  setUrl: (u) => set({ url: u }),
  setBody: (b) => set({ body: b }),
  removeBody: () => set({ body: "" }),

  addHeader: () =>
    set((s) => ({ headers: [...s.headers, { id: crypto.randomUUID(), key: "", value: "" }] })),
  updateHeader: (id, patch) =>
    set((s) => ({ headers: s.headers.map((h) => (h.id === id ? { ...h, ...patch } : h)) })),
  removeHeader: (id) => set((s) => ({ headers: s.headers.filter((h) => h.id !== id) })),
  setHeaders: (headers) => set({ headers }),

  addParam: () =>
    set((s) => ({ params: [...s.params, { id: crypto.randomUUID(), key: "", value: "" }] })),
  updateParam: (id, patch) =>
    set((s) => ({ params: s.params.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  removeParam: (id) => set((s) => ({ params: s.params.filter((p) => p.id !== id) })),

  setAuthType: (t) => set((s) => ({ auth: { ...s.auth, type: t } })),
  setBearerToken: (token) => set((s) => ({ auth: { ...s.auth, bearerToken: token } })),
  setBasicUsername: (u) =>
    set((s) => ({ auth: { ...s.auth, basic: { ...s.auth.basic, username: u } } })),
  setBasicPassword: (p) =>
    set((s) => ({ auth: { ...s.auth, basic: { ...s.auth.basic, password: p } } })),
}));
