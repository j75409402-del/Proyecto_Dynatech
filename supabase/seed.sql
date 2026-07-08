-- =====================================================================
-- Seed inicial - Dynatech
-- Categorías y marcas reales del rubro industrial en RD
-- =====================================================================

-- ---------- CATEGORÍAS PADRE ----------
insert into public.categories (slug, name, description, icon, sort_order, featured) values
    ('neumatica',         'Neumática',         'Cilindros, válvulas, actuadores, unidades FRL y accesorios para sistemas de aire comprimido.', 'Wind',      1, true),
    ('automatizacion',    'Automatización',    'PLCs, HMIs, variadores de frecuencia y controladores industriales.',                              'Cpu',       2, true),
    ('instrumentacion',   'Instrumentación',   'Medición de presión, temperatura, flujo y nivel para procesos industriales.',                     'Gauge',     3, true),
    ('sensores',          'Sensores',          'Sensores inductivos, capacitivos, fotoeléctricos, ultrasónicos y de proximidad.',                 'Radar',     4, true),
    ('electrica',         'Eléctrica industrial', 'Contactores, relés, protecciones, cableado y componentes de tablero.',                          'Zap',       5, true),
    ('materiales',        'Materiales industriales', 'Tuberías, mangueras, conexiones, sellos, empaques y consumibles.',                          'Wrench',    6, false);

-- ---------- SUBCATEGORÍAS ----------
-- Neumática
insert into public.categories (slug, name, description, parent_id, sort_order) values
    ('cilindros-neumaticos',   'Cilindros neumáticos',  'Cilindros ISO, compactos, guiados y de doble efecto.',
        (select id from public.categories where slug = 'neumatica'), 1),
    ('valvulas-neumaticas',    'Válvulas neumáticas',   'Válvulas direccionales 3/2, 5/2, 5/3 y solenoides.',
        (select id from public.categories where slug = 'neumatica'), 2),
    ('unidades-frl',           'Unidades FRL',          'Filtros, reguladores y lubricadores para aire comprimido.',
        (select id from public.categories where slug = 'neumatica'), 3),
    ('conexiones-rapidas',     'Conexiones rápidas',    'Racores instantáneos, push-in y accesorios de tubería.',
        (select id from public.categories where slug = 'neumatica'), 4);

-- Automatización
insert into public.categories (slug, name, description, parent_id, sort_order) values
    ('plcs',                   'PLCs',                  'Controladores lógicos programables Siemens, Allen-Bradley, Schneider.',
        (select id from public.categories where slug = 'automatizacion'), 1),
    ('variadores',             'Variadores de frecuencia', 'VFDs pa'' control de motores AC.',
        (select id from public.categories where slug = 'automatizacion'), 2),
    ('hmis',                   'HMIs / Pantallas',      'Interfaces hombre-máquina táctiles.',
        (select id from public.categories where slug = 'automatizacion'), 3);

-- Instrumentación
insert into public.categories (slug, name, description, parent_id, sort_order) values
    ('presion',                'Medición de presión',   'Manómetros, transmisores y switches de presión.',
        (select id from public.categories where slug = 'instrumentacion'), 1),
    ('temperatura',            'Medición de temperatura', 'Termocuplas, RTDs, termopozos y controladores.',
        (select id from public.categories where slug = 'instrumentacion'), 2),
    ('flujo',                  'Medición de flujo',     'Caudalímetros electromagnéticos, vórtex, coriolis.',
        (select id from public.categories where slug = 'instrumentacion'), 3);

-- Sensores
insert into public.categories (slug, name, description, parent_id, sort_order) values
    ('sensores-inductivos',    'Inductivos',            'Detección de metales sin contacto.',
        (select id from public.categories where slug = 'sensores'), 1),
    ('sensores-fotoelectricos','Fotoeléctricos',        'Barrera, difuso y retroreflectivo.',
        (select id from public.categories where slug = 'sensores'), 2),
    ('sensores-capacitivos',   'Capacitivos',           'Detección de líquidos, sólidos y no metales.',
        (select id from public.categories where slug = 'sensores'), 3);

-- ---------- MARCAS ----------
insert into public.brands (slug, name, description, country, featured, sort_order) values
    ('festo',       'Festo',       'Líder mundial en automatización neumática y eléctrica.',           'Alemania',     true,  1),
    ('smc',         'SMC',         'Fabricante japonés de componentes neumáticos.',                    'Japón',        true,  2),
    ('siemens',     'Siemens',     'PLCs, variadores y automatización industrial.',                    'Alemania',     true,  3),
    ('schneider',   'Schneider Electric', 'Automatización y gestión de energía.',                      'Francia',      true,  4),
    ('parker',      'Parker Hannifin', 'Hidráulica, neumática y sistemas de movimiento.',              'EE.UU.',       true,  5),
    ('omron',       'Omron',       'Sensores, PLCs y automatización.',                                 'Japón',        true,  6),
    ('endress',     'Endress+Hauser', 'Instrumentación de procesos.',                                  'Suiza',        false, 7),
    ('wika',        'WIKA',        'Instrumentación de presión y temperatura.',                        'Alemania',     false, 8);

