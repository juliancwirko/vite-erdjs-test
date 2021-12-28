Playing around with Vite and Erdjs

Works, but:

1. I had to use the browserify version of the library because adding Node polyfills won't work for me (I didn't spend much time, though)
2. I had to add the Typescript declaration 'hack' to use the typings. See [erdjs.d.ts](https://github.com/juliancwirko/vite-erdjs-test/blob/main/src/erdjs.d.ts)
3. The output bundle file is big, which isn't good. The erdjs library would probably need some changes. Maybe it can be split into modules, even for browser usage.
4. I had to use strictly version 8.0.0 because the one published in the npm registry doesn't include output for browsers
5. The minified version of erdjs doesn't work for me. For more details see [here](https://github.com/ElrondNetwork/elrond-sdk-erdjs/pull/95)
6. I think similar problems will be with Webpack 5, but it worked with Webpack 4, so maybe the solution will be more straightforward. I am unsure if it will be possible with the new Create React App without ejecting.

- `yarn install`
- `yarn dev`

- `yarn build`
- `yarn preview`
