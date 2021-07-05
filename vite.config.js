import { defineConfig } from "vite";
import {resolve} from "path"
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //
    svelte(),
    // tsconfigPaths fails in `vite build`, because of null bytes in the path or something
    // tsconfigPaths({
      //   extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".svelte"],
      //   loose: true,
      // }),
    ],
    resolve: {
      alias: {
        "$components": resolve(__dirname, "src/components/"),
        "$lib": resolve(__dirname, "src/lib/"),
        "$src": resolve(__dirname, "src/"),
      },
    },
    base: "./",
});
