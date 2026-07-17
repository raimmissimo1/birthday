# Client Asset Privacy

Do not commit customer photos, cards or music to public GitHub or `public/`. Store them in private S3, MinIO or R2 and resolve short-lived signed URLs by a random, revocable slug. Define consent, retention and deletion dates per order, remove materials on request, and record separate music/model/image licenses. `scripts/check-public-personal-assets.mjs` warns about public client directories; it is intentionally a warning gate until existing demo fixtures are migrated.
