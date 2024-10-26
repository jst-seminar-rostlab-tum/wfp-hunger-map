# wfp-hunger-map

This is the repository for the World Food Program's HungerMap.

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [leaflet](https://leafletjs.com/), [react-leaflet](https://react-leaflet.js.org/)
- [Highcharts](https://www.highcharts.com/), [highcharts-react](https://github.com/highcharts/highcharts-react)

## How to Use

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

### Domain Driven Design

DDD is a software design approach that is against the idea of having a single unified model; instead it divides a large system into bounded contexts, each of which have their own model.

What this means for a React application, is that instead of using one global state with, for example Redux, we will have a React context for each of our entities that will store all the data and offer all the methods related to that domain.

### Dependency Injection

The point of DI is that the dependencies of services should not be hardcoded, instead they should receive them as parameters, where the type of the parameter is an interface. This makes testing easier and the code more reusable, since the same service can be used with different implementations of the same interface (for example mock implementations for testing).

For a React application, the most common depeendency that needs mocking is the one that makes the HTTP call to the API. Thus contexts or hooks that call the backend should receive the HTTP library implementation as a prop or from a higher-order context.
