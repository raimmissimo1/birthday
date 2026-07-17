"""Generate independently-authored CakeWish cake bases. Run with Blender 4.x in background mode."""
import bpy
from math import pi
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "models" / "cakes"
PALETTES = {"romantic": ("#e9789f", "#fff3e8"), "classic": ("#f7d995", "#fffaf0"), "rainbow": ("#5ca9ee", "#fff9ed"), "luxury": ("#3a2726", "#e9d3a7"), "cosmic": ("#33246f", "#a990e9")}
def material(name, hex_color):
    color = tuple(int(hex_color[i:i+2], 16) / 255 for i in (1, 3, 5)) + (1,)
    result = bpy.data.materials.new(name); result.diffuse_color = color; result.use_nodes = True; result.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = color
    return result
def cylinder(name, radius, height, z, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=radius, depth=height, location=(0, 0, z)); item = bpy.context.object; item.name = name; item.data.materials.append(mat); bpy.ops.object.shade_smooth(); return item
def build(variant):
    bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete(use_global=False)
    base, frosting = map(lambda c: material(variant + c, c), PALETTES[variant]); plate = material("gold", "#dfb85d")
    cylinder("Cake_Plate", 1.48, .10, .05, plate); cylinder("Cake_BottomTier", 1.25, .58, .39, base); cylinder("Cake_TopTier", .83, .44, .90, base); cylinder("Cake_Frosting", 1.29, .06, .70, frosting); cylinder("Cake_Drips", .86, .06, 1.15, frosting)
    for i, angle in enumerate((0, pi/2, pi, 3*pi/2), 1):
        bpy.ops.object.empty_add(type="PLAIN_AXES", location=(.32 * __import__("math").cos(angle), .32 * __import__("math").sin(angle), 1.20)); bpy.context.object.name = f"CandleAnchor_{i:02d}"
    OUT.mkdir(parents=True, exist_ok=True); bpy.ops.export_scene.gltf(filepath=str(OUT / f"{variant}-v1.glb"), export_format="GLB", export_cameras=False, export_lights=False, export_yup=True)
for cake in PALETTES: build(cake)
