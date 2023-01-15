import copy from "rollup-plugin-copy";
import svelte from "rollup-plugin-svelte";
import css from "rollup-plugin-css-only";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: ["src/worker.ts", "src/content.ts"],
  output: {
    dir: "public",
  },
  external: ["svelte"],
  plugins: [
    nodeResolve(),
    svelte(),
    css({
      output: "bundle.css",
    }),
    typescript(),
    copy({
      targets: [{ src: "src/manifest.json", dest: "public" }],
    }),
  ],
};
