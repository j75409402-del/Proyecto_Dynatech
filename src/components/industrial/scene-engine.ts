import * as T from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { premiumCylinder } from "./premium-cylinder";
import { APPROVED_MODELS, type SceneId, type PartId } from "@/lib/industrial-scenes";

type Controls = { manual?: boolean; exploded: boolean; rotation: number; zoom: number; part: PartId | null; detection: number; interactive: boolean };
/** Calidad 3D: "high" (sombras, DPR ≤1.75), "medium" (sin sombras dinámicas, DPR ≤1.25) o "static" (imagen fija). */
export type StageTier = "high" | "medium" | "static";
export type StageEngine = { warmup(): Promise<StageTier>; setVisible(value: boolean): void; setMotion(value: boolean): void; setChapter(scene: SceneId, progress: number): void; setControls(value: Controls): void; dispose(): void };

const PART_LABELS: Record<PartId, string> = { camisa: "Camisa", tapas: "Tapas", piston: "Pistón", vastago: "Vástago", sellos: "Sellos" };

/** One canvas, shared geometries/materials, demand rendering; no permanent animation loop. */
export async function createStage(host: HTMLElement, initial: SceneId, select: (id: PartId) => void, failure: () => void, options: { quality?: "high" | "medium" } = {}): Promise<StageEngine> {
  const presentation = host.dataset.presentation === "cinematic";
  let tier: StageTier = options.quality ?? (innerWidth < 900 || navigator.hardwareConcurrency <= 4 ? "medium" : "high");
  const low = tier !== "high";
  const segments = low ? 12 : 28;
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: !low, powerPreference: low ? "low-power" : "default" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1.25 : 1.75));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  host.appendChild(renderer.domElement);
  const world = new T.Scene();
  const camera = new T.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(0, 1, 11);
  camera.lookAt(0, 0, 0);
  const hemisphere = new T.HemisphereLight(0xf1f6ff, 0x32363b, 3); world.add(hemisphere);
  const cylinderRim = new T.DirectionalLight(0xc7dbef, 2.6); cylinderRim.position.set(-3, 3, -4); cylinderRim.visible = false; world.add(cylinderRim);
  const key = new T.DirectionalLight(0xffffff, 5); key.position.set(4, 6, 5); world.add(key);
  const rim = new T.DirectionalLight(0xe4002b, 2); rim.position.set(-4, -1, 3); world.add(rim);
  const steel = new T.MeshStandardMaterial({ color: 0xa8b4c1, metalness: 0.72, roughness: 0.32 });
  const aluminum = new T.MeshStandardMaterial({ color: 0xd3dce5, metalness: 0.55, roughness: 0.27 });
  const graphite = new T.MeshStandardMaterial({ color: 0x242a33, metalness: 0.4, roughness: 0.4 });
  const signal = new T.MeshStandardMaterial({ color: 0xe4002b, metalness: 0.3, roughness: 0.3 });
  const light = new T.MeshStandardMaterial({ color: 0xf2f0e9, metalness: 0.1, roughness: 0.45 });
  const heat = new T.MeshStandardMaterial({ color: 0xaaa099, metalness: 0.55, roughness: 0.35, emissive: 0x6c170c, emissiveIntensity: 0.1 });
  const geometries: T.BufferGeometry[] = [];
  const materials = [steel, aluminum, graphite, signal, light, heat];
  const box = new T.BoxGeometry(1, 1, 1); geometries.push(box);
  const cylinder = new T.CylinderGeometry(1, 1, 1, segments); cylinder.rotateZ(Math.PI / 2); geometries.push(cylinder);
  const ring = new T.TorusGeometry(1, 0.11, 6, segments); ring.rotateY(Math.PI / 2); geometries.push(ring);
  const assembly = new T.Group(); world.add(assembly);
  let premium: ReturnType<typeof premiumCylinder> | null = null;
  let environment: T.WebGLRenderTarget | null = null;
  // Etiquetas de la vista explotada: HTML sobre el canvas (el host es aria-hidden; la lista
  // accesible de piezas vive en los controles). Se posicionan proyectando cada pieza.
  const labelLayer = document.createElement("div"); labelLayer.className = "cylinder-labels";
  const labels = new Map<PartId, HTMLSpanElement>();
  for (const id of Object.keys(PART_LABELS) as PartId[]) { const el = document.createElement("span"); el.textContent = PART_LABELS[id]; el.dataset.part = id; labelLayer.appendChild(el); labels.set(id, el); }
  const projected = new T.Vector3();
  function prepareCylinder() {
    if(premium)return;
    premium=premiumCylinder(low);assembly.add(premium.root);
    // Luz de estudio procedural (RoomEnvironment + PMREM): sin archivos HDR externos.
    const pmrem=new T.PMREMGenerator(renderer),studio=new RoomEnvironment();
    environment=pmrem.fromScene(studio,.035);studio.dispose();pmrem.dispose();
    if (presentation) host.appendChild(labelLayer);
  }
  renderer.shadowMap.enabled = tier === "high"; renderer.shadowMap.type = T.VSMShadowMap;
  key.castShadow = true; key.shadow.mapSize.set(low ? 512 : 1024, low ? 512 : 1024);
  key.shadow.camera.left=-8; key.shadow.camera.right=8; key.shadow.camera.top=8; key.shadow.camera.bottom=-8;
  key.shadow.normalBias=.035; key.shadow.radius=4; key.shadow.blurSamples=8;
  const floorGeo = new T.PlaneGeometry(30,30), floorMat = new T.ShadowMaterial({opacity: presentation ? .14 : .2});
  const floor = new T.Mesh(floorGeo,floorMat); floor.rotation.x=-Math.PI/2; floor.position.y=-1.3; floor.receiveShadow=true; world.add(floor);
  function mesh(parent: T.Group, geo: T.BufferGeometry, material: T.Material, position: number[], scale: number[], part?: PartId) {
    const object = new T.Mesh(geo, material); object.position.set(...position as [number, number, number]); object.scale.set(...scale as [number, number, number]);
    if (part) object.userData.part = part;
    parent.add(object); return object;
  }
  const objects: Record<string, T.Group> = {};
  const ram = new T.Group(); objects.cylinder = ram; assembly.add(ram);
  const parts = new Map<PartId, T.Mesh[]>();
  function addPart(id: PartId, geo: T.BufferGeometry, mat: T.Material, position: number[], scale: number[]) {
    const object = mesh(ram, geo, mat, position, scale, id); object.userData.base = object.position.clone(); object.userData.material = mat;
    parts.set(id, [...(parts.get(id) ?? []), object]); return object;
  }
  addPart("camisa", cylinder, steel, [-0.5, 0, 0], [2.6, 0.52, 0.52]);
  addPart("tapas", box, graphite, [-1.94, 0, 0], [0.28, 1.25, 1.25]);
  addPart("tapas", box, aluminum, [0.94, 0, 0], [0.28, 1.25, 1.25]);
  addPart("piston", cylinder, aluminum, [0.25, 0, 0], [0.24, 0.49, 0.49]);
  addPart("vastago", cylinder, aluminum, [1.95, 0, 0], [2.7, 0.16, 0.16]);
  addPart("sellos", ring, signal, [0.43, 0, 0], [0.6, 0.49, 0.49]);
  addPart("sellos", ring, graphite, [1.13, 0, 0], [0.6, 0.25, 0.25]);
  for (const y of [-0.49, 0.49]) for (const z of [-0.49, 0.49]) mesh(ram, cylinder, aluminum, [-0.5, y, z], [3, 0.035, 0.035]);
  const valve = new T.Group(); objects.valve = valve; assembly.add(valve);
  mesh(valve, box, aluminum, [0, 0, 0], [1.9, 0.8, 0.85]); mesh(valve, box, graphite, [1.15, 0, 0], [0.65, 0.95, 1]); mesh(valve, box, signal, [1.5, 0.12, 0], [0.1, 0.4, 0.55]);
  for (const x of [-0.65, 0, 0.65]) { const port = mesh(valve, cylinder, graphite, [x, 0.5, 0], [0.22, 0.18, 0.18]); port.rotation.z = Math.PI / 2; }
  const sensor = new T.Group(); objects.sensor = sensor; assembly.add(sensor);
  mesh(sensor, cylinder, aluminum, [0, 0, 0], [1.7, 0.25, 0.25]); mesh(sensor, cylinder, graphite, [0.93, 0, 0], [0.16, 0.26, 0.26]); mesh(sensor, ring, steel, [-0.4, 0, 0], [1, 0.3, 0.3]);
  const sensorLight = mesh(sensor, box, signal, [0.5, 0.22, 0], [0.14, 0.06, 0.1]);
  const target = mesh(sensor, box, steel, [2.5, 0, 0], [0.45, 0.7, 0.7]);
  const gauge = new T.Group(); objects.gauge = gauge; assembly.add(gauge);
  const face = mesh(gauge, cylinder, aluminum, [0, 0, 0], [0.4, 0.85, 0.85]); face.rotation.y = Math.PI / 2;
  const dial = mesh(gauge, cylinder, light, [0, 0, 0.24], [0.04, 0.73, 0.73]); dial.rotation.y = Math.PI / 2;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; const tick = mesh(gauge, box, graphite, [Math.sin(a) * 0.59, Math.cos(a) * 0.59, 0.28], [0.025, 0.12, 0.02]); tick.rotation.z = -a; }
  const needlePivot = new T.Group(); needlePivot.position.z = 0.31; gauge.add(needlePivot); mesh(needlePivot, box, signal, [0, 0.24, 0], [0.045, 0.53, 0.03]); mesh(gauge, box, steel, [0, -1, 0], [0.3, 0.55, 0.3]);
  const control = new T.Group(); objects.control = control; assembly.add(control);
  mesh(control, box, graphite, [0, 0, 0], [1.5, 1.85, 0.9]); mesh(control, box, aluminum, [0, 0.25, 0.49], [1.2, 0.9, 0.12]); mesh(control, box, signal, [0, 0.25, 0.6], [0.42, 0.5, 0.1]);
  for (const y of [-0.72, 0.73]) for (const x of [-0.48, 0, 0.48]) mesh(control, box, steel, [x, y, 0.4], [0.18, 0.2, 0.22]);
  const heater = new T.Group(); objects.heater = heater; assembly.add(heater);
  for (const y of [-0.45, 0, 0.45]) { mesh(heater, cylinder, heat, [0, y, 0], [2.7, 0.12, 0.12]); mesh(heater, cylinder, graphite, [1.65, y, 0], [0.6, 0.04, 0.04]); }
  const flowCurve = new T.CatmullRomCurve3([new T.Vector3(-3, -2, 0), new T.Vector3(-2, -1.6, -0.5), new T.Vector3(0, -1.8, 0), new T.Vector3(2, -1.4, -0.5), new T.Vector3(3, -2, 0)]);
  const flowGeo = new T.TubeGeometry(flowCurve, low ? 24 : 48, 0.015, 4, false); geometries.push(flowGeo);
  const flow = new T.Mesh(flowGeo, signal); world.add(flow);
  const dot = new T.Mesh(new T.SphereGeometry(0.065, 8, 6), light); geometries.push(dot.geometry); world.add(dot);
  const raycaster = new T.Raycaster();
  let scene = initial, progress = 0.3, visible = true, motion = true, disposed = false, frame = 0;
  let transitionFrames = 0, renderedFrames = 0, lastFrame = 0, warmed = false;
  const lookTarget = new T.Vector3(0, .03, 0), lookGoal = new T.Vector3();
  const positionTarget = new T.Vector3();
  const scaleTarget = new T.Vector3();
  let controls: Controls = { exploded: false, rotation: 25, zoom: 1, part: "camisa", detection: 0, interactive: false };
  let drag: { x: number; y: number; moved: boolean } | null = null;
  let yaw = 0, pitch = 0;
  const focusMap: Partial<Record<SceneId, string>> = { neumatica: "valve", hidraulica: "cylinder", cilindros: "cylinder", servicios: "cylinder", "control-electrico": "control", sensores: "sensor", instrumentacion: "gauge", "resistencias-electricas": "heater" };
  const rest: Record<string, [number, number, number]> = { cylinder: [-0.6, 0.4, 0], valve: [1.9, -1, 0.4], sensor: [-1.6, -1.25, 0.8], gauge: [1.9, 1.5, -0.3], control: [-2.2, 1.8, -0.6], heater: [0, -2.05, -0.5] };
  function draw(now: number, force = false) {
    frame = 0;
    if (disposed || (!force && (!warmed || !visible || document.hidden || !motion))) return;
    const delta = Math.min(.05, lastFrame ? (now - lastFrame) / 1000 : 1 / 60); lastFrame = now;
    const premiumActive = scene === "cilindros";
    if(premiumActive)prepareCylinder();
    renderer.shadowMap.enabled=premiumActive && tier === "high";
    if(premium)premium.root.visible = premiumActive; floor.visible = premiumActive && tier === "high";
    world.environment = premiumActive ? environment?.texture ?? null : null;
    key.intensity = premiumActive ? 3.7 : 5; rim.intensity = premiumActive ? 0 : 2;
    hemisphere.intensity = premiumActive ? 1.2 : 3; cylinderRim.visible = premiumActive;
    renderer.toneMappingExposure = premiumActive ? 1.02 : 1.45;
    const scrollOpen = T.MathUtils.smoothstep(progress, .22, .48) * (1 - T.MathUtils.smoothstep(progress, .78, .96));
    const cylinderState = premiumActive ? premium?.update(presentation && !controls.manual ? scrollOpen : controls.exploded ? 1 : 0, controls.part, delta, presentation && !controls.manual) : undefined;
    const opening = cylinderState?.amount ?? 0;
    premium?.root.scale.setScalar(1.18);
    const immersiveDesktop = presentation && innerWidth >= 1024;
    // Keep the editorial offset outside the rotating group so a full turn stays in its column.
    premium?.root.position.set(presentation ? -.55 - opening * .03 : -.25 - opening * .14, presentation ? -.13 : .12, 0);
    assembly.position.x = premiumActive && immersiveDesktop ? 1.6 + opening * .25 : 0;
    const focus = focusMap[scene];
    for (const [name, object] of Object.entries(objects)) {
      const shown = !focus || name === focus || (scene === "neumatica" && name === "cylinder");
      if (!focus) { positionTarget.set(...rest[name]); scaleTarget.setScalar(name === "cylinder" ? 0.62 : 0.72); }
      else { positionTarget.set(0, 0.15, 0); scaleTarget.setScalar(name === "cylinder" ? 0.87 : 1.6); if (scene === "neumatica" && name === "cylinder") { positionTarget.set(-0.5, 1.5, -1); scaleTarget.setScalar(0.5); } }
      if (!shown) { positionTarget.set(rest[name][0] * 3, rest[name][1] * 3, -6); scaleTarget.setScalar(0.001); }
      object.visible = !premiumActive && (shown || (transitionFrames > 0 && object.scale.x > 0.02));
      object.position.lerp(positionTarget, transitionFrames ? 0.16 : 1);
      object.scale.lerp(scaleTarget, transitionFrames ? 0.16 : 1);
      object.rotation.set(focus ? 0 : 0.2, focus ? 0 : -0.25, focus ? 0 : name === "sensor" ? -0.35 : 0.15);
    }
    assembly.rotation.set(0.12 + pitch, (controls.interactive ? controls.rotation * Math.PI / 180 : 0.25 + (progress - 0.5) * 0.65) + yaw, 0.05);
    if (premiumActive) assembly.rotation.set(.12 + pitch + opening * .018, -.32 + (progress-.5)*.35 + yaw + opening * .045, presentation ? .25 - opening * .12 : -.17 + opening * .035);
    const desktop = innerWidth >= 1024;
    const baseDistance = desktop
      ? presentation ? Math.max(7.8, 23.5 / camera.aspect) : Math.max(8.6, 11.2 / camera.aspect)
      : Math.max(presentation ? 6.2 : 9.2, (presentation ? 13.6 : 12.7) / camera.aspect);
    const targetDistance = premiumActive ? baseDistance * (1 + opening * (desktop ? (presentation ? .4 : .25) : .45)) / controls.zoom : 11 / controls.zoom;
    // Cámara con amortiguación (easing exponencial): distancia, altura, foco y FOV convergen suave.
    const focusPart = premiumActive && controls.part && opening > .5 ? premium?.anchor(controls.part) : null;
    const focusX = focusPart ? T.MathUtils.clamp(focusPart.getWorldPosition(projected).x * .35, -1.2, 1.2) : 0;
    const goalZ = targetDistance * (focusPart ? .92 : 1);
    const goalY = premiumActive ? (presentation ? .68 : .85) + opening * .14 : 1;
    lookGoal.set(focusX, premiumActive ? .03 : 0, 0);
    if (premiumActive && warmed) {
      camera.position.z = T.MathUtils.damp(camera.position.z, goalZ, 5.5, delta);
      camera.position.y = T.MathUtils.damp(camera.position.y, goalY, 5.5, delta);
      lookTarget.x = T.MathUtils.damp(lookTarget.x, lookGoal.x, 4.5, delta); lookTarget.y = lookGoal.y;
    } else { camera.position.z = goalZ; camera.position.y = goalY; lookTarget.copy(lookGoal); }
    camera.position.x = lookTarget.x;
    camera.lookAt(lookTarget);
    const fovGoal = premiumActive && (desktop || presentation) ? 30 + opening * 2 : 36;
    const fov = warmed ? T.MathUtils.damp(camera.fov, fovGoal, 6, delta) : fovGoal;
    if (Math.abs(camera.fov - fov) > .0005) { camera.fov = fov; camera.updateProjectionMatrix(); }
    const cameraSettling = premiumActive && (Math.abs(camera.position.z - goalZ) > .003 || Math.abs(camera.position.y - goalY) > .002 || Math.abs(lookTarget.x - lookGoal.x) > .002 || Math.abs(camera.fov - fovGoal) > .01);
    flow.visible = dot.visible = !premiumActive;
    const explode = controls.exploded || (scene === "servicios" && progress > 0.35);
    for (const [id, group] of parts) for (const object of group) {
      object.position.copy(object.userData.base);
      if (explode) { if (id === "tapas") object.position.x *= 1.7; if (id === "piston") object.position.set(1.1, 1, 0); if (id === "vastago") object.position.set(2.4, 1, 0); if (id === "sellos") object.position.set(object.userData.base.x + 0.5, -1.15, 0); }
      object.material = controls.interactive && id === controls.part ? signal : object.userData.material;
    }
    target.position.x = 2.5 - controls.detection * 1.25;
    sensorLight.material = controls.detection > 0.65 ? light : signal;
    needlePivot.rotation.z = (progress - 0.5) * -3;
    heat.emissiveIntensity = 0.1 + progress * 0.6;
    dot.position.copy(flowCurve.getPointAt(progress));
    renderer.render(world, camera);
    if (premium && presentation) placeLabels(premiumActive ? opening : 0);
    if(premiumActive)host.dataset.renderedFrames=String(++renderedFrames);
    if (transitionFrames > 0) { transitionFrames--; invalidate(); }
    if (premiumActive && (cylinderState?.settling || cameraSettling)) invalidate();
  }
  function placeLabels(opening: number) {
    const show = T.MathUtils.smoothstep(opening, .45, .85);
    labelLayer.style.opacity = String(show);
    if (show <= 0 || !premium) return;
    const width = host.clientWidth, height = host.clientHeight;
    for (const [id, el] of labels) {
      const anchor = premium.anchor(id); if (!anchor) continue;
      anchor.getWorldPosition(projected); projected.y += id === "piston" || id === "vastago" ? -.62 : .78; projected.project(camera);
      const x = (projected.x + 1) / 2 * width, y = (1 - projected.y) / 2 * height;
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%)`;
      el.dataset.below = id === "piston" || id === "vastago" ? "true" : "false";
      el.dataset.active = String(controls.part === id);
      // En pantallas estrechas solo se rotulan piezas alternas (o la seleccionada) para no encimarlas.
      el.style.visibility = width >= 600 || controls.part === id || (!controls.part && (id === "camisa" || id === "piston" || id === "tapas")) ? "visible" : "hidden";
    }
  }
  function invalidate() { if (!frame && !disposed && warmed) frame = requestAnimationFrame(draw); }
  const nextFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));
  function setTier(next: StageTier) {
    tier = next;
    if (tier === "medium") { renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25)); renderer.setSize(host.clientWidth, host.clientHeight, false); }
  }
  /** Compila shaders (asíncrono si el driver lo permite) y mide FPS reales en los primeros frames. */
  async function warmup(): Promise<StageTier> {
    // Tamaño real antes de medir (el ResizeObserver es asíncrono): FPS representativos.
    if (host.clientWidth && host.clientHeight) { renderer.setSize(host.clientWidth, host.clientHeight); camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); }
    if (initial === "cilindros") prepareCylinder();
    draw(performance.now(), true); // aplica estado de escena (materiales, entorno, sombras)
    try { await renderer.compileAsync(world, camera); } catch { /* compileAsync no disponible: compila en el primer render */ }
    if (disposed) return "static";
    // Tiempo real por frame (CPU + GPU): readPixels de 1 px obliga a terminar el frame, así el
    // trabajo de la GPU no queda oculto en la cola. Solo durante la prueba (≈10 frames).
    const gl = renderer.getContext(), pixel = new Uint8Array(4);
    const measure = async (frames: number) => {
      const costs: number[] = [];
      for (let i = 0; i < frames && !disposed; i++) {
        const start = await nextFrame();
        draw(start, true); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        const cost = performance.now() - start; costs.push(cost);
        if (cost > 250) return cost; // equipo claramente lento: no seguir bloqueando el hilo principal
      }
      costs.sort((a, b) => a - b); return costs[Math.floor(costs.length / 2)] ?? 1000;
    };
    if (await measure(2) > 1000) { tier = "static"; host.dataset.tier = tier; return tier; } // primeros frames: subida de texturas y sombras
    let median = await measure(8);
    if (tier === "high" && median > 1000 / 40) { setTier("medium"); try { await renderer.compileAsync(world, camera); } catch {} median = await measure(8); }
    if (median > 1000 / 24) tier = "static";
    host.dataset.tier = tier;
    host.dataset.fps = String(Math.round(1000 / Math.max(1, median)));
    if (tier !== "static") { warmed = true; invalidate(); }
    return tier;
  }
  const resize = new ResizeObserver(() => { const width = host.clientWidth, height = host.clientHeight; if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); invalidate(); }); resize.observe(host);
  const visibility = () => invalidate(); document.addEventListener("visibilitychange", visibility);
  const down = (event: PointerEvent) => { if (!controls.interactive && scene !== "cilindros") return; drag = { x: event.clientX, y: event.clientY, moved: false }; renderer.domElement.setPointerCapture(event.pointerId); };
  const move = (event: PointerEvent) => {
    if (drag) { const dx = event.clientX - drag.x; if (Math.abs(dx) > 3) drag.moved = true; yaw += dx * 0.008; drag.x = event.clientX; invalidate(); }
    else if (event.pointerType === "mouse" && !controls.interactive && scene !== "cilindros") { const rect = host.getBoundingClientRect(); yaw = ((event.clientX - rect.left) / rect.width - 0.5) * 0.09; pitch = ((event.clientY - rect.top) / rect.height - 0.5) * 0.05; invalidate(); }
  };
  const up = (event: PointerEvent) => { if (drag && !drag.moved) { const rect = host.getBoundingClientRect(); raycaster.setFromCamera(new T.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera); const hit = raycaster.intersectObjects(scene === "cilindros" ? premium?.root.children ?? [] : ram.children, true).find((item) => item.object.userData.part); if (hit) select(hit.object.userData.part); } drag = null; };
  const leave = () => { if (!drag && scene !== "cilindros") { yaw = 0; pitch = 0; invalidate(); } };
  const lost = (event: Event) => { event.preventDefault(); failure(); };
  const restored = () => failure();
  renderer.domElement.addEventListener("pointerdown", down); renderer.domElement.addEventListener("pointermove", move); renderer.domElement.addEventListener("pointerup", up); renderer.domElement.addEventListener("pointercancel", up); renderer.domElement.addEventListener("pointerleave", leave);
  renderer.domElement.addEventListener("webglcontextlost", lost); renderer.domElement.addEventListener("webglcontextrestored", restored);
  const approved = APPROVED_MODELS[initial];
  if (approved) {
    const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
    const model = await new GLTFLoader().loadAsync(approved.url);
    const bounds = new T.Box3().setFromObject(model.scene); const center = bounds.getCenter(new T.Vector3()); const size = bounds.getSize(new T.Vector3());
    model.scene.position.sub(center); model.scene.scale.setScalar(4 / Math.max(size.x, size.y, size.z)); assembly.clear(); assembly.add(model.scene);
  }
  return {
    warmup,
    setVisible(value) { visible = value; if (value) invalidate(); },
    setMotion(value) { motion = value; if (value) invalidate(); },
    setChapter(id, value) { if (scene !== id) transitionFrames = low ? 14 : 24; scene = id; progress = value; invalidate(); },
    setControls(value) { if (!value.interactive && scene !== "cilindros") { yaw = 0; pitch = 0; } controls = value; invalidate(); },
    dispose() { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); document.removeEventListener("visibilitychange", visibility); renderer.domElement.removeEventListener("pointerdown", down); renderer.domElement.removeEventListener("pointermove", move); renderer.domElement.removeEventListener("pointerup", up); renderer.domElement.removeEventListener("pointercancel", up); renderer.domElement.removeEventListener("pointerleave", leave); renderer.domElement.removeEventListener("webglcontextlost", lost); renderer.domElement.removeEventListener("webglcontextrestored", restored); premium?.dispose(); environment?.dispose(); labelLayer.remove(); floorGeo.dispose(); floorMat.dispose(); geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); renderer.dispose(); renderer.domElement.remove(); },
  };
}
