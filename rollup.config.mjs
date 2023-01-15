import copy from "rollup-plugin-copy";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: ["src/worker.ts", "src/content.ts"],
  output: {
    dir: "public",
  },
  plugins: [
    svelte({
      preprocess: preprocess(),
      plugins: [nodeResolve()],
    }),
    css({
      output: "bundle.css",
    }),
    typescript(),
    nodeResolve(),
    copy({
      targets: [{ src: "src/manifest.json", dest: "public" }],
    }),
  ],
};
