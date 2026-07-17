# Blender Cake Pipeline

Run `blender --background --python tools/blender/generate_cake_base.py`. The script exports romantic, classic, rainbow, luxury and cosmic bases to `public/models/cakes/` with applied procedural geometry, Principled materials, named tiers and four candle anchors. Review in Blender before committing: origin centered at the plate, bottom at Y=0, transforms/normals applied, no camera/lights, 1024px-max textures, ideally under 5 MB and 80k triangles. Blender was not available in this workspace, so no GLB was exported and CakeWish intentionally uses its procedural fallback.
