# components.json Documentation

`components.json` is heavily used by UI libraries like **shadcn-ui** and **animate-ui**. This is essentially your project's "design system configuration".

When you try to run commands in the terminal like `npx shadcn-ui@latest add button`, it reads this file to figure out where to actually place the code it generates for you.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",        // Your base button styling preference 
  "rsc": false,                // React Server Components (RSC) usage
  "tsx": true,                 // Tells the CLI that you are using TypeScript instead of normal JS
  "tailwind": {
    "config": "",              // Points to your Tailwind overrides (Vite v4 Tailwind is inline in your app.css instead!)
    "css": "app/app.css",      // Tells it where your main CSS file is so it can inject new CSS rules if necessary
    "baseColor": "neutral",    // The default grey shade to use for UI elements
    "cssVariables": true,      // Allows colors to swap nicely when the user switches to Dark Mode
    "prefix": ""
  },
  "iconLibrary": "lucide",     // Shadcn will automatically install 'lucide-react' icons for you
  "aliases": {
    // This tells the CLI: "Whenever I download a new component, please put it in my `~/components` shortcut folder!"
    "components": "~/components",
    "utils": "~/lib/utils",
    "ui": "~/components/ui",
    "lib": "~/lib",
    "hooks": "~/hooks"
  },
  "registries": {
    // A custom registry you've added for downloading UI animations
    "@animate-ui": "https://animate-ui.com/r/{name}.json"
  }
}
```
