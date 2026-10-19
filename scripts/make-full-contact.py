from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "out/dream-full-review"
FONT = ImageFont.truetype(r"C:\Windows\Fonts\simhei.ttf", 22)
timeline = json.loads((ROOT / "src/data/full-timeline.json").read_text(encoding="utf-8"))
manifest = json.loads((FOLDER / "frame-manifest.json").read_text(encoding="utf-8"))

def sheet(frames, columns, destination, width=420, source="frames"):
    height = round(width * 9 / 16)
    rows = (len(frames) + columns - 1) // columns
    image = Image.new("RGB", (width * columns, (height + 38) * rows), "#eee7da")
    draw = ImageDraw.Draw(image)
    for i, frame in enumerate(frames):
        path = FOLDER / source / f"frame-{frame:04d}.png"
        shot = Image.open(path).convert("RGB").resize((width, height), Image.Resampling.LANCZOS)
        x, y = (i % columns) * width, (i // columns) * (height + 38)
        image.paste(shot, (x, y + 38))
        draw.text((x + 12, y + 7), f"{frame / 30:06.2f}s / {frame:04d}", font=FONT, fill="#5c5350")
    image.save(FOLDER / destination, quality=94)

all_frames = [item["frame"] for item in manifest["frames"]]
sheet(all_frames, 5, "full-contact-sheet.jpg", 360)
transition_frames = []
for shot in timeline[:-1]:
    transition_frames.extend([shot["endFrame"] - 1, shot["endFrame"] + shot["transitionFrames"] // 2, shot["endFrame"] + shot["transitionFrames"]])
sheet(transition_frames, 5, "full-transition-sheet.jpg", 360)
if (FOLDER / "export-frames/frame-5507.png").exists():
    export_frames = [0, 900, 1312, 1636, 1930, 2310, 2702, 3064, 3363, 3726, 3961, 4344, 4727, 5090, 5320, 5507]
    sheet(export_frames, 4, "full-export-contact-sheet.jpg", 420, "export-frames")
print("Full contact sheets generated.")
