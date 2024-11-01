# wfp-hunger-map

This is the repository for the World Food Program's HungerMap.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [leaflet](https://leafletjs.com/), [react-leaflet](https://react-leaflet.js.org/)
- [Highcharts](https://www.highcharts.com/), [highcharts-react](https://github.com/highcharts/highcharts-react)

## How to Use

**Make sure to use yarn instead of npm!**

### Install dependencies

```bash
yarn install
```

### Run the development server

```bash
yarn dev
```

## Development guidelines

Besides the usual guidlines, we're following these as per the customer's request:

### Styling

Linting and styling is based on [Airbnb's React style guide](https://airbnb.io/javascript/react/). A pre-commit hook will make sure that only well-formatted code is commited to the repo, but a GitHub Actions workflow will also check this on each PR.

### Git and GitHub

Always work on a separate branch, never commit to main! When you're creating a branch, you should use the branchname provided by Linear. Click the branch icon in the upper right corner of issue's page on Linear to copy the branchname. It should have the following format: `feature/<issue no.>-<concise description of issue>`. Also use meaningful, but concise commit messages. After you're done with your task, create a Pull Request and share it with your teammates, ask your team lead and/or TPL for a review. Use squash merge when the PR is approved.

### Project Structure

Each component should have their own file, where the file name is the name of the component. The app directory is for pages and layouts, all other components should go to the components directory. Try to group components to sub-directories based on their function. Code that doesn't belong to a specific component should be placed in a different file, in directories like utils, config, types, etc.

### Domain Driven Design

DDD is a software design approach that is against the idea of having a single unified model; instead it divides a large system into bounded contexts, each of which have their own model.

What this means for a React application, is that instead of using one global state with, for example Redux, we will have a React context for each of our entities that will store all the data and offer all the methods related to that domain.

### Dependency Injection

The point of DI is that the dependencies of services should not be hardcoded, instead they should receive them as parameters, where the type of the parameter is an interface. This makes testing easier and the code more reusable, since the same service can be used with different implementations of the same interface (for example mock implementations for testing).

For a React application, the most common depeendency that needs mocking is the one that makes the HTTP call to the API. Thus contexts or hooks that call the backend should receive the HTTP library implementation as a prop or from a higher-order context.
