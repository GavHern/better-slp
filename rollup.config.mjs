import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import minify from "postcss-minify";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const supportGeckoBrowsers = (target, contents) => {
  if (target === "chromium") return contents.toString();

  const file = JSON.parse(contents.toString());

  file.background.scripts = [file.background.service_worker];
  delete file.background.service_worker;

  return JSON.stringify(file, null, 2);
};

export default ({ configTarget: target, w: dev }) => {
  const output = `dist/${dev ? "dev" : target}`;

  return {
    input: ["src/worker.ts", "src/content.ts"],
    output: {
      dir: output,
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      svelte({
        preprocess: preprocess(),
        plugins: [nodeResolve()],
      }),
      css({
        output: "bundle.css",
      }),
      typescript(),
      postcss({
        extract: "stylus.css",
        plugins: [minify()],
      }),
      copy({
        targets: [
          {
            src: "public/manifest.json",
            dest: output,
            transform: (contents) => supportGeckoBrowsers(target, contents),
          },
          { src: "public/assets", dest: output },
        ],
      }),
    ],
  };
};
