import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

import nodePackage from "./package.json" assert { type: "json" };

const reformatManifest = (target, dev, contents) => {
  const manifest = JSON.parse(contents.toString());

  // Uses version number from package.json
  manifest.version = nodePackage.version;

  // Add dev mode to manifest if in the dev environment
  if (dev) manifest.description = `[DEV MODE] ${manifest.description}`;

  // Leave manifest alone if using chromium
  if (target === "chromium") return JSON.stringify(manifest, null, 2);

  // Reformats manifest for gecko support below
  manifest.manifest_version = 2;
  manifest.background.scripts = [manifest.background.service_worker];
  delete manifest.background.service_worker;

  return JSON.stringify(manifest, null, 2);
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
      }),
      typescript(),
      postcss({
        extensions: [".css", ".styl"],
        extract: "bundle.css",
      }),
      copy({
        targets: [
          {
            src: "public/manifest.json",
            dest: output,
            // Properly formats manifest for all browser engines and code environments
            transform: (contents) => reformatManifest(target, dev, contents),
          },
          { src: "public/assets", dest: output },
        ],
      }),

      // Only runs in production
      !dev &&
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        }),
    ],
  };
};
