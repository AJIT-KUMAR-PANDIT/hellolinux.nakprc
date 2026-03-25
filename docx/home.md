# Home Page Documentation

This document explains every line of the `app/routes/home.tsx` file for a beginner. This file dictates what the user actually sees when they visit your website's main, underlying URL (the home page).

```tsx
// 1. We import a custom TypeScript 'Type' called `Route` that React Router v7 automatically generates behind the scenes in a hidden `.react-router/` folder. This gives us autocomplete superpowers when writing our code.
import type { Route } from "./+types/home";

// 2. We import the `BottomNav` component we built in the `app/components/Common/BottomNav.tsx` file. 
// Notice the `~/` path alias shortcut we set up in our tsconfig.json is being used here!
import BottomNav from "~/components/Common/BottomNav";

// 3. A blank line for readability.

// 4. We export a special function named `meta`. React Router automatically looks inside every page file for this exact function name. It allows us to set the invisible data in the `<head>` of our HTML specifically for *this* page.
// We pass an empty object `{ }` because we don't need to use any route data here, but we tell TypeScript it must follow the `Route.MetaArgs` blueprint.
export function meta({ }: Route.MetaArgs) {

// 5. We return an array `[ ]` containing the specific meta information we want.
  return [

// 6. This object dynamically changes the literal browser tab name (the title of the webpage) to "New React Router App".
    { title: "New React Router App" },

// 7. This provides a description for search engines like Google to read when indexing your site. It helps with SEO!
    { name: "description", content: "Welcome to React Router!" },

// 8. We close the array.
  ];

// 9. We close the `meta` function definition.
}

// 10. Blank line.

// 11. Finally, we build and export the actual UI component for this page! We name it `Home`. The `export default` tells React Router that this is the primary thing this file is trying to provide. 
export default function Home() {

// 12. We tell React to simply draw our `<BottomNav />` component and absolutely nothing else. Since it is a fixed bar on the bottom, the rest of the page will be completely blank above it!
  return <BottomNav />;

// 13. We close the `Home` function.
}
```
