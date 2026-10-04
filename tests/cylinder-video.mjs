import {mkdir,writeFile} from "node:fs/promises";
const {chromium}=await import("file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs");
const out=process.env.TEST_ARTIFACT_DIR||"docs/cilindros-premium/benchmark";
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:"msedge",headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:out+"/grabacion",size:{width:1440,height:900}}});
await context.route("https://cloud.umami.is/**",r=>r.abort());
const page=await context.newPage(),video=page.video();
const errors=[];page.on("pageerror",e=>errors.push(e.message));
async function scrollChapter(progress,duration=1700){
 await page.locator(".cylinder-experience").evaluate((el,{progress,duration})=>new Promise(resolve=>{
  const sticky=el.querySelector(".cylinder-sticky"),start=scrollY;
  const end=el.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(sticky).top)+(el.clientHeight-sticky.clientHeight)*progress;
  const began=performance.now();function tick(now){const t=Math.min(1,(now-began)/duration),ease=t*t*(3-2*t);window.scrollTo({top:start+(end-start)*ease,behavior:"instant"});if(t<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);
 }),{progress,duration});
}
try{
 await page.goto((process.env.TEST_BASE_URL||"http://localhost:3199")+"/cilindros-neumaticos");
 await page.locator(".industrial-stage.is-ready").waitFor();await page.waitForTimeout(1500);
 await page.screenshot({path:out+"/pagina-desktop.png"});
 await scrollChapter(.55);await page.waitForTimeout(900);
 await page.getByRole("button",{name:/Pist/}).click();await page.waitForTimeout(1000);
 const box=await page.locator(".stage-canvas").boundingBox();
 // Three continuous drags add up to one complete revolution without leaving the viewport.
 for(let turn=0;turn<3;turn++){
  await page.mouse.move(box.x+box.width*.6,box.y+box.height*.5);await page.mouse.down();
  for(let step=1;step<=30;step++){await page.mouse.move(box.x+box.width*.6+step*(Math.PI*2/.008/90),box.y+box.height*.5);await page.waitForTimeout(16);}
  await page.mouse.up();
 }
 await page.waitForTimeout(500);await page.getByRole("button",{name:/Pist/}).click();
 await page.getByRole("button",{name:"Ensamblar",exact:true}).click();await page.waitForTimeout(1600);
 await scrollChapter(0,1300);await page.waitForTimeout(1400);
 await page.locator(".cylinder-types").scrollIntoViewIfNeeded();await page.waitForTimeout(400);await page.locator(".cylinder-types").screenshot({path:out+"/continuidad-seccion.png"});
 await context.close();await video.saveAs(out+"/cilindros-interaccion.webm");await video.delete();
 await writeFile(out+"/video.json",JSON.stringify({file:"cilindros-interaccion.webm",viewport:"1440x900",scroll:true,selection:true,rotationDegrees:360,assembly:true,errors},null,2));
 console.log("Video y capturas guardados; errores: "+errors.length);
}finally{await browser.close();}
