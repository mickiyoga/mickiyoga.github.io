import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import ViteYaml from "@modyfi/vite-plugin-yaml";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    // Required for import of some CMS content.
    // There isn't a good YAML preprocessor for SvelteKit.
    ViteYaml()
  ],
  server: {
    port: 5173,
    host: "127.0.0.1"
  }
});
