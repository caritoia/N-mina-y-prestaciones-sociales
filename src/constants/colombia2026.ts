import { ContractTypeInfo, CSTArticle, ContributionRate, MathExercise } from '../types/payroll';

// Constantes vigentes y proyectadas para el año 2026 en Colombia
export const LEGAL_CONSTANTS_2026 = {
  YEAR: 2026,
  SMMLV: 1750905, // Salario Mínimo Mensual Legal Vigente 2026
  AUXILIO_TRANSPORTE: 249095, // Auxilio de transporte mensual legal 2026
  MAX_SMMLV_FOR_TRANSPORT: 2, // Se otorga hasta quienes devenguen 2 SMMLV ($3.501.810)
  WEEKLY_HOURS_2026: 42, // Reducción de jornada laboral máxima (Ley 2101 de 2021)
  MONTHLY_WORK_HOURS_2026: 210, // Horas laborales base mensual (42 / 6 * 30 días)
  INTEGRAL_SALARY_MIN_SMMLV: 13, // 10 SMMLV salario básico + 3 SMMLV (30% factor prestacional)
  LIMIT_40_PERCENT_LAW_1393: 0.40, // Tope de pagos no salariales sobre la remuneración total
  // Parámetros Reforma Laboral Ley 2466 de 2025
  LEY_2466_NOCTURNA_INICIO: '19:00 (7:00 p.m.)', // Inicio de jornada nocturna (Art. 160 CST)
  LEY_2466_NOCTURNA_FIN: '06:00 (6:00 a.m.)', // Fin de jornada nocturna
  LEY_2466_RECARGO_DOMINICAL_2026: 0.90, // Recargo dominical/festivo del 90% para vigencia 2026 (Art. 179 CST)
};

export const ARL_RISK_CLASSES = [
  { level: 1, name: 'Clase I - Riesgo Mínimo', rate: 0.522, examples: 'Financiero, oficinas administrativas, educación, comercio al por menor.' },
  { level: 2, name: 'Clase II - Riesgo Bajo', rate: 1.044, examples: 'Manufactura ligera, confecciones, almacenes de depósito, labores agrícolas sin maquinaria pesada.' },
  { level: 3, name: 'Clase III - Riesgo Medio', rate: 2.436, examples: 'Procesamiento de alimentos, industria química, transporte terrestre de pasajeros, fundiciones.' },
  { level: 4, name: 'Clase IV - Riesgo Alto', rate: 4.350, examples: 'Metalmecánica pesada, transporte de carga, plantas eléctricas, refinerías, vigilancia armada.' },
  { level: 5, name: 'Clase V - Riesgo Máximo', rate: 6.960, examples: 'Minería subterránea, construcción civil pesada, manejo de explosivos, trabajo en alturas/líneas de alta tensión.' },
];

