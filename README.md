# Better SLP

Better SLP is a browser extension that improves the Summit Learning Platform by adding additional quality-of-life improvments.

## Features

- Dark mode (WIP)
- Assessment note taker (WIP)
- Year progress breakdown
- GPA Estimation
- Announcements Tab Indicator (WIP)
- And more!

## Bug reporting

If you are here to report a bug, please visit the [issues panel](https://github.com/GavHern/better-slp/issues) and open an issue report! You may also email them to betterslp@gavhern.com.

## Running locally

To run this extension locally, you will need [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download/)

```sh
git clone https://github.com/GavHern/better-slp.git
cd better-slp
npm install
```

To build the project, there are several options:

```sh
# Builds the production bundle
npm run build

# Starts a live development environment for chromium
npm run dev:chromium

# Starts a live development environment for gecko
npm run dev:gecko
```

The build is slightly different depending on your browser engine. Browsers like chrome, brave, opera, and edge use chromium while browsers like firefox use gecko. Webkit browsers like safari should support the chromium build.

You may choose to specify a browser engine after both the `build` and `dev` scripts, or omit them. `build` defaults to compiling both chromium and gecko while `dev` defaults to chromium

The development environment is outputted in `dist/dev`, and the production builds are outputted in `dist/chromium` and `dist/gecko` respectively.

## Notes for contributors

Here's a general introduction to the codebase to make it easy to start adding things! Before you implement anything too major, please create an issue proposing the idea so we can discuss the best way to implement it.

### Guidelines for additions

New additions should subjectively fit in with the Summit Learning Platform and feel intentional. New components should be placed where they intuitively would appear and should feel like they were meant to belong there, not like they were added as an afterthought (even though that is the point).

Additions should be functional regardless of grade level or school. Whether it's a 6th grader in a California school, a senior in a Washington school, or maybe even a homeschooled student using the platform; new additions should not harm any user's experience.

### Project structure

Anything placed in the root directory should relate to the repository itself such as config files.

Global typescript definitions are put in the `typings` directory. It is fine to include typings in individual files/components but if it's anything major like strongly typing an API response or a commonly used type then it can be placed in there out of courtesy for others who may need it.

<br>

The `src` directory is for files that will be compiled by [rollup](https://rollupjs.org). The `public` directory is for files that dont need to be compiled and will be directly copied into the bundle.

`manifest.json` is the manifest for the extension. Any directory written in this file should be relative to the **`dist`, compiled directory**. This means that typescript files should be suffixed with ".js" and files not already copied over will need to be included in the rollup config.

`content.ts` is the content script and `worker.ts`is the service worker. It would be ideal to not make several of these but if it makes sense to then you're welcome to. The service worker will be used as a background script in the gecko build so make sure it's cross compatible.

Anything specific to a certain route on the Summit Learning website (week, year, progress, focus area, etc.) should be put in `src/routes`. Each directory is dedicated to a route and the `handler.ts` file is what should run when the route is navigated to. Components specific to the route should also be placed here.

The components directory should be for components that are able to appear on several routes. All components are written in [svelte.js](https://svelte.dev). Svelte is a highly performant javascript framework that has strong resemblance to vanilla html/js. These components compile down to vanilla javascript with 0 dependencies making them very small and efficient.
