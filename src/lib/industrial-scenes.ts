/** Visual editorial geometry, never a model/specification of a stocked product. */
export const SCENES = ["ecosistema", "neumatica", "hidraulica", "cilindros", "control-electrico", "sensores", "instrumentacion", "resistencias-electricas", "servicios"] as const;
export type SceneId = (typeof SCENES)[number];
export const CYLINDER_PARTS = [
  { id: "camisa", name: "Camisa", description: "Aloja el pistón y guía su recorrido." },
  { id: "tapas", name: "Tapas", description: "Cierran los extremos del cuerpo del cilindro." },
  { id: "piston", name: "Pistón", description: "Recibe la presión y transmite el movimiento al vástago." },
  { id: "vastago", name: "Vástago", description: "Transmite el movimiento hacia el equipo." },
  { id: "sellos", name: "Sellos", description: "Ayudan a mantener la estanqueidad entre componentes." },
] as const;
export type PartId = (typeof CYLINDER_PARTS)[number]["id"];
/** Only add an approved local GLB here after confirming provenance and geometry.
 * Draco/Meshopt/KTX2 belong to the asset pipeline when the actual assets require them.
 * No unverified remote product models or dimensions are loaded. */
export const APPROVED_MODELS: Partial<Record<SceneId, { url: string; label: string }>> = {};
