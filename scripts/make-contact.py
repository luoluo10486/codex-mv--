from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json

root=Path(__file__).resolve().parents[1]
folder=root/'out/dream-review'
font=ImageFont.truetype(r'C:\Windows\Fonts\simhei.ttf',23)

def sheet(frames,columns,dest,width=640,source='frames'):
    height=round(width*9/16)
    rows=(len(frames)+columns-1)//columns
    im=Image.new('RGB',(width*columns,(height+38)*rows),'#eee7da')
    draw=ImageDraw.Draw(im)
    for i,frame in enumerate(frames):
        p=folder/source/f'frame-{frame:03d}.png'
        shot=Image.open(p).convert('RGB').resize((width,height),Image.Resampling.LANCZOS)
        x=(i%columns)*width;y=(i//columns)*(height+38)
        im.paste(shot,(x,y+38))
        draw.text((x+16,y+6),f'{frame/30:05.2f}s  /  {frame:03d}',font=font,fill='#5c5350')
    im.save(folder/dest,quality=94)

sheet([0,45,140,260,380,500,615,680,720,780,840,899],3,'contact-sheet.jpg')
timeline=json.loads((root/'src/data/dream-timeline.json').read_text(encoding='utf-8'))
transition_frames=[f for shot in timeline[:-1] for f in [shot['endFrame']-1,shot['endFrame']+shot['transitionOutFrames']//2,shot['endFrame']+shot['transitionOutFrames']]]
sheet(transition_frames,3,'transition-sheet.jpg',480)
if (folder/'typing-frames/frame-870.png').exists():
    sheet([668,676,688,700,714,733,841,849,858,870],5,'typing-sheet.jpg',480,'typing-frames')
if (folder/'export-frames/frame-899.png').exists():
    sheet([0,45,140,260,380,500,615,680,720,780,840,899],3,'export-contact-sheet.jpg',640,'export-frames')
print('Contact sheets generated from rendered PNG frames.')
