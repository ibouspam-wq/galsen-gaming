# Project Guidance

## User Preferences

- Design gaming premium et moderne : fond noir/très sombre, texte blanc et gris clair, accents violet/bleu électrique
- Effets lumineux subtils inspirés du RGB, design propre et pas surchargé
- Images réalistes de vrais setups et produits gaming, éviter l'apparence IA artificielle
- Animations discrètes et rapides, site fluide sur ordinateur, tablette et téléphone
- Architecture modulaire et propre, facilement adaptable à une boutique Shopify (composants, pages, styles, données produits, images, navigation séparés)
- Composants réutilisables pour cartes produits, catégories, boutons, header, footer et sections
- Données produits de démonstration, aucune vraie information de paiement ni fausse coordonnée
- Interface et contenus en français

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Backend prices are bigint cents (EUR); shipping is 590 cents and free at/above 9900 cents subtotal, matching the frontend shippingFeeFor.
- Frontend category metadata IDs must equal the backend category slugs exactly (ecrans-gaming, claviers-gaming, souris-gaming, casques-gaming, chaises-gaming, tapis-de-souris, boitiers-pc, eclairage-rgb, accessoires-gaming); the frontend never calls listCategories, so a mismatch silently yields empty product grids.
- Seeded backend image paths under /assets/images/products and /assets/images/categories do not exist on disk; the shipped imagery lives under /assets/generated, so lib/catalog.ts keeps a path-to-asset fallback map.
- TanStack Router validateSearch must annotate its return type with optional keys, otherwise every Link search prop fails typecheck.
- Biome rejects role=group/role=status on divs; use native fieldset/legend and output elements.
- moc 1.16.0 does not support triple-quoted multiline strings; use a single string with \n escapes.
- OQL auto-derivation (Map.toEntity) only works for flat records of primitives; nested records, variants, optionals and arrays need Map.toEntityManual with explicit .payload declarations.
- Demo catalog is seeded once in the enhanced-migration chain (migrations/00000000_000000.mo), never in the actor body.
- Vitest + @testing-library/react frontend tests plus a PocketIC backend lane (test/pocketic/backend.test.ts) run via the root test script; jest-dom matchers are registered for tsc through src/test/vitest.d.ts.
- The storefront characterization test asserts exact resolved image paths, so any PRODUCT_IMAGE_FALLBACKS/CATEGORY_IMAGE_FALLBACKS change must update src/frontend/src/__tests__/storefront-characterization.test.tsx too.
- The two changed category images (cat-tapis-de-souris, cat-ecrans-gaming) are referenced directly by data/categories.ts, not via the CATEGORY_IMAGE_FALLBACKS map, so the fallback map is only exercised for backend-seeded paths.
- cat-souris.dim_800x600.jpg remains shared by the souris-gaming category and its products; the tapis-de-souris category now uses a dedicated cat-tapis-de-souris.dim_800x600.jpg.
- The migration seed already maps ecrans-gaming ids 1-4 and tapis-de-souris ids 21-24 to correct titles, descriptions, and /assets/images/products/<slug>-{1,2}.jpg paths that match the frontend catalog.ts fallback map exactly.
