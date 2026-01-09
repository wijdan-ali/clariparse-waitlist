// Temporary shim for `three` types.
//
// In theory, `three` ships its own TypeScript declarations, but some build
// environments (e.g. Vercel/Next type-check step) can fail to resolve them and
// treat the package as untyped JS. This shim unblocks `next build`.
declare module 'three' {
  const THREE: any
  export = THREE
}