-- ---------- PRODUCTOS DE EJEMPLO ----------
-- Estos son placeholders — reemplázalos con tu catálogo real vía admin o CSV import.
insert into public.products (
    sku, slug, name, short_desc, description, category_id, brand_id,
    specs, stock_status, active, featured, thumbnail_url
) values
(
    'FES-DSBC-32-100',
    'cilindro-festo-dsbc-32-100',
    'Cilindro Festo DSBC-32-100-PPVA-N3',
    'Cilindro estándar ISO 15552, doble efecto, Ø32mm, carrera 100mm.',
    'Cilindro neumático de doble efecto con amortiguación neumática regulable en ambos extremos. Estándar ISO 15552.',
    (select id from public.categories where slug = 'cilindros-neumaticos'),
    (select id from public.brands where slug = 'festo'),
    '{"diametro": "32 mm", "carrera": "100 mm", "presion_max": "10 bar", "conexion": "G 1/8", "temperatura": "-20 a 80 °C", "material_camisa": "aluminio anodizado"}'::jsonb,
    'en_stock', true, true, null
),
(
    'SMC-VF3130-5DZ',
    'valvula-smc-vf3130-5dz',
    'Válvula SMC VF3130-5DZ',
    'Válvula solenoide 5/2, monoestable, 24VDC.',
    'Válvula de accionamiento eléctrico, cuerpo de aluminio, ideal pa'' automatización de líneas de producción.',
    (select id from public.categories where slug = 'valvulas-neumaticas'),
    (select id from public.brands where slug = 'smc'),
    '{"tipo": "5/2 monoestable", "voltaje": "24 VDC", "conexion": "1/8", "presion": "0.15 - 0.7 MPa", "caudal": "1200 L/min"}'::jsonb,
    'bajo_pedido', true, true, null
),
(
    'SIE-6ES7214-1AG40',
    'plc-siemens-s7-1200-cpu1214c',
    'PLC Siemens S7-1200 CPU 1214C DC/DC/DC',
    'Controlador compacto con 14 entradas y 10 salidas digitales.',
    'CPU 1214C con memoria de trabajo de 100 KB, 14 DI / 10 DO / 2 AI integradas. Interfaz PROFINET.',
    (select id from public.categories where slug = 'plcs'),
    (select id from public.brands where slug = 'siemens'),
    '{"cpu": "1214C DC/DC/DC", "entradas_digitales": "14", "salidas_digitales": "10", "entradas_analogicas": "2", "memoria": "100 KB", "comunicacion": "PROFINET"}'::jsonb,
    'consultar', true, true, null
),
(
    'OMR-E2E-X10ME1',
    'sensor-omron-e2e-x10me1',
    'Sensor inductivo Omron E2E-X10ME1',
    'Sensor de proximidad inductivo M30, distancia 10mm, NPN NA.',
    'Detección sin contacto de piezas metálicas, ideal pa'' líneas de ensamble y control de posición.',
    (select id from public.categories where slug = 'sensores-inductivos'),
    (select id from public.brands where slug = 'omron'),
    '{"tamano": "M30", "distancia_deteccion": "10 mm", "salida": "NPN NA", "voltaje": "12-24 VDC", "grado_proteccion": "IP67"}'::jsonb,
    'en_stock', true, true, null
),
(
    'WIK-232.50.100',
    'manometro-wika-232-50-100',
    'Manómetro WIKA 232.50 0-100 PSI',
    'Manómetro de acero inoxidable, glicerinado, Ø63mm, 0-100 PSI.',
    'Manómetro tipo Bourdon con caja llena de glicerina pa'' amortiguar vibraciones. Conexión inferior 1/4 NPT.',
    (select id from public.categories where slug = 'presion'),
    (select id from public.brands where slug = 'wika'),
    '{"diametro": "63 mm", "rango": "0-100 PSI", "conexion": "1/4 NPT inferior", "material": "acero inoxidable", "precision": "1.6% clase"}'::jsonb,
    'en_stock', true, false, null
),
(
    'FES-LFR-D-MINI',
    'unidad-frl-festo-lfr-d-mini',
    'Unidad FRL Festo LFR-D-MINI',
    'Filtro-regulador con manómetro, conexión G 1/4.',
    'Combinación de filtro y regulador de presión pa'' preparación de aire comprimido en máquinas y procesos.',
    (select id from public.categories where slug = 'unidades-frl'),
    (select id from public.brands where slug = 'festo'),
    '{"conexion": "G 1/4", "presion_max": "16 bar", "rango_regulacion": "0.5-12 bar", "grado_filtracion": "40 μm"}'::jsonb,
    'en_stock', true, false, null
);
