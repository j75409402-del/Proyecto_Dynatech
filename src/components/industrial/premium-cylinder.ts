import * as T from "three";

/** Editorial geometry, deliberately independent of any catalogue dimensions. */
export function premiumCylinder(low: boolean) {
  const root = new T.Group();
  const groups: { object: T.Group; base: number; offset: T.Vector3; tilt: number; delay: number }[] = [];
  // PBR (metal/rugosidad) pensado para el entorno de estudio RoomEnvironment + PMREM:
  // camisa y tapas en aluminio anodizado, vástago en cromo duro, tirantes en acero
  // cepillado, juntas en caucho negro y tornillería pavonada.
  const steel = new T.MeshStandardMaterial({ color: 0xc4ccd4, metalness: .9, roughness: .36, envMapIntensity: 1.05 }); // camisa: aluminio anodizado natural
  const chrome = new T.MeshStandardMaterial({ color: 0xf1f4f7, metalness: 1, roughness: .07, envMapIntensity: 1.35 }); // vástago: cromo duro
  const alloy = new T.MeshStandardMaterial({ color: 0x8a96a3, metalness: .82, roughness: .42, envMapIntensity: .9 }); // tapas y pistón: anodizado satinado
  const rodSteel = new T.MeshStandardMaterial({ color: 0xd9dee4, metalness: 1, roughness: .24, envMapIntensity: 1.15 }); // tirantes: acero cepillado
  const seal = new T.MeshStandardMaterial({ color: 0x14171b, metalness: 0, roughness: .82, envMapIntensity: .3 }); // juntas: caucho negro
  const fastener = new T.MeshStandardMaterial({ color: 0x2c3138, metalness: .75, roughness: .36, envMapIntensity: .9 }); // tornillería pavonada
  // Textura de rugosidad "cepillada": rayas finas a lo largo del eje (UV u = perímetro).
  // Generada en código (128x4 px): sin descargas ni coste apreciable.
  const W = 128, H = 4, grainData = new Uint8Array(W * H * 4);
  let seed = 7; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const rows: number[] = []; for (let x = 0; x < W; x++) rows.push(205 + rand() * 50);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4; const v = Math.round(rows[x]);
    grainData[i] = grainData[i + 1] = grainData[i + 2] = v; grainData[i + 3] = 255;
  }
  const grain = new T.DataTexture(grainData, W, H);
  grain.wrapS = grain.wrapT = T.RepeatWrapping; grain.repeat.set(3, 1);
  grain.magFilter = T.LinearFilter; grain.minFilter = T.LinearMipmapLinearFilter;
  grain.generateMipmaps = true; grain.needsUpdate = true;
  steel.roughnessMap = grain; rodSteel.roughnessMap = grain; alloy.roughnessMap = grain;

  const n = low ? 32 : 64;
  function group(id: string, x: number, offset: number, y = 0, z = 0, tilt = 0, delay = 0) {
    const object = new T.Group(); object.position.x = x; object.userData.part = id;
    root.add(object); groups.push({ object, base: x, offset: new T.Vector3(offset, y, z), tilt, delay }); return object;
  }
  function lathe(parent: T.Group, points: number[][], material: T.Material, x = 0) {
    const geo = new T.LatheGeometry(points.map(([r, y]) => new T.Vector2(r, y)), n);
    geo.rotateZ(-Math.PI / 2);
    const mesh = new T.Mesh(geo, material); mesh.position.x = x;
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.part = parent.userData.part;
    parent.add(mesh); return mesh;
  }
  const barrel = group("camisa", -.65, -.5, .04, -.05, 0, .03);
  lathe(barrel, [[.49,-1.22],[.52,-1.22],[.55,-1.18],[.55,1.18],[.52,1.22],[.49,1.22],[.49,-1.22]], steel);
  const back = group("tapas", -2.05, -1.72, .13, -.28, -.09), front = group("tapas", .75, 3.2, -.07, .28, .10);
  for (const cap of [back, front]) {
    const shape = new T.Shape(); const h = .67, bevel = .12;
    shape.moveTo(-h+bevel,-h); shape.lineTo(h-bevel,-h); shape.lineTo(h,-h+bevel); shape.lineTo(h,h-bevel); shape.lineTo(h-bevel,h); shape.lineTo(-h+bevel,h); shape.lineTo(-h,h-bevel); shape.lineTo(-h,-h+bevel); shape.closePath();
    if(cap===front){const hole=new T.Path();hole.absarc(0,0,.19,0,Math.PI*2,true);shape.holes.push(hole);}
    const geo = new T.ExtrudeGeometry(shape,{depth:.28,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}); geo.rotateY(Math.PI/2); geo.translate(-.14,0,0);
    const block = new T.Mesh(geo,alloy); block.castShadow=true; block.receiveShadow=true; block.userData.part="tapas"; cap.add(block);
    lathe(cap, [[.19,-.2],[.31,-.2],[.35,-.15],[.35,.15],[.31,.2],[.19,.2],[.19,-.2]], steel);
    const port = new T.Mesh(new T.CylinderGeometry(.115,.115,.2, n),steel); port.position.set(0,.72,0); cap.add(port);
    const bore = new T.Mesh(new T.CylinderGeometry(.075,.075,.005,n),seal); bore.position.set(0,.823,0); cap.add(bore);
    for(const y of [-.49,.49]) for(const z of [-.49,.49]) {
      const bolt = new T.Mesh(new T.CylinderGeometry(.085,.085,.09,6),fastener); bolt.rotation.z=Math.PI/2; bolt.position.set(cap===back?-.21:.21,y,z); cap.add(bolt);
      const socket=new T.Mesh(new T.CylinderGeometry(.034,.034,.004,6),seal);socket.rotation.z=Math.PI/2;socket.position.set(cap===back?-.258:.258,y,z);cap.add(socket);
    }
  }
  const rods=group("tapas",-.65,-.5,.04,-.05,0,.03);
  for(const y of [-.49,.49]) for(const z of [-.49,.49]) {
    const rod=lathe(rods,[[0,-1.38],[.035,-1.38],[.035,1.38],[0,1.38]],rodSteel);rod.position.y=y;rod.position.z=z;
  }
  const piston=group("piston",.12,1.22,.12,.14,0,.06);
  lathe(piston,[[.16,-.19],[.42,-.19],[.47,-.15],[.47,-.1],[.435,-.085],[.435,-.025],[.47,-.01],[.47,.08],[.435,.09],[.435,.14],[.47,.15],[.42,.2],[.16,.2],[.16,-.19]],alloy);
  const shaft=group("vastago",1.5,1.22,.12,.14,0,.06);
  lathe(shaft,[[0,-1.4],[.155,-1.4],[.155,1.32],[.12,1.35],[.12,1.62],[0,1.62]],chrome);
  for(let i=0;i<10;i++) lathe(shaft,[[.118,1.36+i*.025],[.129,1.369+i*.025],[.118,1.378+i*.025]],steel);
  const seals=group("sellos",.12,.65,.2,.3,0,.12);
  for(const x of [-.057,.115]) lathe(seals,[[.43,x-.023],[.481,x-.023],[.488,x],[.481,x+.023],[.43,x+.023],[.43,x-.023]],seal);
  const gland=group("sellos",.98,3.75,-.045,.42,0,.1);
  lathe(gland,[[.157,-.04],[.24,-.04],[.26,0],[.24,.04],[.157,.04],[.157,-.04]],seal);
  const surfaces: { material: T.MeshStandardMaterial; part: string; color: T.Color; environment: number; emphasis: number }[] = [];
  root.traverse(object => {
    if (!(object instanceof T.Mesh) || !(object.material instanceof T.MeshStandardMaterial)) return;
    object.material = object.material.clone();
    const id = object.userData.part ?? object.parent?.userData.part;
    object.userData.part = id;
    surfaces.push({ material: object.material, part: id, color: object.material.color.clone(), environment: object.material.envMapIntensity, emphasis: 0 });
  });
  let amount = 0, from = 0, destination = 0, elapsed = 1.25;
  // Punto de referencia por pieza (etiquetas y foco de cámara).
  const anchors: Record<string, T.Object3D> = { camisa: barrel, tapas: front, piston, vastago: shaft, sellos: seals };
  return {
    root,
    anchor(id: string) { return anchors[id] ?? null; },
    update(target: number, selected: string | null, delta: number, scrub = false) {
      if (!scrub && target !== destination) { from = amount; destination = target; elapsed = 0; }
      elapsed = Math.min(1.25, elapsed + delta);
      const t = elapsed / 1.25;
      const easing = t * t * t * (t * (t * 6 - 15) + 10);
      if(scrub){amount=T.MathUtils.damp(amount,target,8,delta);from=amount;destination=target;}else amount = T.MathUtils.lerp(from, destination, easing);
      for (const g of groups) {
        const travel = T.MathUtils.smoothstep(amount, g.delay, 1);
        g.object.position.copy(g.offset).multiplyScalar(travel);
        g.object.position.x += g.base;
        g.object.position.y += Math.sin(travel * Math.PI) * .055;
        g.object.rotation.y = g.tilt * travel;
      }
      // Only the exploded view opens the gap between the paired seals.
      seals.children.forEach((ring, index) => { ring.position.x = (index ? .045 : -.045) * amount; });
      let settling = scrub ? Math.abs(amount-target)>.002 : elapsed < 1.25;
      for (const surface of surfaces) {
        const targetEmphasis = selected ? (surface.part === selected ? 1 : -1) : 0;
        surface.emphasis = T.MathUtils.damp(surface.emphasis, targetEmphasis, 10, delta);
        if (Math.abs(surface.emphasis - targetEmphasis) > .002) settling = true;
        const emphasis = surface.emphasis;
        surface.material.color.copy(surface.color).multiplyScalar(1 + emphasis * (emphasis > 0 ? .16 : .32));
        surface.material.envMapIntensity = surface.environment * (1 + emphasis * .26);
        surface.material.emissive.setRGB(.025, .036, .052).multiplyScalar(Math.max(0, emphasis));
      }
      return { settling, amount };
    },
    dispose() {
      root.traverse(object => { if (object instanceof T.Mesh) { object.geometry.dispose(); if (object.material instanceof T.Material) object.material.dispose(); } });
      [steel, chrome, alloy, rodSteel, fastener, seal].forEach(material => material.dispose());
      grain.dispose();
    }
  };
}
