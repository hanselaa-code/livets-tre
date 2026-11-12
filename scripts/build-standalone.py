#!/usr/bin/env python3
"""
Bundles the Vite production build (dist/) and all 12 Nano Banana illustrations
into a single zero-dependency, CSP-safe HTML file that runs anywhere:
- Inside Antigravity's built-in Artifact Preview pane
- Directly from Google Drive / local disk (file://) without any web server
"""
import base64
import glob
import io
import json
import os
import re
from PIL import Image

ROOT = "/home/antigravity"
DIST = os.path.join(ROOT, "dist")
IMG_DIR = os.path.join(ROOT, "public", "images", "evolution")
OUT_DIST_HTML = os.path.join(DIST, "Livets-Tre-Presentasjon.html")


def encode_image_data_uri(png_path: str) -> str:
    with Image.open(png_path) as im:
        rgb = im.convert("RGB")
        if rgb.width > 1280:
            rgb = rgb.resize((1280, 720), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        rgb.save(buf, format="WEBP", quality=80, method=6)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
        return f"data:image/webp;base64,{b64}"


def main() -> None:
    css_files = sorted(glob.glob(os.path.join(DIST, "assets", "*.css")))
    js_files = sorted(glob.glob(os.path.join(DIST, "assets", "*.js")))
    if not css_files or not js_files:
        raise RuntimeError("Run `vite build` before building standalone HTML.")

    css_content = "\n".join(open(f, encoding="utf-8").read() for f in css_files)
    js_content = "\n".join(open(f, encoding="utf-8").read() for f in js_files)

    img_map = {}
    for png_file in sorted(glob.glob(os.path.join(IMG_DIR, "*.png"))):
        fname = os.path.basename(png_file)
        img_map[fname] = encode_image_data_uri(png_file)

    img_json = json.dumps(img_map, separators=(",", ":"))
    safe_js = re.sub(r"</script", r"<\\/script", js_content, flags=re.IGNORECASE)

    favicon_svg_path = os.path.join(ROOT, "public", "favicon.svg")
    favicon_b64 = base64.b64encode(open(favicon_svg_path, "rb").read()).decode("ascii")

    html = f"""<!doctype html>
<html lang="nb" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,{favicon_b64}" />
    <meta
      name="description"
      content="Livets Tre – Fra LUCA (3700 ma) til Homo sapiens. En interaktiv klasseromspresentasjon for Vg1 naturfag og biologi."
    />
    <title>Livets Tre – Fra LUCA til Homo sapiens | Interaktiv Klasseromspresentasjon</title>
    <style>
{css_content}
    </style>
  </head>
  <body class="bg-[#0B1120] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
    <div id="root"></div>
    <script>window.__EVO_IMGS__ = {img_json};</script>
    <script type="module">
{safe_js}
    </script>
  </body>
</html>
"""

    with open(OUT_DIST_HTML, "w", encoding="utf-8") as f:
        f.write(html)

    size_mb = os.path.getsize(OUT_DIST_HTML) / (1024 * 1024)
    print(f"Built {OUT_DIST_HTML} ({size_mb:.2f} MB, {len(img_map)} unique HD WebP images)")


if __name__ == "__main__":
    main()
