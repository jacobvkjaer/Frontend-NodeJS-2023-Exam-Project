import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
// import { optimizeImports } from "carbon-preprocess-svelte";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  // preprocess: [optimizeImports()],
  preprocess: vitePreprocess(),
};
