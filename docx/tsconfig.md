# tsconfig.json Documentation

`tsconfig.json` is the configuration file for **TypeScript**. TypeScript's job is to read your code and yell at you if you pass a number into a function that expects text, or if you misspell a property. It prevents bugs before they happen.

Here are the most important non-standard settings in your specific project:

```json
{
  // `include` tells TypeScript which folders it should watch and check for errors.
  "include": [
    "**/*",                        // Check all files
    "**/.server/**/*",             // Check server-only files
    "**/.client/**/*",             // Check client-only files
    ".react-router/types/**/*"     // Check the magically generated types created by React Router v7
  ],
  "compilerOptions": {
    // ... many standard Typescript options ...

    // `baseUrl` and `paths` work together to create custom import shortcuts.
    // Instead of doing `import xyz from '../../../../../components/xyz'` 
    // you can type `import xyz from '~/components/xyz'` from anywhere!
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },

    // `noEmit: true` means we only use TypeScript as a spell-checker/type-checker. We let Vite (our bundler) actually handle converting our TS code into browser-friendly Javascript.
    "noEmit": true
  }
}
```
