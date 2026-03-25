# react-router.config.ts Documentation

This is the central setup file for **React Router v7**. While Vite (`vite.config.ts`) builds the raw Javascript, this file handles how the server responds to user requests.

```ts
// 1. We import the `Config` type. This is purely for Typescript autocomplete.
import type { Config } from "@react-router/dev/config";

// 2. We export an object satisfying the `Config` blueprint. 
export default {
  // `ssr: true` stands for "Server Side Rendering".
  // This means that instead of giving the user a blank HTML page and telling their browser "Go run React to figure out what to paint on the screen!", your backend server figures out the HTML *first* and hands the user a fully loaded screen instantly. 
  // It is amazing for loading speeds and SEO! If you set this to `false`, it behaves like a standard React "Single Page App" (SPA). 
  ssr: true,
} satisfies Config;
```
