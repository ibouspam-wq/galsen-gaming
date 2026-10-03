// Registers the @testing-library/jest-dom matchers (e.g. toBeInTheDocument)
// with Vitest's `expect` for the TypeScript program. The runtime registration
// lives in vitest.setup.ts, which sits outside tsconfig's `include`; this
// declaration file lives under src/ so `tsc --noEmit` sees the augmentation.
import "@testing-library/jest-dom/vitest";
