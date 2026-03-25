# Welcome Page Documentation

This document explains the boilerplate Welcome page (`app/welcome/welcome.tsx`) that was generated when you created your React Router app. While your `Home` page doesn't currently display this (since you changed it to show only your `BottomNav`), it's a great example of a styled UI page!

```tsx
// 1. We import a React Router logo built specifically for 'Dark Mode' from a local SVG file in this same folder.
import logoDark from "./logo-dark.svg";

// 2. We import the 'Light Mode' version of the React Router logo.
import logoLight from "./logo-light.svg";

// 3. A blank line.

// 4. We create and immediately export a main React Component function named `Welcome`. Any time we want to show this screen, we will return `<Welcome />`.
export function Welcome() {

// 5. Everything after `return (` is the HTML-like structure (JSX) that gets drawn on the screen.
  return (

// 6. `<main>` is the primary container for the entire page's content.
// `flex items-center justify-center` centers everything horizontally and vertically.
// `pt-16 pb-4` adds extra padding at the top and bottom.
    <main className="flex items-center justify-center pt-16 pb-4">

// 7. This internal `<div>` wraps the logo and the menu. 
// `flex-col` stacks its children vertically instead of side-by-side. 
// `gap-16` adds huge spacing between the logo and the menu below it.
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">

// 8. We create a `<header>` section explicitly for the logo.
        <header className="flex flex-col items-center gap-9">

// 9. A wrapper for the logo image. It is perfectly exactly 500 pixels wide (`w-[500px]`), but the screen is tiny, its maximum width is 100% of the screen (`max-w-[100vw]`).
          <div className="w-[500px] max-w-[100vw] p-4">

// 10. The <img> tag for the Light Theme logo.
            <img

// 11. We set the source of the image to the `logoLight` variable we imported earlier.
              src={logoLight}

// 12. Alternative text for screen readers (accessibility).
              alt="React Router"

// 13. `block` makes it normally visible. However, `dark:hidden` means if the user's computer/browser is in Dark Mode, this specific image disappears completely!
              className="block w-full dark:hidden"

// 14. We close the img tag properly.
            />

// 15. The <img> tag for the Dark Theme logo.
            <img

// 16. We set the source to `logoDark`.
              src={logoDark}

// 17. Alternative text again.
              alt="React Router"

// 18. `hidden` hides this image by default. But `dark:block` brings it to life when the user switches to Dark Mode! So they seamlessly swap.
              className="hidden w-full dark:block"

// 19. Close img.
            />

// 20. We close the image wrapper div.
          </div>

// 21. We close the header wrapper.
        </header>

// 22. A new container `div` wrapper for the menu links below the logo. It is limited to 300 pixels wide (`max-w-[300px]`).
        <div className="max-w-[300px] w-full space-y-6 px-4">

// 23. A `<nav>` element wrapper with a nice rounded border `border-gray-200` that changes smartly in dark mode `dark:border-gray-700`.
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">

// 24. A paragraph tag `<p>` acting as the title. It says "What's next?", but we use `&apos;` instead of a literal ' so that the code formatters don't break.
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s next?
            </p>

// 25. An Unordered List `<ul>` for our links.
            <ul>

// 26. Magic time! We have a Javascript array called `resources` way down at the bottom of the file. 
// We use `.map()` to loop through every single item in that array. Inside the loop, we pluck out the `href`, `text`, and `icon` properties.
              {resources.map(({ href, text, icon }) => (

// 27. For each item in the array, we generate one list item `<li>`. React requires a unique `key` whenever looping over elements so it doesn't get confused, we use the `href` link.
                <li key={href}>

// 28. Inside the list item, we draw a clickable link `<a>`. The `group` class helps manage hover-effects easily.
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"

// 29. We map the URL (`href`) dynamically to wherever the current item wants us to go.
                    href={href}

// 30. `target="_blank"` ensures the link opens in a brand new browser tab, instead of taking them away from our site.
                    target="_blank"

// 31. Security feature protecting against malicious tabs.
                    rel="noreferrer"

// 32. Closing the opening `<a>` tag string.
                  >

// 33. We dynamically drop the custom SVG icon here!
                    {icon}

// 34. We dynamically print out the text (like "React Router Docs").
                    {text}

// 35. Close `<a>`.
                  </a>

// 36. Close `<li>`.
                </li>

// 37. Close the map loop function.
              ))}

// 38. Close `<ul>`.
            </ul>

// 39. Close `<nav>`.
          </nav>

// 40. Close the menu link `div`.
        </div>

// 41. Close the inner `div`.
      </div>

// 42. Close `<main>`.
    </main>

// 43. Close `Welcome` component.
  );
}

// 44. The `resources` variable array! This holds all the raw data used for the menu list above.
// If you wanted to add a "GitHub" link to the page, you'd add another { href: "...", text: "...", icon: <svg> } block right here!
const resources = [
  // ... List of menu link data ...
];
```