export const CONTRACT_TYPES: ContractTypeInfo[] = [
  {
    id: 'termino-fijo',
    name: 'Contrato de Trabajo a Término Fijo',
    cstArticle: 'Artículo 46 del Código Sustantivo del Trabajo (CST)',
    duration: 'Duración determinada desde 1 día hasta un máximo de 3 años, renovable indefinidamente.',
    formality: 'Debe constar SIEMPRE por escrito. Si es verbal, la ley presume que es a término indefinido.',
    probationPeriod: 'Máximo la quinta parte (1/5) del término pactado, sin superar en ningún caso los dos (2) meses.',
    advanceNotice: 'Preaviso por escrito no inferior a 30 días calendario previos al vencimiento. Si no se preavisa, se renueva automáticamente.',
    indemnity: 'El valor de los salarios correspondientes al tiempo que faltare para cumplir el plazo estipulado del contrato (Art. 64 CST).',
    useCases: [
      'Proyectos con fecha de culminación específica menor o igual a 3 años.',
      'Reemplazos transitorios por licencias de maternidad, paternidad o incapacidades médicas.',
      'Temporadas altas comerciales o picos cíclicos de producción en fábricas.',
      'Períodos de prueba operativa para cargos de nueva creación.',
    ],
    keyRules: [
      'Si el término fijo es menor a un (1) año, solo podrá prorrogarse sucesivamente hasta por tres (3) períodos iguales o menores.',
      'Al vencimiento del tercer período inferior a 1 año, la siguiente renovación será obligatoriamente por mínimo un (1) año completo.',
      'El trabajador a término fijo tiene derecho al pago proporcional de todas las prestaciones sociales y vacaciones.',
    ],
    pros: ['Seguridad en el horizonte temporal para el empleador.', 'Planificación presupuestal exacta.'],
    cons: ['Riesgo de renovación involuntaria si se olvida la notificación de 30 días.', 'Rigidez ante imprevistos.'],
    category: 'direct',
  },
  {
    id: 'termino-indefinido',
    name: 'Contrato de Trabajo a Término Indefinido',
    cstArticle: 'Artículo 47 del Código Sustantivo del Trabajo (CST)',
    duration: 'Sin límite temporal prefijado. Tiene vigencia mientras subsistan las causas que le dieron origen y la materia del trabajo.',
    formality: 'Puede celebrarse verbalmente o por escrito (se recomienda siempre escrito para fijar salario y funciones).',
    probationPeriod: 'Hasta dos (2) meses calendario como límite legal máximo.',
    advanceNotice: 'El trabajador no requiere preaviso legal para renunciar. El empleador solo puede terminarlo con justa causa comprobada o pagando indemnización legal.',
    indemnity: 'Para salarios < 10 SMMLV: 30 días por el primer año + 20 días por año subsiguiente. Para salarios >= 10 SMMLV: 20 días primer año + 15 días subsiguientes.',
    useCases: [
      'Cargos estratégicos, directivos o misionales de permanencia constante en la organización.',
      'Plantas de personal permanente para empresas con operación continua.',
      'Puestos donde se requiere fidelización del talento, retención del conocimiento y plan de carrera.',
    ],
    keyRules: [
      'Es la forma contractual preferida y privilegiada por la Constitución y la doctrina laboral colombiana.',
      'Garantiza estabilidad laboral reforzada en caso de fuero sindical, maternidad, salud o pre-pensionados.',
    ],
    pros: ['Mayor fidelización y compromiso del empleado.', 'Menor rotación de personal y reducción de costos de onboarding.'],
    cons: ['Mayor costo de indemnización en despidos injustificados prolongados.'],
    category: 'direct',
  },
  {
    id: 'obra-labor',
    name: 'Contrato por Obra o Labor Determinada',
    cstArticle: 'Artículo 45 del Código Sustantivo del Trabajo (CST)',
    duration: 'El contrato dura exactamente lo que tarde en ejecutarse y culminarse la obra o labor encomendada.',
    formality: 'Debe constar rigurosamente por escrito detallando la obra concreta a ejecutar para evitar desnaturalización.',
    probationPeriod: 'Máximo la quinta parte del tiempo estimado de la labor, sin exceder dos (2) meses.',
    advanceNotice: 'No exige preaviso de 30 días, pero sí notificación formal de la terminación de la fase o hito convenido.',
    indemnity: 'El valor de los salarios que faltaren para la culminación total de la obra, el cual en ningún caso podrá ser inferior a quince (15) días de salario.',
    useCases: [
      'Construcción y obras civiles: maestros de obra, soldadores, electricistas asignados a la Torre A.',
      'Desarrollo de software por sprint o entregables de implementación técnica específicos.',
      'Cosechas agrícolas, vendimias o recolección de café estacional.',
      'Campañas publicitarias, auditorías externas puntuales o censos poblacionales.',
    ],
    keyRules: [
      'NO admite prórrogas: si se le asignan nuevas obras o proyectos continuos, el contrato se convierte en término indefinido.',
      'Da derecho a liquidación integral de prestaciones sociales por el tiempo laborado.',
    ],
    pros: ['Alineación perfecta entre el costo laboral y la facturación del proyecto.', 'Flexibilidad de cierre al entregar la obra.'],
    cons: ['Si la labor no está claramente delimitada por escrito, los jueces lo reclasifican como indefinido.'],
    category: 'direct',
  },
  {
    id: 'aprendizaje-sena',
    name: 'Contrato de Aprendizaje Laboral Especial (Decreto 0223 de 2026 y Ley 2466)',
    cstArticle: 'Artículo 81 del CST (Ley 2466 de 2025) y Decreto 0223 del 5 de marzo de 2026 (MinTrabajo)',
    duration: 'Duración del programa de formación según el diseño curricular, sin exceder un límite de tres (3) años.',
    formality: 'Contrato de trabajo laboral especial a término fijo celebrado por escrito en formato oficialmente avalado por el SENA.',
    probationPeriod: 'Por su finalidad esencialmente formativa y educativa, NO admite período de prueba (Decreto 0223 de 2026).',
    advanceNotice: 'Terminación por culminación del programa lectivo/productivo o faltas gravísimas estipuladas en el reglamento del aprendíz.',
    indemnity: 'Al ser un contrato laboral especial a término fijo, la terminación unilateral e injustificada por el empleador genera indemnización de salarios restantes (Art. 64 CST).',
    useCases: [
      'Estudiantes y aprendices del SENA de programas técnicos, tecnológicos, operarios y auxiliares.',
      'Estudiantes de educación superior y técnicos universitarios en semestre de práctica obligatoria.',
      'Cumplimiento de la cuota obligatoria legal de aprendices regulada y sancionada por el Ministerio del Trabajo.',
    ],
    keyRules: [
      'Naturaleza Laboral Especial: Por la Ley 2466 y Decreto 0223 de 2026, el contrato de aprendizaje adquiere carácter de contrato de trabajo laboral especial a término fijo.',
      'Etapa Lectiva (Teórica): Apoyo de sostenimiento de al menos el 75% del SMMLV ($1.313.179 COP) + Afiliación a Salud (EPS) y Riesgos Laborales (ARL) a cargo de la empresa patrocinadora.',
      'Etapa Productiva (Práctica): Apoyo de sostenimiento del 100% del SMMLV ($1.750.905 COP) + Afiliación a Seguridad Social Integral (Salud, Pensión y ARL) + Pago completo de Prestaciones Sociales de Ley (Prima, Cesantías, Intereses y Vacaciones).',
      'Derechos Colectivos: Se garantizan plenamente la libertad de asociación, fuero sindical y estabilidad laboral reforzada.',
    ],
    pros: ['Plena seguridad jurídica y protección laboral para los aprendices en Colombia.', 'Acceso a seguridad social integral y liquidación prestacional durante la etapa productiva.'],
    cons: ['Requiere que las empresas presupuesten aportes a pensión y prestaciones sociales durante la etapa práctica.'],
    category: 'special',
  },
  {
    id: 'ocasional-transitorio',
    name: 'Contrato Ocasional, Accidental o Transitorio',
    cstArticle: 'Artículo 6 del Código Sustantivo del Trabajo (CST)',
    duration: 'Corta duración, no mayor de un (1) mes.',
    formality: 'Puede ser verbal o escrito (se aconseja escrito para delimitar la labor ajena al giro ordinario).',
    probationPeriod: 'No aplica debido a su brevedad temporal.',
    advanceNotice: 'Termina automáticamente al cumplirse el término de hasta 30 días pactado.',
    indemnity: 'Salarios restantes hasta completar el mes pactado.',
    useCases: [
      'Reparaciones locativas imprevistas en la sede de la empresa.',
      'Adecuación eléctrica o de redes ante una contingencia.',
      'Pintura o remodelación extraordinaria de oficinas.',
      'Inventario extraordinario anual contratando digitadores de apoyo por 10 días.',
    ],
    keyRules: [
      'Las labores deben ser EXTRAÑAS e independientes al giro ordinario o actividad principal del negocio.',
      'Por mandato de la Corte Constitucional (Sentencia C-825 de 2006), el trabajador ocasional tiene derecho a TODAS las prestaciones sociales proporcionales a los días trabajados.',
    ],
    pros: ['Solución ágil para eventos fortuitos y no recurrentes sin compromisos a largo plazo.'],
    cons: ['Si la labor es del giro habitual de la empresa, no es válida esta figura y se desnaturaliza.'],
    category: 'direct',
  },
  {
    id: 'prestacion-servicios',
    name: 'Contrato de Prestación de Servicios (Civil / Comercial)',
    cstArticle: 'Código Civil (Art. 2053) y Código de Comercio (NO es laboral ni se rige por el CST)',
    duration: 'Pactada libremente entre las partes (por honorarios, producto o cronograma).',
    formality: 'Contrato civil/comercial escrito con cláusulas de autonomía e independencia técnica y financiera.',
    probationPeriod: 'No aplica.',
    advanceNotice: 'Pactado según cláusula penal o terminación anticipada contractual civil.',
    indemnity: 'Cláusula penal o indemnización por daños y perjuicios de naturaleza civil demostrada ante un juez.',
    useCases: [
      'Asesorías jurídicas, tributarias o contables externas de profesionales independientes.',
      'Diseñadores, fotógrafos o programadores que prestan servicios con sus propios equipos y horarios.',
      'Médicos especialistas o peritos técnicos independientes.',
    ],
    keyRules: [
      'Autonomía total: NO puede existir subordinación, cumplimiento estricto de horario ni órdenes continuas.',
      'El contratista paga el 100% de su propia seguridad social (Salud 12.5%, Pensión 16% sobre un IBC del 40% del valor mensual).',
      'Si se comprueban los 3 elementos del Art. 23 CST (Actividad personal + Subordinación + Retribución), opera el "Principio de Primacía de la Realidad" (Art. 53 CN) y se condena a la empresa al pago retroactivo de toda la nómina, cesantías y sanciones moratorias del Art. 65 CST.',
    ],
    pros: ['Autonomía para el contratista y sin carga prestacional directa para el contratante.'],
    cons: ['Alto riesgo de demandas laborales millonarias por simulación ("contrato realidad").'],
    category: 'independent',
  },
];

