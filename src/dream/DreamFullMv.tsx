import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming, type TransitionPresentationComponentProps } from "@remotion/transitions";
import timeline from "../data/full-timeline.json";
import { remakeScenes } from "./remake/registry";
import { WarmCaptions } from "./remake/WarmCaptions";
import { WarmAtmosphere } from "./WarmArt";

const Reveal = ({children, presentationDirection, presentationProgress:p, passedProps:{kind}}:TransitionPresentationComponentProps<{kind:string}>) => {
  if(presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const clipPath=kind==="page-fold"?`polygon(0 0,${p*140}% 0,${p*140-40}% 100%,0 100%)`:kind==="star-burst"?`circle(${p*120}% at 50% 55%)`:undefined;
  return <AbsoluteFill style={{clipPath,opacity:kind==="crossfade"?p:1}}>{children}</AbsoluteFill>;
};

export const DreamFullMv = () => <AbsoluteFill style={{backgroundColor:"#fff1dc"}}>
  <TransitionSeries>
    {timeline.flatMap((shot,index)=>{
      const Scene=remakeScenes[shot.sceneId];
      if(!Scene) throw new Error(`Unregistered MV scene: ${shot.sceneId}`);
      const length=shot.endFrame-shot.startFrame;
      const last=index===timeline.length-1;
      return [
        <TransitionSeries.Sequence key={shot.sceneId} name={shot.name} durationInFrames={length+(last?0:shot.transitionFrames)}>
          <Scene durationInFrames={length}/>
        </TransitionSeries.Sequence>,
        ...last?[]:[<TransitionSeries.Transition key={`${shot.sceneId}-reveal`} presentation={{component:Reveal,props:{kind:shot.transition}}} timing={linearTiming({durationInFrames:shot.transitionFrames})}/>],
      ];
    })}
  </TransitionSeries>
  <WarmAtmosphere/>
  <WarmCaptions/>
  <Audio src={staticFile("audio/song.mp3")} durationInFrames={5508}/>
</AbsoluteFill>;
