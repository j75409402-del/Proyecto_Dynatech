import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const context={exports:{},require:(name)=>name==='lucide-react'?new Proxy({}, {get:()=>()=>{}}):{}};
vm.runInNewContext(ts.transpileModule(readFileSync('src/lib/soluciones.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const synonyms={
  'neumatica/cilindros':['cilindro neumático','cilindros neumáticos','cilindro neumático a medida'],
  'neumatica/valvulas':['válvula neumática','válvulas neumáticas','electroválvula neumática','válvula solenoide neumática','válvula neumática 5/2','válvula neumática 3/2'],
  'neumatica/conexiones':['conector neumático','conectores neumáticos','conexiones neumáticas','fittings neumáticos','racores neumáticos'],
  'neumatica/frl':['unidad FRL','unidades FRL','filtro regulador lubricador','regulador neumático'],
  'neumatica/mangueras':['manguera neumática','mangueras neumáticas','manguera de poliuretano','manguera nylon'],
  'control-electrico/contactores-y-reles':['contactor industrial','contactores industriales','relé de control','relés térmicos'],
  'control-electrico/proteccion':['breaker industrial','breakers industriales','interruptor termomagnético','arrancador manual'],
  'control-electrico/fusibles':['fusible industrial','fusibles industriales','fusibles NH','portafusibles'],
  'control-electrico/mando-y-senalizacion':['pulsador industrial','pulsadores industriales','selector industrial','luces piloto'],
  'control-electrico/temporizadores':['temporizador industrial','temporizadores industriales','contador industrial','controlador de temperatura'],
  'control-electrico/interruptores':['final de carrera','finales de carrera','limit switch industrial','micro switch'],
  'sensores/inductivos':['sensor inductivo','sensores inductivos'],
  'sensores/capacitivos':['sensor capacitivo','sensores capacitivos'],
  'sensores/fotoelectricos':['sensor fotoeléctrico','sensores fotoeléctricos','fotocelda industrial','fotoceldas industriales'],
  'sensores/magneticos':['sensor magnético para cilindro','sensores magnéticos','sensor de proximidad'],
  'sensores/presion':['sensor de presión','sensores de presión'],
  'instrumentacion/presion':['manómetro industrial','manómetros industriales','transmisor de presión','interruptor de presión'],
  'instrumentacion/temperatura':['termómetro industrial','termómetros industriales','termopozo','termopozos'],
  'instrumentacion/flujo':['caudalímetro industrial','caudalímetros industriales','medidor de flujo','medición de caudal'],
  'instrumentacion/nivel':['medición de nivel industrial','medidor de nivel para tanque'],
  'resistencias-electricas/cartucho':['resistencia de cartucho','resistencias de cartucho'],
  'resistencias-electricas/termocuplas':['termocupla industrial','termocuplas industriales','termopar industrial','sonda RTD'],
  'resistencias-electricas/alambre':['alambre de resistencia','resistencias planas'],
};
const rows=[];
for(const line of context.exports.SOLUCIONES){
  rows.push({line:line.name,intention:line.title,target:`/${line.slug}`,variants:line.slug==='control-electrico'?['control eléctrico industrial','controles eléctricos industriales','componentes eléctricos industriales']:[line.title],decision:'Mejorar página existente',priority:line.slug==='neumatica'||line.slug==='control-electrico'?'P1':'P2'});
  for(const sub of line.subcategorias){
    const key=`${line.slug}/${sub.id}`;
    rows.push({line:line.name,intention:sub.title,target:sub.href||`/${line.slug}#${sub.id}`,variants:synonyms[key]||[sub.title.toLowerCase()],decision:sub.id==='valvulas'?'Página propia preparada; publicar tras revisión':'Mantener sección/página existente; ampliar si consultas y leads justifican contenido propio',priority:sub.id==='valvulas'||key.includes('contactores')?'P1':'P2',source:'src/lib/soluciones.ts'});
  }
}
for(const [intention,target,variants] of [
  ['Fabricación de cilindros neumáticos','/servicios#fabricacion',['fabricación de cilindros neumáticos','fabricante de cilindros neumáticos']],
  ['Reparación de cilindros neumáticos','/servicios#reparacion',['reparación de cilindro neumático','reparación de cilindros neumáticos']],
  ['Reconstrucción de cilindros','/servicios#reconstruccion',['reconstrucción de cilindros neumáticos']],
  ['Fabricación bajo muestra o plano','/servicios#bajo-muestra-o-plano',['cilindros neumáticos bajo plano','cilindros neumáticos bajo muestra']],
  ['Cambio de sellos','/servicios#cambio-de-sellos',['cambio de sellos cilindro neumático']],
  ['Cilindros personalizados','/servicios#personalizados',['cilindro neumático personalizado','cilindros neumáticos a medida']],
  ['Kits de sellos','/sellos-y-componentes#kits-de-sellos',['kit de sellos cilindro neumático','kits de sellos para cilindros neumáticos']],
  ['Vástagos cromados','/sellos-y-componentes#vastagos',['vástago cromado','vástagos cromados','barras cromadas para cilindros']],
  ['Componentes bajo medida','/sellos-y-componentes',['componentes de cilindros bajo medida','camisa tapa pistón cilindro neumático']],
  ['Cilindros hidráulicos','/cilindros-hidraulicos',['cilindro hidráulico','cilindros hidráulicos','reparación de cilindros hidráulicos','fabricación de cilindros hidráulicos']],
  ['Mecanizado','/mecanizado',['mecanizado industrial','mecanizado de piezas industriales']],
])rows.push({line:'Servicios y componentes',intention,target,variants,decision:'Mejorar contenido existente con casos y medidas confirmados; no duplicar por ciudad',priority:intention.includes('neumáticos')?'P1':'P2',source:'src/lib/servicios.ts'});
for(const r of rows){r.localVariants=r.variants.flatMap(term=>[`${term} República Dominicana`,`${term} Santo Domingo`]);r.commercialModifier='cotizar / proveedor o venta para suministros; fabricación y reparación solo en servicios confirmados';r.volume='NO VERIFICADO';r.searchStatus='Variantes propuestas; ver busquedas.json para consultas efectivamente investigadas';}
const exclusions=[{intention:'Motores eléctricos',status:'NO VERIFICADO como suministro; no crear página'},{intention:'Gabinetes/tableros eléctricos completos',status:'NO VERIFICADO como suministro; componentes de tablero sí confirmados'},{intention:'Automatización industrial integral / programación PLC',status:'NO VERIFICADO como servicio; usar contexto de aplicación de componentes'},{intention:'Hidráulica general, bombas y mangueras hidráulicas',status:'NO VERIFICADO; oferta confirmada limitada a cilindros hidráulicos'},{intention:'Marcas, distribución oficial, grado marino',status:'No ampliar oferta actual sin validar catálogo y decisiones comerciales vigentes'}];
writeFileSync('docs/seo-organico-20261003/mapa-keywords.json',JSON.stringify({date:'2026-10-03',method:'Intenciones basadas en oferta actual; no representa demanda ni volumen medido. Un fragmento # no es una página indexable independiente.',rows,exclusions},null,2));
const csv=[['Línea','Intención','Página destino','Variantes','Variantes locales','Decisión','Prioridad','Volumen'].join(',')];
const cell=x=>'"'+String(x).replaceAll('"','""')+'"';
for(const r of rows)csv.push([r.line,r.intention,r.target,r.variants.join(' | '),r.localVariants.join(' | '),r.decision,r.priority,r.volume].map(cell).join(','));
writeFileSync('docs/seo-organico-20261003/mapa-keywords.csv','\uFEFF'+csv.join('\r\n'));
console.log(JSON.stringify({lines:5,subcategories:32,intentionClusters:rows.length,exclusions:exclusions.length}));
