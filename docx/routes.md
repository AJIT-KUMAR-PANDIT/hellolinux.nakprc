# app/routes.ts Documentation

`app/routes.ts` is the central map for **React Router v7**. This determines what file on your computer gets shown on the screen when a user goes to a specific URL (like `/home` or `/about`).

```ts
// 1. We import `RouteConfig` (which is just a Typescript blueprint for routing info) and the `index` function.
import { type RouteConfig, index } from "@react-router/dev/routes";

// 2. We define our routes!
// `index("routes/home.tsx")` means that when someone visits the absolute root of your website (e.g., https://yourdomain.com/), it should display the React component exported in the `app/routes/home.tsx` file.
// If you wanted an about page, you could add: `route("about", "routes/about.tsx")`.
export default [
    index("routes/home.tsx")
] satisfies RouteConfig;
```
