# Better SLP

Better SLP is a browser extension that improves the Summit Learning Platform by adding additional quality-of-life improvments.

> :warning: This extension is currently in development and is not avaliable for public use in any browser. To run locally, clone the repository with `git clone`, install the required dependencies with `npm install`, and then compile the extension by running `npm run build`. This will output a `public` directory which can be loaded as an unpacked extension in most browers (chrome://extensions, brave://extensions, about:debugging, etc.)

## Features

- Dark mode (WIP)
- Assessment note taker (WIP)
- Year progress breakdown
- GPA Estimation
- Announcements Tab Indicator (WIP)
- And more!

## Bug reporting

If you are here to report a bug, please visit the [issues panel](https://github.com/GavHern/better-slp/issues) and open an issue report!

## Notes for contributors

Here's a general introduction to the codebase to make it easy to start making additions. Before you implement anything major, please create an issue proposing the idea so we can discuss the best way to implement it.

### Guidelines for additions

New additions should subjectively fit in with the Summit Learning Platform and feel intentional. New components should be placed where they intuitively would appear and should feel like they were meant to belong there, not like they were added as an afterthought (even though that is the point).

Additions should be functional regardless of grade level or school. Whether it's a 6th grader in California or a senior in a Washington school, additions should not harm anyone's experience using the platform.

### Project structure

Anything placed in the root directory should relate to the repository itself such as config files.

Global typescript definitions are put in the `typings` directory. It is fine to include typings in individual files/components but if it's anything major like strongly typing an API response or a commonly used type then it can be placed in there out of courtesy for others who may need it.

<br>

All of the actual code is placed in the `src` directory, which is then compiled into the `public` directory using the rollup bundler. **Do not make your changes in the public directory, they will be overridden and won't push to github!**

`manifest.json` is the manifest for the extension. Any directory written in this file should be relative to the **public, compiled directory**. This means that typescript files should be suffixed with ".js" and files not already copied over will need to be included in the rollup config.

`content.ts` is the content script and `worker.ts`is the service worker. It would be ideal to not make several of these but if it makes sense to then you're welcome to.

Anything specific to a certain route on the Summit Learning website (week, year, progress, focus area, etc.) should be put in `src/routes`. Each folder is dedicated to a route and the `handler.ts` file is what should run when the route is navigated to. Components specific to the route should also be placed here.

The components folder should be for components that are able to appear on several routes. All components are written in [svelte.js](https://svelte.dev). Svelte is a highly performant javascript framework that has strong resemblance to vanilla html/js. These components compile down to vanilla javascript with 0 dependancies making them very small and efficient.

The assets folder is for any file that needs to be present in the manifest or directly used in the project without being bundled by rollup.

### Additional notes

One major hurdle of making this project is that Summit Learning is a single page application that uses a client-side router, meaning there is no event emitted by javascript to indicate that a new page has loaded. As a workaround, we currently check for the URL to be changed by the pushState API and then listen for the green progress bar (nprogress) to be removed from the DOM, indicating that the page has finished loading. This is far from ideal and we're still working on a better solution to this (probably using mutation observers) but in the meantime, it may take a split second for route handlers to run after navigation has finished.
