/**
 * Esquemas técnicos SVG (WEB-010) para páginas sin fotografía propia (cilindros hidráulicos,
 * mecanizado). Son ilustraciones genéricas con las cotas que pedimos para cotizar: NO representan
 * un trabajo, medida ni capacidad concreta de Dynatech. Ligeros (inline, 0 peticiones) y con
 * trazado animado sobrio vía CSS (`.tech-drawing`, desactivado con prefers-reduced-motion).
 */
type Props = { title: string; className?: string };

function Frame({ title, children, note }: { title: string; children: React.ReactNode; note: string }) {
  return (
    <div className="tech-drawing" data-reveal="">
      <svg viewBox="0 0 640 440" role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="td-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#ffffff0d" strokeWidth="1" /></pattern>
          <pattern id="td-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="#8fa1b3" strokeWidth="1" opacity=".55" /></pattern>
          <marker id="td-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c9d3dc" /></marker>
        </defs>
        <rect width="640" height="440" fill="url(#td-grid)" />
        {children}
      </svg>
      <p className="tech-drawing-note">{note}</p>
    </div>
  );
}

/** Cilindro hidráulico de doble efecto en corte: camisa, pistón, vástago, tapas, puertos y montajes. */
export function HydraulicCylinderDrawing({ title }: Props) {
  return (
    <Frame title={title} note="Esquema ilustrativo · Las medidas se toman de tu cilindro, plano o muestra">
      <g className="td-body" fill="none" stroke="#dfe6ec" strokeWidth="2" strokeLinejoin="round">
        {/* Montaje trasero (horquilla) */}
        <path d="M58 196h34v48H58z" /><circle cx="70" cy="220" r="9" />
        {/* Tapa trasera */}
        <path d="M92 168h30v104H92z" fill="#ffffff08" />
        {/* Camisa en corte */}
        <path d="M122 176h300M122 264h300" />
        <path d="M122 176h300v10H122zM122 254h300v10H122z" fill="url(#td-hatch)" />
        {/* Pistón con sellos */}
        <path d="M232 186h34v68h-34z" fill="#ffffff12" />
        <path d="M240 186v68M258 186v68" stroke="#e4002b" strokeWidth="3" />
        {/* Tapa delantera / prensaestopas */}
        <path d="M422 168h40v104h-40z" fill="#ffffff08" />
        <path d="M430 208v24M454 208v24" stroke="#e4002b" strokeWidth="3" />
        {/* Vástago */}
        <path d="M266 208h300v24H266z" fill="#ffffff10" />
        {/* Montaje delantero (rosca y ojo) */}
        <path d="M566 202h26v36h-26z" /><circle cx="579" cy="220" r="8" />
        <path d="M548 208v24M554 208v24M560 208v24" strokeWidth="1" opacity=".6" />
        {/* Puertos de aceite */}
        <path d="M104 168v-22h14v22M440 168v-22h14v22" />
        {/* Eje */}
        <path d="M40 220h570" stroke="#8fa1b3" strokeWidth="1" strokeDasharray="14 4 3 4" />
      </g>
      <g className="td-dims" stroke="#c9d3dc" strokeWidth="1" fill="none">
        <path d="M122 300v40M422 300v40" strokeDasharray="3 3" />
        <path d="M128 330h288" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M266 342v32M566 300v74" strokeDasharray="3 3" />
        <path d="M272 366h288" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M150 186v68" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M500 208v24" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M500 196V112" strokeDasharray="3 3" />
      </g>
      <g className="td-labels" fill="#e9eef2" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="13" letterSpacing=".06em">
        <text x="190" y="322">LARGO DE CAMISA</text>
        <text x="160" y="206">Ø INT.</text>
        <text x="370" y="358">CARRERA</text>
        <text x="160" y="160" fill="#ff5a75">SELLOS DE PISTÓN</text>
        <text x="470" y="104">Ø VÁSTAGO</text>
        <text x="470" y="150" fill="#ff5a75">SELLOS DE TAPA</text>
        <text x="58" y="290">MONTAJE</text>
        <text x="86" y="134">PUERTOS</text>
        <text x="40" y="410" fill="#8fa1b3" fontSize="12">CILINDRO HIDRÁULICO · DOBLE EFECTO · CORTE LONGITUDINAL</text>
      </g>
    </Frame>
  );
}

/** Pieza mecanizada genérica: vista lateral en corte + vista frontal, con las cotas que pedimos. */
export function MachinedPartDrawing({ title }: Props) {
  return (
    <Frame title={title} note="Esquema ilustrativo · El trabajo se evalúa con tu plano o muestra">
      <g className="td-body" fill="none" stroke="#dfe6ec" strokeWidth="2" strokeLinejoin="round">
        {/* Vista lateral: brida + cuerpo escalonado, mitad superior en corte */}
        <path d="M70 120h40v200H70z" fill="#ffffff08" />
        <path d="M110 160h150v120H110z" fill="#ffffff08" />
        <path d="M260 182h90v76h-90z" fill="#ffffff08" />
        <path d="M70 120h40v60H70zM110 160h150v20H110zM260 182h90v10h-90z" fill="url(#td-hatch)" />
        <path d="M70 200h280M70 240h280" strokeWidth="1.5" />
        <path d="M330 182v76M338 182v76M346 182v76" strokeWidth="1" opacity=".6" />
        <path d="M40 220h340" stroke="#8fa1b3" strokeWidth="1" strokeDasharray="14 4 3 4" />
        {/* Vista frontal */}
        <circle cx="510" cy="220" r="100" fill="#ffffff08" />
        <circle cx="510" cy="220" r="60" />
        <circle cx="510" cy="220" r="20" fill="#0b1016" />
        <circle cx="510" cy="140" r="8" /><circle cx="590" cy="220" r="8" /><circle cx="510" cy="300" r="8" /><circle cx="430" cy="220" r="8" />
        <circle cx="510" cy="220" r="80" stroke="#8fa1b3" strokeWidth="1" strokeDasharray="10 4 3 4" />
        <path d="M400 220h220M510 110v220" stroke="#8fa1b3" strokeWidth="1" strokeDasharray="14 4 3 4" />
      </g>
      <g className="td-dims" stroke="#c9d3dc" strokeWidth="1" fill="none">
        <path d="M70 330v40M350 330v40" strokeDasharray="3 3" />
        <path d="M76 360h268" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M40 126v188" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M390 188v64" markerStart="url(#td-arrow)" markerEnd="url(#td-arrow)" />
        <path d="M350 188h46M350 252h46" strokeDasharray="3 3" />
      </g>
      <g className="td-labels" fill="#e9eef2" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="13" letterSpacing=".06em">
        <text x="160" y="390">LARGO TOTAL</text>
        <text x="20" y="108">Ø BRIDA</text>
        <text x="300" y="160" fill="#ff5a75">ROSCA</text>
        <text x="398" y="276">Ø EJE</text>
        <text x="452" y="96">PATRÓN DE AGUJEROS</text>
        <text x="40" y="420" fill="#8fa1b3" fontSize="12">PIEZA BAJO PLANO O MUESTRA · MATERIAL Y TOLERANCIAS SEGÚN TU PLANO</text>
      </g>
    </Frame>
  );
}
