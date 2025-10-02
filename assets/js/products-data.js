// IATAMA Complete Products Database
// Total: 70 products (excluding logo)

const iatamaProducts = [
    // ========== QUÍMICOS Y SALES (1-5) ==========
    {
        id: 1,
        name: 'Aquatrol – Sal en Pellet Premium (22.6 kg)',
        description: 'Sal en pellet de alta pureza (99.6%) utilizada principalmente para suavizadores de agua y procesos industriales.',
        category: 'quimicos',
        price: 400,
        image: 'assets/img/products/01-aquatrol-sal-pellet-premium.jpg'
    },
    {
        id: 2,
        name: 'Viplax – Detergente Alcalino en Polvo',
        description: 'Detergente alcalino en polvo para lavado interno de garrafones en área alimenticia. Contiene surfactantes y agentes cáusticos.',
        category: 'quimicos',
        price: 200,
        image: 'assets/img/products/02-viplax-detergente-alcalino-polvo.jpg'
    },
    {
        id: 3,
        name: 'Aciplax – Detergente Ácido',
        description: 'Detergente líquido ácido para eliminar incrustaciones y residuos en el interior de garrafones, eficaz contra sarro y minerales.',
        category: 'quimicos',
        price: 250,
        image: 'assets/img/products/03-aciplax-detergente-acido.jpg'
    },
    {
        id: 4,
        name: 'Hipoclorito de Sodio (IATAMA)',
        description: 'Desinfectante líquido de uso general, empleado en sanitización de agua, superficies y equipos. Presentación en garrafa.',
        category: 'quimicos',
        price: 300,
        image: 'assets/img/products/04-hipoclorito-sodio-iatama.jpg'
    },
    {
        id: 5,
        name: 'Hipoclorito de Calcio en Pellets (IATAMA)',
        description: 'Tabletas sólidas de hipoclorito de calcio, utilizadas para desinfección de agua potable y procesos alimenticios.',
        category: 'quimicos',
        price: 350,
        image: 'assets/img/products/05-hipoclorito-calcio-pellets-iatama.jpg'
    },

    // ========== FILTROS Y CARTUCHOS (6-9) ==========
    {
        id: 6,
        name: 'Carbón Activado Block – Aquex (10" / 5 micras)',
        description: 'Filtro de cartucho de carbón activado en block, remueve cloro, materia orgánica y olores.',
        category: 'filtros',
        price: 350,
        image: 'assets/img/products/06-carbon-activado-block-aquex-10-5micras.jpg'
    },
    {
        id: 7,
        name: 'Polipropileno Sedimentos – Aquex (10" BB / 5 micras)',
        description: 'Cartucho filtrante de polipropileno para retención de sedimentos, arena, óxidos y partículas suspendidas.',
        category: 'filtros',
        price: 200,
        image: 'assets/img/products/07-polipropileno-sedimentos-aquex-10bb-5micras.jpg'
    },
    {
        id: 8,
        name: 'Diclorsan – Dióxido de Cloro al 10% (IATAMA)',
        description: 'Solución germicida y sanitizante, elimina bacterias, virus y hongos. De uso en área alimenticia.',
        category: 'quimicos',
        price: 500,
        image: 'assets/img/products/08-diclorsan-dioxido-cloro-iatama.jpg'
    },
    {
        id: 9,
        name: 'Filtro de Sedimentos – Purikor (5 micras, 10")',
        description: 'Cartucho de polipropileno para filtración de sedimentos finos, alta retención de sólidos, resistente a químicos.',
        category: 'filtros',
        price: 150,
        image: 'assets/img/products/09-filtro-sedimentos-purikor-5micras-10.jpg'
    },

    // ========== FILTROS HYDRONIX (10-14) ==========
    {
        id: 10,
        name: 'Hydronix SWC-25-2005 – Cartucho Sedimentos Bobinado',
        description: 'Filtro de sedimentos tipo bobinado de polipropileno, 5 micras, para retención de arena, óxido y partículas.',
        category: 'filtros',
        price: 180,
        image: 'assets/img/products/10-hydronix-swc-25-2005-cartucho-sedimentos-bobinado.jpg'
    },
    {
        id: 11,
        name: 'Quater 100 – Desinfectante Multiusos (IATAMA)',
        description: 'Desinfectante líquido multiusos a base de amonio cuaternario de 4ª generación. Libre de cloro, residuos y olor.',
        category: 'quimicos',
        price: 450,
        image: 'assets/img/products/11-quater-100-desinfectante-multiusos-iatama.jpg'
    },
    {
        id: 12,
        name: 'Panda – Dosificador Automático para Cloro en Tabletas',
        description: 'Alimentador automático para tabletas de cloro, utilizado en sistemas de purificación y mantenimiento de agua.',
        category: 'accesorios',
        price: 1500,
        image: 'assets/img/products/12-panda-dosificador-automatico-cloro-tabletas.jpg'
    },
    {
        id: 13,
        name: 'Aquex Carbón Activado Block (10" BB / 10 micras)',
        description: 'Cartucho de carbón activado block de gran capacidad, elimina cloro, olores, materia orgánica y sedimentos finos.',
        category: 'filtros',
        price: 400,
        image: 'assets/img/products/13-aquex-carbon-activado-block-10bb-10micras.jpg'
    },
    {
        id: 14,
        name: 'Hydronix SPC-25-1010 – Cartucho Sedimentos Plegado',
        description: 'Filtro de sedimentos plisado de poliéster, lavable y reutilizable, 10 micras, para mayor flujo y vida útil.',
        category: 'filtros',
        price: 220,
        image: 'assets/img/products/14-hydronix-spc-25-1010-cartucho-sedimentos-plegado.jpg'
    },

    // ========== DETERGENTES INDUSTRIALES (15-19) ==========
    {
        id: 15,
        name: 'Greisco – Detergente Líquido Biodegradable Desengrasante',
        description: 'Detergente líquido desengrasante multiusos, biodegradable, para uso en área alimenticia.',
        category: 'quimicos',
        price: 300,
        image: 'assets/img/products/15-greisco-detergente-liquido-biodegradable-desengrasante.jpg'
    },
    {
        id: 16,
        name: 'Dinamic-K – Detergente Líquido Alcalino',
        description: 'Detergente líquido alcalino para lavado interno de garrafones por aspersión con lavadora.',
        category: 'quimicos',
        price: 350,
        image: 'assets/img/products/16-dinamic-k-detergente-liquido-alcalino.jpg'
    },
    {
        id: 17,
        name: 'Purikor – Cartucho Sedimentos Plegado (5 micras)',
        description: 'Cartucho plisado de polipropileno de alta eficiencia, lavable/reutilizable, usado en prefiltración y ósmosis inversa.',
        category: 'filtros',
        price: 250,
        image: 'assets/img/products/17-purikor-cartucho-sedimentos-plegado-5micras.jpg'
    },
    {
        id: 18,
        name: 'KR-40 – Detergente Líquido Germicida Biodegradable',
        description: 'Detergente líquido germicida biodegradable, diseñado para el lavado exterior de garrafones en purificadoras.',
        category: 'quimicos',
        price: 300,
        image: 'assets/img/products/18-kr-40-detergente-liquido-germicida-biodegradable.jpg'
    },
    {
        id: 19,
        name: 'Naclor – Hipoclorito de Sodio (IATAMA)',
        description: 'Solución de hipoclorito de sodio al 13%, utilizada en la desinfección y potabilización del agua.',
        category: 'quimicos',
        price: 280,
        image: 'assets/img/products/19-naclor-hipoclorito-sodio-iatama.jpg'
    },

    // ========== ACCESORIOS PISCINA Y CONTROL (20-27) ==========
    {
        id: 20,
        name: 'Panda – Barredora Triangular para Piscina',
        description: 'Cabezal barredora triangular de succión para limpieza de fondos de alberca.',
        category: 'piscinas',
        price: 450,
        image: 'assets/img/products/20-panda-barredora-triangular-piscina.jpg'
    },
    {
        id: 21,
        name: 'Tabletas DPD1 – Pentair',
        description: 'Tabletas de reactivo DPD1, utilizadas para pruebas de cloro libre en agua con equipos fotométricos.',
        category: 'accesorios',
        price: 600,
        image: 'assets/img/products/21-tabletas-dpd1-pentair.jpg'
    },
    {
        id: 22,
        name: 'Aquatro – Tanque Hidroneumático Horizontal',
        description: 'Tanque de presión azul, horizontal, para sistemas hidroneumáticos y ósmosis inversa.',
        category: 'tanques',
        price: 3500,
        image: 'assets/img/products/22-aquatro-tanque-hidroneumatico-horizontal.jpg'
    },
    {
        id: 23,
        name: 'CEIV SP-315 – Interruptor de Arranque/Paro',
        description: 'Interruptor eléctrico ON/OFF para bombas de agua, trifásico 380V, 15A, 2.2kW.',
        category: 'accesorios',
        price: 300,
        image: 'assets/img/products/23-ceiv-sp-315-interruptor-arranque-paro.jpg'
    },
    {
        id: 24,
        name: 'Hydronix SDC-45-1005 – Cartucho de Sedimentos',
        description: 'Filtro de sedimentos de polipropileno, 5 micras, alta capacidad.',
        category: 'filtros',
        price: 280,
        image: 'assets/img/products/24-hydronix-sdc-45-1005-cartucho-sedimentos.jpg'
    },
    {
        id: 25,
        name: 'Cartucho de Sedimentos Bobinado (Genérico)',
        description: 'Filtro de sedimentos bobinado de polipropileno, 5-10 micras, para agua potable.',
        category: 'filtros',
        price: 180,
        image: 'assets/img/products/25-cartucho-sedimentos-bobinado-generico.jpg'
    },
    {
        id: 26,
        name: 'Motor Dosificador Azul Transparente',
        description: 'Motor eléctrico dosificador, carcasa transparente, usado en sistemas automáticos.',
        category: 'bombas',
        price: 1800,
        image: 'assets/img/products/26-motor-dosificador-azul-transparente.jpg'
    },
    {
        id: 27,
        name: 'Oakland – Flotador con Contrapeso (3m)',
        description: 'Interruptor de nivel de agua con cable de 3 m y contrapeso.',
        category: 'accesorios',
        price: 400,
        image: 'assets/img/products/27-oakland-flotador-contrapeso-3m.jpg'
    },

    // ========== FILTROS ESPECIALIZADOS (28-36) ==========
    {
        id: 28,
        name: 'Cartucho Plisado para Sedimentos',
        description: 'Filtro de agua plisado de 20" con retención de sedimentos de 5 micras.',
        category: 'filtros',
        price: 400,
        image: 'assets/img/products/28-cartucho-plisado-sedimentos.jpg'
    },
    {
        id: 29,
        name: 'Filtro de Sedimentos en Polipropileno',
        description: 'Cartucho de polipropileno de 5 micras, económico y eficiente.',
        category: 'filtros',
        price: 120,
        image: 'assets/img/products/29-filtro-sedimentos-polipropileno-hydronix-sdc-25-1005.jpg'
    },
    {
        id: 30,
        name: 'Control Automático para Bomba de Agua',
        description: 'Presurizador electrónico que regula el encendido y apagado de la bomba.',
        category: 'accesorios',
        price: 900,
        image: 'assets/img/products/30-control-automatico-bomba-presurizador-electronico.jpg'
    },
    {
        id: 31,
        name: 'Desplax Biodegradable – Líquido Concentrado',
        description: 'Detergente biodegradable especial para lavado interno de garrafones.',
        category: 'quimicos',
        price: 180,
        image: 'assets/img/products/31-desplax-biodegradable-liquido-concentrado.jpg'
    },
    {
        id: 32,
        name: 'Tabletas de Cloro para Agua',
        description: 'Pastillas de cloro estabilizado para potabilización y desinfección.',
        category: 'quimicos',
        price: 400,
        image: 'assets/img/products/32-tabletas-cloro-agua.jpg'
    },
    {
        id: 33,
        name: 'Resina Catiónica para Suavizador',
        description: 'Resina grado alimenticio para suavizar agua dura. Saco de 28 L.',
        category: 'tratamiento',
        price: 2800,
        image: 'assets/img/products/33-resina-cationica-suavizador-agua-purikor.jpg'
    },
    {
        id: 34,
        name: 'Cartucho de Hilo Enrollado',
        description: 'Filtro de sedimentos de 5 micras con hilo de polipropileno enrollado.',
        category: 'filtros',
        price: 120,
        image: 'assets/img/products/34-cartucho-hilo-enrollado-hydronix-swc-25-1005.jpg'
    },
    {
        id: 35,
        name: 'Zeolita Mineral Purikor',
        description: 'Material filtrante de alta eficiencia para sistemas de tratamiento. 22 kg.',
        category: 'tratamiento',
        price: 400,
        image: 'assets/img/products/35-zeolita-mineral-purikor.jpg'
    },
    {
        id: 36,
        name: 'Zeolita Mineral Crystalum',
        description: 'Material filtrante granular para purificación de agua. Presentación de 21 kg.',
        category: 'tratamiento',
        price: 380,
        image: 'assets/img/products/36-zeolita-mineral-crystalum.jpg'
    },

    // ========== CARBÓN Y MATERIALES FILTRANTES (37-45) ==========
    {
        id: 37,
        name: 'Cartucho de Carbón Activado Block PURIKOR',
        description: 'Filtro de 5 micras con carbón activado de cáscara de coco.',
        category: 'filtros',
        price: 250,
        image: 'assets/img/products/37-cartucho-carbon-activado-block-purikor.jpg'
    },
    {
        id: 38,
        name: 'Zeolita Mineral PURIKOR (22 kg)',
        description: 'Mineral para tratamiento de agua con alta capacidad de absorción.',
        category: 'tratamiento',
        price: 280,
        image: 'assets/img/products/38-zeolita-mineral-purikor-22kg.jpg'
    },
    {
        id: 39,
        name: 'Cartucho Carbón Activado HYDRONIX CB-45-1005',
        description: 'Filtro NSF de carbón activado block para eliminación de olores y sabores.',
        category: 'filtros',
        price: 850,
        image: 'assets/img/products/39-cartucho-carbon-activado-block-hydronix-cb-45-1005.jpg'
    },
    {
        id: 40,
        name: 'Carbón Activado Granular CARBOSHELL',
        description: 'Saco de carbón activado granular de alta calidad. 13 kg.',
        category: 'tratamiento',
        price: 950,
        image: 'assets/img/products/40-carbon-activado-granular-carboshell-13kg.jpg'
    },
    {
        id: 41,
        name: 'Sal en Pellets AQUAEX (20 kg)',
        description: 'Cloruro de sodio en pellets (99.6% pureza) para suavizadores.',
        category: 'quimicos',
        price: 220,
        image: 'assets/img/products/41-sal-pellets-aquaex-20kg.jpg'
    },
    {
        id: 42,
        name: 'Bomba Dosificadora AQUATROL',
        description: 'Bomba dosificadora digital para químicos en tratamiento de agua.',
        category: 'bombas',
        price: 7000,
        image: 'assets/img/products/42-bomba-dosificadora-aquatrol.jpg'
    },
    {
        id: 43,
        name: 'Sal en Pellets PURIKOR (20 kg)',
        description: 'Sal en pellets de alta pureza para suavizadores y cloración salina.',
        category: 'quimicos',
        price: 230,
        image: 'assets/img/products/43-sal-pellets-purikor-20kg.jpg'
    },
    {
        id: 44,
        name: 'Control Automático de Presión AITAL',
        description: 'Control electrónico de presión para bombas con manómetro incluido.',
        category: 'accesorios',
        price: 1600,
        image: 'assets/img/products/44-control-automatico-presion-aital.jpg'
    },
    {
        id: 45,
        name: 'Trampa de Grasa Industrial',
        description: 'Caja separadora de grasas para drenajes de cocinas y restaurantes.',
        category: 'industrial',
        price: 5000,
        image: 'assets/img/products/45-trampa-grasa-industrial.jpg'
    },

    // ========== EQUIPOS INDUSTRIALES (46-54) ==========
    {
        id: 46,
        name: 'Llenadora Manual de Garrafones (2 boquillas)',
        description: 'Equipo de acero inoxidable con dos embudos para llenado de garrafones.',
        category: 'industrial',
        price: 18000,
        image: 'assets/img/products/46-llenadora-manual-garrafones-2-boquillas-iatama.jpg'
    },
    {
        id: 48,
        name: 'Llenadora Manual con Adaptador (2 garrafones)',
        description: 'Variante de llenadora con sistema doble para llenado simultáneo.',
        category: 'industrial',
        price: 20000,
        image: 'assets/img/products/48-llenadora-manual-garrafones-adaptador-2-garrafones.jpg'
    },
    {
        id: 49,
        name: 'Trampa de Grasa Acero Inoxidable (3 compartimentos)',
        description: 'Separador de grasas para uso en cocinas, evita obstrucciones.',
        category: 'industrial',
        price: 5000,
        image: 'assets/img/products/49-trampa-grasa-acero-inoxidable-3-compartimentos.jpg'
    },
    {
        id: 50,
        name: 'Trampa de Grasa Industrial (4 compartimentos)',
        description: 'Versión más grande para uso intensivo en comedores industriales.',
        category: 'industrial',
        price: 7500,
        image: 'assets/img/products/50-trampa-grasa-industrial-4-compartimentos-grandes.jpg'
    },
    {
        id: 51,
        name: 'Lavadora de Garrafones con Cepillo',
        description: 'Equipo de lavado interno y externo con cepillo giratorio.',
        category: 'industrial',
        price: 22000,
        image: 'assets/img/products/51-lavadora-garrafones-acero-inoxidable-con-cepillo.jpg'
    },
    {
        id: 52,
        name: 'Bomba Acero Inoxidable Alta Presión',
        description: 'Bomba centrífuga multietapas para ósmosis inversa.',
        category: 'bombas',
        price: 12000,
        image: 'assets/img/products/52-bomba-acero-inoxidable-alta-presion-multietapas.jpg'
    },
    {
        id: 53,
        name: 'Trampa de Grasa Rectangular (3 compartimentos)',
        description: 'Separador de grasas con tapa superior removible.',
        category: 'industrial',
        price: 5000,
        image: 'assets/img/products/53-trampa-grasa-acero-inoxidable-3-compartimentos-rectangular.jpg'
    },
    {
        id: 54,
        name: 'Housing de Membrana Ósmosis (4" x 40")',
        description: 'Carcasa industrial para membranas, resistente a presión.',
        category: 'osmosis',
        price: 9000,
        image: 'assets/img/products/54-housing-membrana-osmosis-inversa-acero-inoxidable-4x40.jpg'
    },

    // ========== PLANTAS DE ÓSMOSIS INVERSA (55-62) ==========
    {
        id: 55,
        name: 'Planta Ósmosis Inversa Compacta (50-200 GPD)',
        description: 'Equipo pequeño de ósmosis inversa para purificación, incluye manómetros y sistema de control.',
        category: 'osmosis',
        price: 40000,
        image: 'assets/img/products/55-planta-osmosis-inversa-compacta-50-200-gpd.jpg'
    },
    {
        id: 56,
        name: 'Planta Ósmosis Industrial (4 membranas)',
        description: 'Sistema en acero inoxidable con bomba multietapas. Capacidad 1,000-3,000 GPD.',
        category: 'osmosis',
        price: 280000,
        image: 'assets/img/products/56-planta-osmosis-inversa-industrial-4-membranas.jpg'
    },
    {
        id: 57,
        name: 'Módulo de Llenado de Garrafones (3 boquillas)',
        description: 'Sistema de llenado en acero y PVC con tres salidas.',
        category: 'industrial',
        price: 13000,
        image: 'assets/img/products/57-modulo-llenado-garrafones-3-boquillas.jpg'
    },
    {
        id: 58,
        name: 'Bomba Multietapas Alta Presión',
        description: 'Bomba centrífuga para sistemas de ósmosis inversa industrial.',
        category: 'bombas',
        price: 14000,
        image: 'assets/img/products/58-bomba-multietapas-alta-presion-acero-inoxidable.jpg'
    },
    {
        id: 59,
        name: 'Housing Membrana PVC (Doble Carcasa)',
        description: 'Carcasa doble para membranas de ósmosis inversa 4" x 40".',
        category: 'osmosis',
        price: 5500,
        image: 'assets/img/products/59-housing-membrana-osmosis-inversa-pvc-doble-carcasa.jpg'
    },
    {
        id: 60,
        name: 'Lavadora de Garrafones con Cepillo',
        description: 'Equipo manual con cepillo giratorio y bomba de agua.',
        category: 'industrial',
        price: 22000,
        image: 'assets/img/products/60-lavadora-garrafones-acero-inoxidable-cepillo.jpg'
    },
    {
        id: 61,
        name: 'Planta Ósmosis Industrial (6 membranas)',
        description: 'Sistema de mayor capacidad hasta 5,000 GPD con control de presión.',
        category: 'osmosis',
        price: 320000,
        image: 'assets/img/products/61-planta-osmosis-inversa-industrial-6-membranas.jpg'
    },
    {
        id: 62,
        name: 'Planta Ósmosis Compacta IATAMA',
        description: 'Versión promocional de equipo compacto de ósmosis inversa.',
        category: 'osmosis',
        price: 40000,
        image: 'assets/img/products/62-planta-osmosis-inversa-compacta-iatama-catalogo.jpg'
    },

    // ========== ACCESORIOS INDUSTRIALES (63-71) ==========
    {
        id: 63,
        name: 'Trampa de Grasa (4 compartimentos)',
        description: 'Separador de grasas en acero inoxidable para drenaje industrial.',
        category: 'industrial',
        price: 7000,
        image: 'assets/img/products/63-trampa-grasa-acero-inoxidable-4-compartimentos.jpg'
    },
    {
        id: 64,
        name: 'Planta Ósmosis con Gabinete Control',
        description: 'Equipo con manómetros, flujómetros y gabinete de control eléctrico.',
        category: 'osmosis',
        price: 40000,
        image: 'assets/img/products/64-planta-osmosis-inversa-compacta-gabinete-control.jpg'
    },
    {
        id: 65,
        name: 'Portatapas Acero Inoxidable (3-4 compartimentos)',
        description: 'Caja organizadora con divisiones para almacenar tapas de garrafones.',
        category: 'industrial',
        price: 5000,
        image: 'assets/img/products/65-portatapas-acero-inoxidable-3-4-compartimentos.jpg'
    },
    {
        id: 66,
        name: 'Portatapas (4-5 compartimentos grandes)',
        description: 'Versión de mayor capacidad con tapa abatible y divisores internos.',
        category: 'industrial',
        price: 6500,
        image: 'assets/img/products/66-portatapas-acero-inoxidable-4-5-compartimentos-grandes.jpg'
    },
    {
        id: 67,
        name: 'Housing Membrana PVC Individual',
        description: 'Carcasa individual en PVC para membrana 4" x 40" con soportes.',
        category: 'osmosis',
        price: 4000,
        image: 'assets/img/products/67-housing-membrana-osmosis-inversa-pvc-individual-4x40.jpg'
    },
    {
        id: 68,
        name: 'Módulo Llenado (Montaje Pared)',
        description: 'Sistema con 3 válvulas de llenado simultáneo para estaciones.',
        category: 'industrial',
        price: 12000,
        image: 'assets/img/products/68-modulo-llenado-garrafones-3-boquillas-montaje-pared.jpg'
    },
    {
        id: 69,
        name: 'Módulo Llenado con Mesa de Acero',
        description: 'Estación completa con estructura de acero inoxidable.',
        category: 'industrial',
        price: 16000,
        image: 'assets/img/products/69-modulo-llenado-mesa-acero-3-boquillas-soporte.jpg'
    },
    {
        id: 70,
        name: 'Llenadora Manual (2 boquillas + bomba)',
        description: 'Equipo manual con dos entradas superiores y bomba de impulsión.',
        category: 'industrial',
        price: 18000,
        image: 'assets/img/products/70-llenadora-manual-garrafones-2-boquillas-bomba-verde.jpg'
    },
    {
        id: 71,
        name: 'Portatapas (5 compartimentos)',
        description: 'Caja de almacenamiento con 5 divisiones para alta rotación.',
        category: 'industrial',
        price: 7500,
        image: 'assets/img/products/71-portatapas-acero-inoxidable-5-compartimentos.jpg'
    }
];

// Product categories
const productCategories = {
    'all': { label: 'Todos los Productos', icon: 'bi-grid-3x3-gap' },
    'quimicos': { label: 'Químicos y Detergentes', icon: 'bi-droplet-fill' },
    'filtros': { label: 'Filtros y Cartuchos', icon: 'bi-funnel' },
    'bombas': { label: 'Bombas y Motores', icon: 'bi-gear' },
    'osmosis': { label: 'Ósmosis Inversa', icon: 'bi-moisture' },
    'industrial': { label: 'Equipos Industriales', icon: 'bi-building' },
    'tratamiento': { label: 'Tratamiento de Agua', icon: 'bi-recycle' },
    'piscinas': { label: 'Piscinas y Spa', icon: 'bi-tsunami' },
    'tanques': { label: 'Tanques y Depósitos', icon: 'bi-archive' },
    'accesorios': { label: 'Accesorios', icon: 'bi-tools' }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { iatamaProducts, productCategories };
}