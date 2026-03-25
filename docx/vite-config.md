# vite.config.ts Documentation

This file tells **Vite** how to bundle and build your project. Vite is the incredibly fast tool running in your terminal that powers your local development server (`npm run dev`) and bundles your code for production.

```ts
// 1. We import the `reactRouter` plugin. This teaches Vite how to understand React Router v7's special file-based routing and server-side rendering setup.
import { reactRouter } from "@react-router/dev/vite";

// 2. We import TailwindCSS v4 plugin. This teaches Vite how to instantly process all your Tailwind utility classes (like `flex`, `text-green-400`) into raw CSS.
import tailwindcss from "@tailwindcss/vite";

// 3. We import `defineConfig` from Vite. This is just a helper function that gives us nice autocomplete when typing out our configuration.
import { defineConfig } from "vite";

// 4. We import `tsconfigPaths`. This plugin teaches Vite to respect the path aliases (like `~/`) that we define in our `tsconfig.json`. Without it, Vite wouldn't know how to resolve `import { abc } from '~/components/...'`.
import tsconfigPaths from "vite-tsconfig-paths";

// 5. We export our final configuration telling Vite to use the three plugins we just imported.
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
```