export const CST_SALARY_ARTICLES: CSTArticle[] = [
  {
    article: 'Art. 127',
    title: 'Elementos Integrantes del Salario',
    summary: 'Todo lo que recibe el trabajador en dinero o en especie como contraprestación directa del servicio prestado.',
    fullText: 'Constituye salario no sólo la remuneración ordinaria, fija o variable, sino todo lo que recibe el trabajador en dinero o en especie como contraprestación directa del servicio, sea cualquiera la forma o denominación que se adopte, como primas, sobresueldos, bonificaciones habituales, valor del trabajo suplementario o de las horas extras, valor del trabajo en días de descanso obligatorio, porcentajes sobre ventas y comisiones.',
    isSalary: true,
    practicalExample: 'Las comisiones mensuales por cumplimiento de metas y las horas extras nocturnas constituyen salario pleno: se suman a la base de cotización de seguridad social, parafiscales, cesantías, prima y vacaciones.',
    impactOnPayroll: 'Base para aportes a Salud, Pensión, ARL, Parafiscales, Cesantías, Prima de Servicios y Vacaciones.',
  },
  {
    article: 'Art. 128',
    title: 'Pagos que NO Constituyen Salario',
    summary: 'Sumas ocasionales por mera liberalidad, prestaciones de ley y auxilios acordados como no salariales (con límite del 40%).',
    fullText: 'No constituyen salario las sumas que ocasionalmente y por mera liberalidad recibe el trabajador del empleador, como primas, bonificaciones o gratificaciones ocasionales, participación de utilidades, excedentes de las empresas de economía solidaria y lo que recibe en dinero o en especie no para su beneficio, ni para enriquecer su patrimonio, sino para desempeñar a cabalidad sus funciones, como gastos de representación, medios de transporte, elementos de trabajo y otros semejantes. Tampoco las prestaciones sociales de que tratan los títulos VIII y IX, ni los auxilios o beneficios habituales u ocasionales acordados expresamente como no constitutivos de salario.',
    isSalary: false,
    practicalExample: 'Un bono otorgado por una sola vez al año por el aniversario de la empresa, o el auxilio de alimentación pactado expresamente como NO salarial mediante otrosí escrito.',
    impactOnPayroll: 'No liquida prestaciones sociales ni parafiscales. ¡Atención! Por la Ley 1393 de 2010 Art. 30, si superan el 40% de la remuneración total, el exceso SÍ cotiza a seguridad social.',
  },
  {
    article: 'Art. 129',
    title: 'Salario en Especie',
    summary: 'Remuneración mediante alimentación, habitación o vestuario. Límite máximo: 30% si devenga el SMMLV y hasta 50% si gana más.',
    fullText: 'Constituye salario en especie toda aquella parte de la remuneración ordinaria y permanente que reciba el trabajador como contraprestación directa del servicio, tales como la alimentación, habitación o vestuario que el empleador suministra. Si el trabajador devenga el salario mínimo legal, el valor por concepto de salario en especie no podrá exceder del treinta por ciento (30%). Si devenga más, no podrá exceder del cincuenta por ciento (50%).',
    isSalary: true,
    practicalExample: 'A un mayordomo de finca con salario de $1.750.905 (1 SMMLV 2026), se le puede remunerar en especie con vivienda y alimentación hasta un máximo del 30% ($525.272) y el 70% restante ($1.225.633) debe pagarse obligatoriamente en dinero efectivo.',
    impactOnPayroll: 'El valor fijado en especie computa en su totalidad para el cálculo de prestaciones sociales e indemnizaciones.',
  },
  {
    article: 'Art. 130',
    title: 'Viáticos (Permanentes vs. Accidentales)',
    summary: 'Los permanentes en manutención y alojamiento son salario; los accidentales y de transporte nunca son salario.',
    fullText: 'Los viáticos permanentes constituyen salario en aquella parte destinada a proporcionar al trabajador manutención y alojamiento; pero no en lo que sólo tenga por finalidad proporcionar los medios de transporte o los gastos de representación. Los viáticos accidentales no constituyen salario en ningún caso. Son viáticos accidentales aquéllos que sólo se dan con motivo de un requerimiento extraordinario, no habitual o poco frecuente.',
    isSalary: 'mixed',
    practicalExample: 'Un asesor comercial que viaja todos los meses a Medellín: el dinero girado para sus hoteles y comidas es viático permanente y constituye salario. El dinero para pasajes aéreos o taxis es medio de transporte y no es salario.',
    impactOnPayroll: 'La empresa debe discriminar contablemente en cada comprobante qué valor corresponde a manutención y alojamiento y cuál a transporte.',
  },
  {
    article: 'Art. 131',
    title: 'Propinas',
    summary: 'Las propinas que recibe el trabajador NO constituyen salario ni pueden ser retenidas ni compensar el sueldo básico.',
    fullText: 'Las propinas que recibe el trabajador no constituyen salario. No puede pactarse como retribución del servicio prestado por el trabajador lo que éste reciba por propinas.',
    isSalary: false,
    practicalExample: 'En un restaurante, un mesero recibe propinas voluntarias de los clientes. El empleador no puede pagarle menos del SMMLV argumentando que con las propinas ya completa el sueldo.',
    impactOnPayroll: 'No hacen base para ninguna prestación, parafiscal ni seguridad social. Pertenecen exclusivamente al trabajador.',
  },
  {
    article: 'Art. 132',
    title: 'Formas y Libertad de Estipulación (Salario Integral)',
    summary: 'Libertad de pactar salario fijo o variable, y salario integral para quienes ganen al menos 10 SMMLV + 30% prestacional.',
    fullText: 'El empleador y el trabajador pueden convenir libremente el salario en sus diversas modalidades. En ningún caso devengará un salario inferior al mínimo legal. Cuando el trabajador devengue un salario ordinario superior a diez (10) salarios mínimos legales mensuales, valdrá la estipulación de que dicho salario compense de antemano el valor de prestaciones, recargos y beneficios, más un factor prestacional que no podrá ser inferior al treinta por ciento (30%). Para 2026, el salario integral mínimo es de 13 SMMLV ($22.761.765 COP).',
    isSalary: true,
    practicalExample: 'Un director de tecnología con salario integral de $20.000.000: no recibe prima ni cesantías semestrales pues ya están compensadas mensualmente. Sus vacaciones se liquidan normalmente y su cotización a seguridad social se hace sobre el 70% del valor total ($14.000.000).',
    impactOnPayroll: 'Compensa primas, cesantías e intereses. NO compensa vacaciones (las vacaciones se disfrutan o liquidan por ley). Cotiza seguridad social sobre el 70%.',
  },
  {
    article: 'Art. 133',
    title: 'Jornal y Sueldo',
    summary: 'Jornal es el salario fijado por días; Sueldo es el salario convenido por períodos mayores (semanal, quincenal, mensual).',
    fullText: 'Se denomina jornal el salario estipulado por días, y sueldo el estipulado por períodos mayores.',
    isSalary: true,
    practicalExample: 'Un recolector agrícola que gana $55.000 por jornada diaria devenga un jornal; un auxiliar contable que devenga $1.500.000 mensual devenga un sueldo.',
    impactOnPayroll: 'Define la unidad de liquidación temporal y base para horas extras.',
  },
  {
    article: 'Art. 134',
    title: 'Períodos de Pago',
    summary: 'El salario debe pagarse por períodos iguales y vencidos. El jornal no puede superar una semana y el sueldo un mes.',
    fullText: 'El salario en dinero debe pagarse por períodos iguales y vencidos, en moneda legal. El período de pago para los jornales no puede ser mayor de una semana, y para sueldos no mayor de un mes.',
    isSalary: true,
    practicalExample: 'Una empresa no puede retener el sueldo para pagar cada dos meses; la periodicidad máxima por ley es mensual (comúnmente se paga quincenal los 15 y 30 de cada mes).',
    impactOnPayroll: 'Exige corte estricto de novedades de nómina para liquidación quincenal o mensual.',
  },
  {
    article: 'Art. 138 a 142',
    title: 'Lugar de Pago, Descuentos Prohibidos y Embargos',
    summary: 'Prohibición de trueque, protección contra retenciones ilegales e inembargabilidad del salario mínimo excepto por cooperativas y alimentos.',
    fullText: 'Art 138: Pago en el lugar donde presta el servicio o cuenta bancaria. Art 139: Prohibición de trueque o pago en vales o pagarés. Art 140: Salario sin prestación del servicio por culpa o disposición del empleador. Art 141: Salarios y prestaciones básicos e inembargables. Art 142: Irrenunciabilidad del salario y prohibición de cederlo. El SMMLV es inembargable por deudas ordinarias de bancos o tarjetas; únicamente puede embargarse hasta en un 50% por créditos con cooperativas autorizadas o por demandas de cuota de alimentos (Art. 156 CST).',
    isSalary: false,
    practicalExample: 'Si un auxiliar gana 1 SMMLV ($1.750.905) y tiene un pagaré con un banco comercial, el juez no puede embargar su sueldo. Pero si tiene demanda de alimentos para sus hijos, el juez de familia puede ordenar embargar hasta el 50% ($875.453).',
    impactOnPayroll: 'El departamento de nómina no puede aplicar ningún descuento sin autorización expresa y firmada del trabajador, salvo orden judicial de alimentos o cooperativa.',
  },
];

