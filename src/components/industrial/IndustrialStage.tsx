"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CYLINDER_PARTS, type SceneId, type PartId } from "@/lib/industrial-scenes";
type Props = { presentation?: boolean; scene?: SceneId; narrative?: boolean; image?: string; imageAlt?: string };
type Tier = import("./scene-engine").StageTier | "pending";

/** WebGL disponible (sin descargar three). Libera el contexto de prueba de inmediato. */
function hasWebGL() {
 try {
  const canvas = document.createElement("canvas");
  const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
  if (!gl) return false;
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return true;
 } catch { return false; }
}
/** Espera a un momento ocioso del hilo principal (con tope para no esperar indefinidamente). */
function idle(timeout = 1500) {
 return new Promise<void>((resolve) => {
  if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout });
  else setTimeout(resolve, 200);
 });
}
export function IndustrialStage({scene="ecosistema",narrative=false,presentation=false,image="/industrial-editorial.webp",imageAlt="Imagen editorial industrial"}:Props) {
 const root=useRef<HTMLDivElement>(null),host=useRef<HTMLDivElement>(null);
 const engine=useRef<import("./scene-engine").StageEngine|null>(null);
 const [active,setActive]=useState(scene),[ready,setReady]=useState(false),[disabled,setDisabled]=useState(false);
 const [exploded,setExploded]=useState(false),[rotation,setRotation]=useState(25),[zoom,setZoom]=useState(1),[part,setPart]=useState<PartId>("camisa"),[detection,setDetection]=useState(0),[interactive,setInteractive]=useState(false);
 const [cylinderSelected,setCylinderSelected]=useState<PartId|null>(null);
 const [tier,setTier]=useState<Tier>("pending");
 const [manualOpening,setManualOpening]=useState(false),[scrollOpening,setScrollOpening]=useState(false);
 const effectiveExploded=presentation&&!manualOpening?scrollOpening:exploded;
 useEffect(()=>{
  let disposed=false,loading=false,visible=false;
  const motion=matchMedia("(prefers-reduced-motion: reduce)");
  const nav=navigator as Navigator & {connection?:{saveData?:boolean};deviceMemory?:number};
  // Filtro previo barato (ahorro de datos, equipos muy limitados). La calidad real se decide por FPS medidos.
  const constrained=nav.connection?.saveData || navigator.hardwareConcurrency<=2 || (nav.deviceMemory??8)<=1;
  const off=()=>{if(!disposed){setDisabled(true);setReady(false);setTier("static");}};
  const init=async()=>{if(!visible||loading||engine.current||motion.matches||constrained||!host.current)return;loading=true;try{
   // 1) Sin WebGL no se descarga three (≈162 KB gz).
   if(!hasWebGL()){off();return;}
   await idle();await document.fonts.ready;if(disposed||!host.current)return;
   const {createStage}=await import("./scene-engine");if(disposed||!host.current)return;
   const instance=await createStage(host.current,scene,(id)=>{setPart(id);setCylinderSelected(current=>current===id?null:id);},off,{quality:innerWidth>=1024&&navigator.hardwareConcurrency>4?"high":"medium"});
   if(disposed){instance.dispose();return;}
   // 2) Compilar shaders en un momento ocioso y medir FPS: alto, medio o imagen fija.
   await idle();if(disposed){instance.dispose();return;}
   const measured=await instance.warmup();
   if(disposed){instance.dispose();return;}
   if(measured==="static"){instance.dispose();off();return;}
   // 3) El canvas se muestra solo con el primer frame listo.
   engine.current=instance;setTier(measured);setReady(true);
  }catch{off();}};
  const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;engine.current?.setVisible(visible);void init();},{rootMargin:"150px"});if(root.current)observer.observe(root.current);
  const change=()=>{engine.current?.setMotion(!motion.matches);setReady(!motion.matches&&!!engine.current);if(!motion.matches)void init();};motion.addEventListener("change",change);
  return()=>{disposed=true;observer.disconnect();motion.removeEventListener("change",change);engine.current?.dispose();engine.current=null;};
 },[scene]);
 useEffect(()=>{
  if(presentation){
    const experience=root.current?.closest<HTMLElement>(".cylinder-experience");let frame=0;
    // Los capítulos están en el flujo normal (siempre visibles y legibles). La fase y el
    // progreso se calculan con la posición de cada capítulo respecto a una línea de lectura.
    const update=()=>{frame=0;if(!experience)return;if(!ready||disabled){experience.dataset.phase="0";experience.style.setProperty("--story-progress","0");return;}
      const stories=Array.from(experience.querySelectorAll<HTMLElement>("[data-story]")),sticky=experience.querySelector<HTMLElement>(".cylinder-sticky");if(!stories.length||!sticky)return;
      const stuck=sticky.getBoundingClientRect(),desktop=innerWidth>=1024;
      const anchor=desktop?innerHeight*.55:Math.min(innerHeight-40,stuck.bottom+Math.max(60,(innerHeight-stuck.bottom)*.45));
      let phase=0;stories.forEach((story,i)=>{if(story.getBoundingClientRect().top<anchor)phase=i;});
      const r=stories[phase].getBoundingClientRect(),t=Math.max(0,Math.min(1,(anchor-r.top)/Math.max(1,r.height)));
      const p=phase===0?.22*t:phase===1?.3+.48*t:.78+.22*t;
      experience.dataset.phase=String(phase);
      experience.style.setProperty("--story-progress",String(p));
      setScrollOpening(p>.33&&p<.85);engine.current?.setChapter("cilindros",p);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);update();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
  }
  if(!narrative){
    if(scene!=="cilindros")return;
    const update=()=>{const r=root.current?.getBoundingClientRect();if(r)engine.current?.setChapter("cilindros",Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height))));};
    window.addEventListener("scroll",update,{passive:true});update();return()=>window.removeEventListener("scroll",update);
  }const chapters=Array.from(root.current?.closest(".industrial-journey")?.querySelectorAll<HTMLElement>("[data-industrial-scene]")??[]);let frame=0;
  const update=()=>{frame=0;const anchor=innerHeight*.5;const current=chapters.find(c=>{const r=c.getBoundingClientRect();return r.top<=anchor&&r.bottom>anchor;})??chapters[0];if(!current)return;const r=current.getBoundingClientRect(),id=current.dataset.industrialScene as SceneId;setActive(id);engine.current?.setChapter(id,Math.max(0,Math.min(1,(anchor-r.top)/r.height)));};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);update();return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
 },[narrative,ready,disabled,scene,presentation]);
 useEffect(()=>{engine.current?.setControls({exploded:effectiveExploded,manual:manualOpening,rotation,zoom,part:active==="cilindros"?cylinderSelected:part,detection,interactive});},[effectiveExploded,manualOpening,rotation,zoom,part,cylinderSelected,detection,interactive,ready,active]);
 const cylinder=active==="cilindros"||active==="servicios"||active==="hidraulica";
 return <div ref={root} className={`industrial-stage ${ready&&!disabled?"is-ready":""}`} data-tier={tier} data-active-scene={active} data-presentation={presentation?"cinematic":undefined} data-exploded={effectiveExploded}>
 <div className="stage-fallback"><Image src={image} alt={imageAlt} fill priority={presentation} sizes={presentation?"100vw":"(max-width: 900px) 100vw, 55vw"} className="object-cover"/><div/></div>
 <div ref={host} data-presentation={presentation?"cinematic":undefined} className={`stage-canvas ${interactive||active==="cilindros"?"interactive":""}`} aria-hidden="true"/>
 <div className="stage-topline"><span>Dynatech / Ingeniería</span><span>RD</span></div><div className="stage-cross" aria-hidden="true">+</div>
 <div className="stage-caption">{ready&&!disabled?(presentation?<>Modelo ilustrativo<span className="caption-extra"> · Configuración bajo cotización</span></>:"Representación 3D conceptual · No es un producto específico"):"Imagen de referencia"}</div>
 {presentation&&!(ready&&!disabled)&&<div className="cylinder-legend"><p>Piezas de un cilindro neumático</p><ol>{CYLINDER_PARTS.map((item,i)=><li key={item.id}><span>0{i+1}</span>{item.name}</li>)}</ol></div>}
 {ready&&!disabled&&(active==="cilindros"?<div className="cylinder-controls">
 <div className="cylinder-toolbar"><span>Arrastra para girar · 360°</span><button type="button" onClick={()=>setZoom(Math.max(.85,zoom-.1))} aria-label="Alejar cilindro">−</button><button type="button" onClick={()=>setZoom(Math.min(presentation?1.12:1.25,zoom+.1))} aria-label="Acercar cilindro">+</button><button type="button" aria-pressed={effectiveExploded} onClick={()=>{setExploded(!effectiveExploded);setManualOpening(true);}}>{effectiveExploded?"Ensamblar":"Explorar el interior"}</button></div>
 <div className="cylinder-parts" aria-label="Componentes del cilindro">{CYLINDER_PARTS.map((item,i)=><button type="button" key={item.id} aria-pressed={cylinderSelected===item.id} onClick={()=>setCylinderSelected(current=>current===item.id?null:item.id)}><span>0{i+1}</span>{item.name}</button>)}</div>
 <p role="status" className={cylinderSelected?"has-selection":""}><strong>{cylinderSelected?CYLINDER_PARTS.find(i=>i.id===cylinderSelected)?.name:"Cada pieza, una función"}</strong><span>{cylinderSelected?CYLINDER_PARTS.find(i=>i.id===cylinderSelected)?.description:"Selecciona un componente para conocerlo."}</span></p>
 </div>:<div className="stage-controls"><button type="button" aria-pressed={interactive} onClick={()=>setInteractive(!interactive)}>{interactive?"Terminar interacción":"Explorar en 3D"}</button>{interactive&&<>
 <label>Rotación 360°<input type="range" min="0" max="360" value={rotation} onChange={e=>setRotation(Number(e.target.value))}/></label><label>Acercamiento<input type="range" min="0.85" max="1.25" step="0.01" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></label>
 {cylinder&&<><button type="button" aria-pressed={exploded} onClick={()=>setExploded(!exploded)}>{exploded?"Volver a montar":"Desmontar cilindro"}</button><div className="part-selector" aria-label="Componentes del cilindro">{CYLINDER_PARTS.map(item=><button type="button" key={item.id} aria-pressed={part===item.id} onClick={()=>setPart(item.id)}>{item.name}</button>)}</div><p role="status"><strong>{CYLINDER_PARTS.find(i=>i.id===part)?.name}</strong> · {CYLINDER_PARTS.find(i=>i.id===part)?.description}</p></>}
 {active==="sensores"&&<label>Acerca la pieza al sensor<input type="range" min="0" max="1" step="0.01" value={detection} onChange={e=>setDetection(Number(e.target.value))}/><span role="status">{detection>.65?"Presencia detectada · Demostración":"Fuera del campo de detección · Demostración"}</span></label>}
 <button type="button" onClick={()=>{setRotation(25);setZoom(1);setExploded(false);setDetection(0);setPart("camisa");}}>Restablecer vista</button></>}</div>)}
 </div>;
}
