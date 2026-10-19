from pathlib import Path
import json
import wave
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parents[1]
review=root/'out/dream-review'
data=json.loads((review/'technical-validation.json').read_text(encoding='utf-8'))
pixels=np.fromfile(review/'frame-luma.rgb',dtype=np.uint8).reshape(-1,9,16,3)
means=pixels.astype(float).mean(axis=(1,2,3))
frames={'decodedFrameCount':int(len(means)),'minMeanRGB':float(means.min()),'maxMeanRGB':float(means.max()),'blackFrames':np.where(means<5)[0].tolist(),'passed':bool(len(means)==900 and np.all(means>=5))}
def read_audio(name):
    with wave.open(str(review/name),'rb') as f:
        assert f.getframerate()==16000 and f.getnchannels()==1 and f.getsampwidth()==2
        return np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(float)/32768
original=read_audio('source-audio.wav')
encoded=read_audio('encoded-audio.wav')
n=min(len(original),len(encoded));original=original[:n];encoded=encoded[:n]
size=1<<(2*n-1).bit_length()
corr=np.fft.irfft(np.fft.rfft(encoded,size)*np.conj(np.fft.rfft(original,size)),size)
lags=np.arange(-1600,1601);values=corr[lags%size];lag=int(lags[np.argmax(values)])
if lag>=0: left=original[:n-lag];right=encoded[lag:]
else: left=original[-lag:];right=encoded[:n+lag]
coefficient=float(np.corrcoef(left,right)[0,1])
audio={'measuredOffsetSamples':lag,'sampleRate':16000,'measuredOffsetMs':lag/16,'correlationAfterAlignment':coefficient,'passed':abs(lag/16000)<=1/30 and coefficient>.98}
comparisons=[]
for frame in data['exportFrames']:
    a=review/'frames'/f'frame-{frame:03d}.png';b=review/'export-frames'/f'frame-{frame:03d}.png'
    if not a.exists():continue
    x=np.asarray(Image.open(a).convert('RGB')).astype(np.int16);y=np.asarray(Image.open(b).convert('RGB')).astype(np.int16)
    comparisons.append({'frame':frame,'meanAbsoluteChannelDifference':float(np.abs(x-y).mean())})
parity_passed=len(comparisons)==len(data['exportFrames']) and all(c['meanAbsoluteChannelDifference']<3 for c in comparisons)
data.update({'fullVideoDecode':frames,'encodedAudioAgainstOriginal':audio,'exportParity':comparisons,'exportParityPassed':parity_passed,'allMeasuredTechnicalChecksPassed':bool(data['allProbeChecksPassed'] and frames['passed'] and audio['passed'] and parity_passed)})
(review/'technical-validation.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'fullVideoDecode':frames,'audio':audio,'exportParity':comparisons},indent=2))
if data['allMeasuredTechnicalChecksPassed']:
    for name in ['frame-luma.rgb','source-audio.wav','encoded-audio.wav']:
        (review/name).unlink()
else:
    raise SystemExit('Technical validation failed; decoded evidence retained.')