export const CONTRIBUTION_RATES_2026: ContributionRate[] = [
  {
    concept: 'Salud (EPS)',
    category: 'security',
    totalRate: 12.5,
    employeeRate: 4.0,
    employerRate: 8.5,
    lawReference: 'Ley 100 de 1993, Art. 204 y Ley 1122 de 2007',
    exemptionApplies: true, // Art. 114-1 ET
    description: 'Cubre contingencias de enfermedad general, atención médica, medicamentos e incapacidades temporales.',
    calculationBase: 'IBC (Ingreso Base de Cotización: Salario devengado sin incluir auxilio de transporte).',
  },
  {
    concept: 'Pensión (Colpensiones o Fondos Privados)',
    category: 'security',
    totalRate: 16.0,
    employeeRate: 4.0,
    employerRate: 12.0,
    lawReference: 'Ley 100 de 1993, Art. 20 y Ley 797 de 2003',
    exemptionApplies: false, // NUNCA se exonera
    description: 'Protege las contingencias de vejez, invalidez y muerte (pensión de sobrevivientes) para el trabajador y su núcleo familiar.',
    calculationBase: 'IBC (Salario devengado sin auxilio de transporte). Trabajadores que devenguen >= 4 SMMLV aportan 1% adicional al Fondo de Solidaridad Pensional (FSP).',
  },
  {
    concept: 'Riesgos Laborales (ARL)',
    category: 'security',
    totalRate: 0.522, // Depende de la clase (0.522% a 6.960%)
    employeeRate: 0.0,
    employerRate: 0.522,
    lawReference: 'Decreto 1295 de 1994 y Ley 1562 de 2012',
    exemptionApplies: false,
    description: 'Cubre accidentes de trabajo y enfermedades laborales (ATEL). El 100% es asumido por la empresa según la clase de riesgo de la actividad.',
    calculationBase: 'IBC (Salario devengado sin auxilio de transporte). Varía según la clase de riesgo (I: 0.522% hasta V: 6.960%).',
  },
  {
    concept: 'Caja de Compensación Familiar (CCF)',
    category: 'parafiscal',
    totalRate: 4.0,
    employeeRate: 0.0,
    employerRate: 4.0,
    lawReference: 'Ley 21 de 1982 y Ley 789 de 2002',
    exemptionApplies: false, // NUNCA se exonera
    description: 'Otorga subsidio familiar monetario, recreación, turismo social, créditos y subsidio de vivienda a trabajadores de menores ingresos.',
    calculationBase: 'Total devengado salarial de la nómina mensual (sin auxilio de transporte).',
  },
  {
    concept: 'Servicio Nacional de Aprendizaje (SENA)',
    category: 'parafiscal',
    totalRate: 2.0,
    employeeRate: 0.0,
    employerRate: 2.0,
    lawReference: 'Ley 21 de 1982 y Ley 119 de 1994',
    exemptionApplies: true, // Exonerable Art. 114-1 ET
    description: 'Financia la formación técnica y tecnológica gratuita para millones de colombianos y aprendices productivos.',
    calculationBase: 'Total devengado salarial. Sociedades exentas si el trabajador devenga individualmente menos de 10 SMMLV.',
  },
  {
    concept: 'Instituto Colombiano de Bienestar Familiar (ICBF)',
    category: 'parafiscal',
    totalRate: 3.0,
    employeeRate: 0.0,
    employerRate: 3.0,
    lawReference: 'Ley 89 de 1988 y Ley 7 de 1979',
    exemptionApplies: true, // Exonerable Art. 114-1 ET
    description: 'Protege a la niñez, primera infancia, madres comunitarias y programas de nutrición y bienestar infantil.',
    calculationBase: 'Total devengado salarial. Exonerable si la empresa cumple requisitos del Art. 114-1 del E.T.',
  },
];

