import type { GenMethod, GenHeader } from "./helpers";
import { genCurl } from "./langs/curl";
import { genFetch } from "./langs/fetch";
import { genXhr } from "./langs/xhr";
import { genNode } from "./langs/node";
import { genPython } from "./langs/python";
import { genJava } from "./langs/java";
import { genCSharp } from "./langs/csharp";
import { genGo } from "./langs/go";

export type { GenMethod, GenHeader } from "./helpers";

export type Snippets = {
  curl: string;
  fetch: string;
  xhr: string;
  node: string;
  python: string;
  java: string;
  csharp: string;
  go: string;
};

export const generateCodeSnippets = (input: {
  method: GenMethod;
  url: string;
  headers: GenHeader[];
  body: string;
}): Snippets => ({
  curl: genCurl(input.method, input.url, input.headers, input.body),
  fetch: genFetch(input.method, input.url, input.headers, input.body),
  xhr: genXhr(input.method, input.url, input.headers, input.body),
  node: genNode(input.method, input.url, input.headers, input.body),
  python: genPython(input.method, input.url, input.headers, input.body),
  java: genJava(input.method, input.url, input.headers, input.body),
  csharp: genCSharp(input.method, input.url, input.headers, input.body),
  go: genGo(input.method, input.url, input.headers, input.body),
});
