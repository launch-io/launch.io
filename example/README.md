# Launch.io Typescript Example

This example project imports the library code directly from the parent folder instead of importing `launch.io` as an npm dependency. One side effect of that is that React complains about there being "multiple instances" of React.

[https://reactjs.org/warnings/invalid-hook-call-warning.html](https://reactjs.org/warnings/invalid-hook-call-warning.html)

To resolve, the following from the **root of the repo** (the library code)

```
npm link ./example-typescript/node_modules/react
```

When you are done just run the following to undue it.

```
npm unlink ./example-typescript/node_modules/react
```

To get running...

1. Clone the Launch.io Repo
2. Run `npm link ./example-typescript/node_modules/react` from the root of the repo
3. Switch into `/example-typescript` and `npm run start`