export const MATH_EXERCISES_DATA: MathExercise[] = [
  {
    id: 'caso-1-smmlv',
    title: 'Ejercicio 1: Trabajador con 1 SMMLV Exacto 2026',
    badge: '1 SMMLV Básico',
    description: 'Auxiliar de servicios generales devengando el Salario Mínimo Legal Vigente para Colombia en 2026 ($1.750.905) con derecho a Auxilio de Transporte ($249.095). Empresa con exoneración tributaria (Art. 114-1 E.T.) y riesgo ARL Clase I.',
    employeeProfile: {
      name: 'Carlos Andrés Gómez',
      role: 'Auxiliar Operativo',
      baseSalary: 1750905,
      daysWorked: 30,
      overtimeHoursDiurna: 0,
      commissions: 0,
      nonSalaryAid: 0,
      hasTransportAllowance: true,
      riskClass: 1,
      isExemptEmployer: true,
    },
    explanation: 'El caso fundamental de la legislación colombiana. El auxilio de transporte se suma para liquidar Cesantías y Prima de Servicios, pero NO hace base para Seguridad Social ni para Vacaciones.',
  },
  {
    id: 'caso-2-smmlv-comisiones',
    title: 'Ejercicio 2: Asesor Comercial con 2 SMMLV + Horas Extras',
    badge: '2 SMMLV + Extras',
    description: 'Asesor comercial que devenga 2 SMMLV ($3.501.810) más 10 horas extras diurnas y comisiones de ventas habituales por $300.000. Al superar los 2 SMMLV en básico, no tiene derecho a auxilio de transporte legal.',
    employeeProfile: {
      name: 'Laura María Valencia',
      role: 'Ejecutiva de Cuentas',
      baseSalary: 3501810,
      daysWorked: 30,
      overtimeHoursDiurna: 10,
      commissions: 300000,
      nonSalaryAid: 150000,
      hasTransportAllowance: false,
      riskClass: 2,
      isExemptEmployer: true,
    },
    explanation: 'Al superar los 2 SMMLV pierde el auxilio de transporte legal. Las comisiones y horas extras constituyen salario pleno (Art. 127 CST) y elevan tanto las prestaciones como los aportes a seguridad social.',
  },
  {
    id: 'caso-3-mando-medio',
    title: 'Ejercicio 3: Ingeniero de Planta con 5 SMMLV y ARL Clase III',
    badge: '5 SMMLV + Fondo Solidaridad',
    description: 'Ingeniero supervisor de producción devengando $8.754.525 (5 SMMLV). Por superar los 4 SMMLV, aporta obligatoriamente un 1.0% adicional al Fondo de Solidaridad Pensional (FSP). Empresa en sector químico industrial (ARL Clase III: 2.436%).',
    employeeProfile: {
      name: 'Ing. Rodrigo Mendoza',
      role: 'Supervisor de Planta Química',
      baseSalary: 8754525,
      daysWorked: 30,
      overtimeHoursDiurna: 0,
      commissions: 0,
      nonSalaryAid: 400000,
      hasTransportAllowance: false,
      riskClass: 3,
      isExemptEmployer: true,
    },
    explanation: 'A partir de 4 SMMLV se activa la deducción de la subcuenta de solidaridad pensional (1.0% a cargo del trabajador). Además, la ARL Clase III representa una mayor carga protectora asumida 100% por el empleador.',
  },
];
