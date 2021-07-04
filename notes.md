# notes.md

```bash
yarn add \
  d3-color              \
  d3-interpolate        \
  lodash                \
  luxon                 \
  @types/d3-color       \
  @types/d3-interpolate \
  @types/lodash         \
  @types/luxon          \
  @vvo/tzdb
```

inspiration for a lot of the code: https://svelte.dev/repl/12d9350f9d6b44f78031e7391a6415bb?version=3.37.0

# libraries that might be cool to use
https://github.com/buhrmi/query-store
https://github.com/plrenaudin/svelte-storez
https://github.com/PixievoltNo1/svelte-writable-derived


# adding my own types for a third-party javascript library
https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html#testing-your-types


# TODO
- [x] factor out config panel
- [ ] allow add new timezone
- [ ] search box for selecting new timezone to add
- [ ] drag to re-order timezones
- [ ] add time markers on horizontal time bars
- [ ] add option to make the time cursor snap to 15 minute increments


# generic type svelte component
https://github.com/dummdidumm/rfcs/blob/ts-typedefs-within-svelte-components/text/ts-typing-props-slots-events.md



# generate type definitions for svelte-writable-derived
https://github.com/PixievoltNo1/svelte-writable-derived
tsc doesn't like it because the main file is `index.mjs` (even though it appears to be a ES6 module...)
```bash
cp node_modules/svelte-writable-derived/index.{mjs,js}
npx tsc --allowJs --declaration node_modules/svelte-writable-derived/index.js --emitDeclarationOnly
rm node_modules/svelte-writable-derived/index.js
(
echo 'declare module "svelte-writable-derived" {'
cat node_modules/svelte-writable-derived/index.d.ts
echo '}'
) > types/svelte-writable-derived.d.ts
```

