import React, { useState } from 'react';
import { CONTRIBUTION_RATES_2026, ARL_RISK_CLASSES, LEGAL_CONSTANTS_2026 } from '../constants/colombia2026';
import { formatCOP } from '../utils/payrollCalculator';
import { 
  ShieldCheck, 
  Users, 
  Building, 
  Percent, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  TrendingDown,
  Layers,
  ArrowRight,
  CheckSquare,
  Award,
  RotateCcw,
  Send,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MODULE3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el porcentaje total de aporte al Sistema General de Seguridad Social en Salud en Colombia y cómo se distribuye entre trabajador y empleador (sin exoneración)?",
    options: [
      "12.5% total: 4.0% trabajador y 8.5% empleador",
      "16.0% total: 4.0% trabajador y 12.0% empleador",
      "12.5% total: 6.25% trabajador y 6.25% empleador",
      "9.0% total: 4.0% trabajador y 5.0% empleador"
    ],
    correctIndex: 0,
    explanation: "Conforme a la Ley 100 de 1993 (Art. 204), la cotización a Salud es del 12.5% sobre el IBC, donde el trabajador aporta el 4% mediante deducción de nómina y el empleador asume el 8.5% (salvo cuando aplica la exoneración fiscal del Art. 114-1 del E.T.)."
  },
  {
    id: 2,
    question: "¿Cuál es la tarifa total del aporte al Sistema General de Pensiones y su respectiva distribución entre las partes?",
    options: [
      "12.0% total: 4.0% trabajador y 8.0% empleador",
      "16.0% total: 4.0% trabajador y 12.0% empleador",
      "16.0% total: 8.0% trabajador y 8.0% empleador",
      "14.0% total: 5.0% trabajador y 9.0% empleador"
    ],
    correctIndex: 1,
    explanation: "De acuerdo con la Ley 797 de 2003, la tarifa total de aportes al Sistema General de Pensiones es del 16.0% del IBC, dividida en 4.0% a cargo del empleado y 12.0% a cargo de la empresa."
  },
  {
    id: 3,
    question: "¿A partir de qué nivel de ingresos mensuales es obligatorio efectuar el descuento adicional para el Fondo de Solidaridad Pensional (FSP)?",
    options: [
      "A partir de 2 SMMLV",
      "A partir de 10 SMMLV",
      "A partir de 4 SMMLV",
      "A partir de 1 SMMLV"
    ],
    correctIndex: 2,
    explanation: "Según la Ley 100 de 1993 y Ley 797 de 2003, todo trabajador con un IBC igual o superior a 4 SMMLV aporta obligatoriamente un 1.0% adicional (que incrementa progresivamente hasta 2.0% para altos ingresos) al Fondo de Solidaridad Pensional."
  },
  {
    id: 4,
    question: "¿Quién debe asumir el pago total de la cotización al Sistema General de Riesgos Laborales (ARL) en un contrato laboral ordinario?",
    options: [
      "50% el trabajador y 50% el empleador",
      "El trabajador mediante descuento automático en nómina",
      "El Estado mediante subsidio parafiscal",
      "El empleador en un 100%"
    ],
    correctIndex: 3,
    explanation: "Bajo el Decreto Ley 1295 de 1994, el valor total de las cotizaciones al Sistema General de Riesgos Laborales (ARL) es de la exclusiva responsabilidad y cargo del empleador. Está prohibido realizar deducciones al trabajador."
  },
  {
    id: 5,
    question: "¿Cuáles son las tarifas mínima y máxima de cotización a la ARL según la clasificación de riesgo (Clases I a V)?",
    options: [
      "Desde 0.522% (Clase I) hasta 6.960% (Clase V)",
      "Desde 1.000% (Clase I) hasta 10.000% (Clase V)",
      "Desde 0.350% (Clase I) hasta 4.350% (Clase V)",
      "Tarifa única del 2.500% para todas las empresas"
    ],
    correctIndex: 0,
    explanation: "El Decreto 1772 de 1994 rige las tarifas ARL por clase de riesgo: Clase I (financiero/oficina) 0.522%, Clase II 1.044%, Clase III 2.436%, Clase IV 4.350% y Clase V (alto riesgo: minería/construcción) 6.960%."
  },
  {
    id: 6,
    question: "Bajo el artículo 114-1 del Estatuto Tributario, ¿de qué aportes patronales están exoneradas las empresas declarantes de renta por colaboradores con sueldos inferiores a 10 SMMLV?",
    options: [
      "Pensión, ARL y Caja de Compensación Familiar",
      "Salud patronal (8.5%), SENA (2.0%) e ICBF (3.0%)",
      "Fondo de Solidaridad Pensional y Auxilio de Transporte",
      "Exclusivamente del aporte patronal a SENA (2.0%)"
    ],
    correctIndex: 1,
    explanation: "El Art. 114-1 del E.T. liberó a las empresas contribuyentes del impuesto sobre la renta del pago del 8.5% a Salud patronal, 2% a SENA y 3% a ICBF por trabajadores que ganen individualmente menos de 10 SMMLV."
  },
  {
    id: 7,
    question: "¿Cuál de los siguientes aportes parafiscales NUNCA puede ser objeto de exoneración fiscal y la empresa debe pagarlo obligatoriamente (4.0%)?",
    options: [
      "Aporte al SENA",
      "Aporte al ICBF",
      "Caja de Compensación Familiar (CCF)",
      "Salud a cargo del empleador"
    ],
    correctIndex: 2,
    explanation: "El aporte del 4% a las Cajas de Compensación Familiar (CCF) regulado por la Ley 21 de 1982 es inamovible y debe ser cancelado por el 100% de las empresas, sin importar su régimen tributario ni el salario de los empleados."
  },
  {
    id: 8,
    question: "¿Cuál es el límite mínimo del Ingreso Base de Cotización (IBC) para liquidar la Seguridad Social en Colombia para jornadas ordinarias?",
    options: [
      "Medio Salario Mínimo Mensual (0.5 SMMLV)",
      "Un Salario Mínimo Mensual Legal Vigente (1 SMMLV)",
      "No existe ningún piso o límite mínimo",
      "Dos Salarios Mínimos Mensuales (2 SMMLV)"
    ],
    correctIndex: 1,
    explanation: "En Colombia (Art. 53 Constitucional y Ley 100 de 1993), el piso mínimo del IBC para trabajadores dependientes a jornada completa nunca puede ser inferior a 1 SMMLV ($1.750.905 en 2026)."
  },
  {
    id: 9,
    question: "¿Qué ocurre con la exoneración del Art. 114-1 del E.T. si en un mes un trabajador supera los 10 SMMLV debido a horas extras o recargos?",
    options: [
      "La empresa pierde el beneficio para toda la plantilla de trabajadores",
      "La empresa pierde la exoneración únicamente para ese trabajador en ese mes específico, debiendo asumir Salud (8.5%), SENA (2%) e ICBF (3%) por él",
      "Se genera automáticamente una infracción ante la UGPP",
      "El trabajador debe pagar el valor de los parafiscales de su salario"
    ],
    correctIndex: 1,
    explanation: "El requisito de los 10 SMMLV se evalúa de forma individual y mensual por empleado. Si supera el umbral en un mes determinado, la empresa deberá liquidar y pagar el 100% de Salud patronal, SENA e ICBF por dicho trabajador en esa planilla."
  },
  {
    id: 10,
    question: "¿Cuál es la entidad pública de orden nacional encargada de auditar, controlar el pago exacto y sancionar la evasión de Seguridad Social y Parafiscales?",
    options: [
      "DIAN (Dirección de Impuestos y Aduanas Nacionales)",
      "UGPP (Unidad de Gestión Pensional y Parafiscales)",
      "Superintendencia Financiera de Colombia",
      "Ministerio de Hacienda y Crédito Público"
    ],
    correctIndex: 1,
    explanation: "La UGPP (Unidad de Gestión Pensional y Parafiscales) es la autoridad adscrita al Ministerio de Hacienda encargada del seguimiento, fiscalización, cobro persuasivo/coactivo y sanción por inexactitud u omisión en la PILA."
  }
];

export const Module3SocialSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rates' | 'parafiscales' | 'exemption' | 'simulator' | 'test10'>('rates');

  // Estados para el Simulador de Aportes
  const [simSalary, setSimSalary] = useState<number>(LEGAL_CONSTANTS_2026.SMMLV);
  const [isExemptEmployer, setIsExemptEmployer] = useState<boolean>(true);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<number>(1);

  // Estados para la Prueba de Conocimientos (10 Preguntas)
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testValidationError, setTestValidationError] = useState<string | null>(null);

  // Validación salario >= 1 SMMLV 2026
  const validSalary = Math.max(LEGAL_CONSTANTS_2026.SMMLV, simSalary);

  // Cálculos del simulador
  const isUnder10SMMLV = validSalary < LEGAL_CONSTANTS_2026.SMMLV * 10;
  const appliesExemption = isExemptEmployer && isUnder10SMMLV;

  // Trabajador
  const empHealth = validSalary * 0.04;
  const empPension = validSalary * 0.04;
  
  // FSP (Fondo de Solidaridad Pensional)
  let fspRate = 0;
  if (validSalary >= LEGAL_CONSTANTS_2026.SMMLV * 4) {
    fspRate = 0.01;
  }
  const empFsp = validSalary * fspRate;
  const totalEmployeeContributions = empHealth + empPension + empFsp;

  // Empleador
  const selectedARL = ARL_RISK_CLASSES.find((r) => r.level === selectedRiskLevel) || ARL_RISK_CLASSES[0];
  const employerHealth = appliesExemption ? 0 : validSalary * 0.085;
  const employerPension = validSalary * 0.12;
  const employerARL = (validSalary * selectedARL.rate) / 100;

  // Parafiscales
  const senaRate = appliesExemption ? 0 : 0.02;
  const icbfRate = appliesExemption ? 0 : 0.03;
  const ccfRate = 0.04;

  const employerSENA = validSalary * senaRate;
  const employerICBF = validSalary * icbfRate;
  const employerCCF = validSalary * ccfRate;

  const totalEmployerSecurity = employerHealth + employerPension + employerARL;
  const totalEmployerParafiscales = employerSENA + employerICBF + employerCCF;
  const grandTotalEmployerContributions = totalEmployerSecurity + totalEmployerParafiscales;

  // Manejadores para la Prueba
  const handleSelectTestOption = (questionId: number, optionIndex: number) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (testValidationError) setTestValidationError(null);
  };

  const handleSubmitTest = () => {
    if (Object.keys(testAnswers).length < MODULE3_TEST_QUESTIONS.length) {
      const remaining = MODULE3_TEST_QUESTIONS.length - Object.keys(testAnswers).length;
      setTestValidationError(`Has respondido ${Object.keys(testAnswers).length} de 10 preguntas. Te faltan ${remaining} por responder antes de enviar.`);
      return;
    }
    setTestValidationError(null);
    setTestSubmitted(true);
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestValidationError(null);
  };

  const calculateTestScore = () => {
    let score = 0;
    MODULE3_TEST_QUESTIONS.forEach((q) => {
      if (testAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const testScore = calculateTestScore();
  const testPercentage = Math.round((testScore / MODULE3_TEST_QUESTIONS.length) * 100);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              Módulo 3 • Régimen de Aportes en Colombia
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Seguridad Social y Aportes Parafiscales (Tarifas a 2026)
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
              Discriminación porcentual de aportes a cargo del trabajador y del empleador, régimen de riesgos laborales 
              ARL (Decreto 1295) y esquema de exoneración parafiscal (Art. 114-1 del Estatuto Tributario).
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              onClick={() => setActiveTab('rates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rates' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tarifas 2026
            </button>
            <button
              onClick={() => setActiveTab('parafiscales')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'parafiscales' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ¿Qué son Parafiscales?
            </button>
            <button
              onClick={() => setActiveTab('exemption')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'exemption' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exoneración Art. 114-1
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-[#39A900] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              Simulador de Aportes
            </button>
            <button
              onClick={() => setActiveTab('test10')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'test10'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Prueba Módulo 3 (10 Preguntas)
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: TARIFAS COMPARATIVAS OFICIALES 2026 */}
      {activeTab === 'rates' && (
        <div className="space-y-6">
          {/* Summary Box with Side-by-Side % split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box Trabajador */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Aportes del Trabajador</h3>
                    <p className="text-xs text-blue-300">Descontado mensualmente por nómina</p>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-cyan-300">
                  8.0% <span className="text-xs font-normal text-slate-300">(o +FSP)</span>
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Salud (EPS)</span>
                    <span className="text-[11px] text-blue-200">Ley 100 Art. 204</span>
                  </div>
                  <span className="font-black text-base text-cyan-300">4.0%</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Pensión (Colpensiones / Fondos)</span>
                    <span className="text-[11px] text-blue-200">Ley 100 Art. 20</span>
                  </div>
                  <span className="font-black text-base text-cyan-300">4.0%</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Fondo de Solidaridad Pensional (FSP)</span>
                    <span className="text-[11px] text-blue-200">Aplica para salarios ≥ 4 SMMLV</span>
                  </div>
                  <span className="font-black text-base text-amber-300">1.0% a 2.0%</span>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-slate-400">
                  <span className="font-medium">Riesgos Laborales (ARL) y Parafiscales</span>
                  <span className="font-bold text-slate-300">0.0% (Exento)</span>
                </div>
              </div>
            </div>

            {/* Box Empleador */}
            <div className="bg-gradient-to-br from-[#00324D] to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                    <Building className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Aportes del Empleador</h3>
                    <p className="text-xs text-emerald-300">Carga prestacional patronal completa</p>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  Hasta 29.96%
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Salud Patronal</span>
                    <span className="text-[11px] text-emerald-200">Exonerable Art. 114-1 E.T. (&lt;10 SMMLV)</span>
                  </div>
                  <span className="font-black text-base text-emerald-300">8.5% (o 0%)</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Pensión Patronal</span>
                    <span className="text-[11px] text-emerald-200">Obligatorio 100% de los casos</span>
                  </div>
                  <span className="font-black text-base text-emerald-300">12.0%</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Riesgos Laborales (ARL)</span>
                    <span className="text-[11px] text-emerald-200">Según Clase I a V (Decreto 1295)</span>
                  </div>
                  <span className="font-black text-base text-emerald-300">0.522% a 6.96%</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Parafiscales (CCF 4%, SENA 2%, ICBF 3%)</span>
                    <span className="text-[11px] text-emerald-200">SENA e ICBF exonerables (&lt;10 SMMLV)</span>
                  </div>
                  <span className="font-black text-base text-emerald-300">4.0% a 9.0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Table of All Concepts */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#39A900]" />
              Tabla Desglosada de Tarifas y Bases de Liquidación 2026
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3">Concepto</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3 text-center">Tarifa Total</th>
                    <th className="p-3 text-center bg-blue-50 text-blue-900">Trabajador</th>
                    <th className="p-3 text-center bg-emerald-50 text-[#00324D]">Empleador</th>
                    <th className="p-3">Exonerable (&lt;10 SMMLV)</th>
                    <th className="p-3">Base de Cálculo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONTRIBUTION_RATES_2026.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{r.concept}</td>
                      <td className="p-3 text-slate-600 font-medium">
                        {r.category === 'security' ? 'Seguridad Social' : 'Aporte Parafiscal'}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-800">
                        {r.concept.includes('ARL') ? '0.522% - 6.96%' : `${r.totalRate}%`}
                      </td>
                      <td className="p-3 text-center font-black bg-blue-50/50 text-blue-800">
                        {r.employeeRate > 0 ? `${r.employeeRate}%` : '0%'}
                      </td>
                      <td className="p-3 text-center font-black bg-emerald-50/50 text-emerald-800">
                        {r.concept.includes('ARL') ? '0.522% - 6.96%' : `${r.employerRate}%`}
                      </td>
                      <td className="p-3">
                        {r.exemptionApplies ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            SÍ (Art. 114-1 ET)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            NO (Inexonerable)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600 text-[11px] max-w-xs">{r.calculationBase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de Riesgos ARL */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              Tarifas del Sistema General de Riesgos Laborales (ARL) por Clase
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {ARL_RISK_CLASSES.map((r) => (
                <div key={r.level} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-emerald-800 mb-1">Clase {r.level}</div>
                  <div className="text-lg font-black text-slate-900">{r.rate}%</div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{r.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: QUÉ SON PARAFISCALES */}
      {activeTab === 'parafiscales' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card SENA */}
          <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg">
                Tarifa: 2.0%
              </span>
              <span className="text-xs text-slate-500 font-semibold">100% Empleador</span>
            </div>
            <h3 className="text-lg font-black text-[#00324D]">
              SENA (Servicio Nacional de Aprendizaje)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Creado por el Decreto 118 de 1957. Este aporte financia la formación profesional integral y técnica
              gratuita de millones de aprendices en Colombia, impulsando la empleabilidad, la innovación tecnológica
              y el desarrollo productivo del país.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
              <strong>Base de cálculo:</strong> Total de la nómina mensual devengada en salarios.
              Exonerable para personas jurídicas con empleados &lt; 10 SMMLV.
            </div>
          </div>

          {/* Card ICBF */}
          <div className="bg-white border-2 border-blue-500/30 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg">
                Tarifa: 3.0%
              </span>
              <span className="text-xs text-slate-500 font-semibold">100% Empleador</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              ICBF (Instituto Colombiano de Bienestar Familiar)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Creado por la Ley 75 de 1968. Financia los programas de prevención y protección integral de la primera
              infancia, niñez, adolescencia, comedores comunitarios y fortalecimiento de las familias colombianas en
              situación de vulnerabilidad.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
              <strong>Base de cálculo:</strong> Total de la nómina mensual salarial.
              Exonerable para personas jurídicas con colaboradores &lt; 10 SMMLV.
            </div>
          </div>

          {/* Card CCF */}
          <div className="bg-white border-2 border-amber-500/30 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
                Tarifa: 4.0%
              </span>
              <span className="text-xs text-rose-600 font-bold">¡Nunca Exonerable!</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Cajas de Compensación Familiar (CCF)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Reguladas por la Ley 21 de 1982. Otorgan el subsidio familiar monetario para hijos a cargo, subsidio de
              vivienda de interés social (VIS), recreación en parques temáticos, créditos de fomento y convenios de
              educación y turismo.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
              <strong>Base de cálculo:</strong> Total de pagos salariales.
              <strong> Ninguna empresa</strong> está exonerada de este aporte; es 100% obligatorio.
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: EXONERACIÓN ART. 114-1 ESTATUTO TRIBUTARIO */}
      {activeTab === 'exemption' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#39A900]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                Alivio Fiscal Corporativo
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Exoneración de Aportes Patronales (Art. 114-1 del E.T.)
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            La legislación tributaria en Colombia busca estimular la formalización laboral y la generación de empleo
            mediante la exoneración del pago de ciertos aportes a las sociedades y personas jurídicas declarantes del
            impuesto sobre la renta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-3">
              <h4 className="text-sm font-black text-[#00324D] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#39A900]" />
                ¿Qué aportes NO paga la empresa exonerada?
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span>Salud a cargo del empleador:</span>
                  <strong className="text-emerald-700">Ahorro del 8.5%</strong>
                </li>
                <li className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span>Aporte al SENA:</span>
                  <strong className="text-emerald-700">Ahorro del 2.0%</strong>
                </li>
                <li className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span>Aporte al ICBF:</span>
                  <strong className="text-emerald-700">Ahorro del 3.0%</strong>
                </li>
                <li className="flex items-center justify-between bg-[#00324D] text-white p-2.5 rounded-xl font-bold">
                  <span>Ahorro patronal total:</span>
                  <span className="text-emerald-300">13.5% sobre la nómina</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Requisitos y excepciones obligatorias
              </h4>
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong>Requisito Salarial:</strong> El beneficio aplica <em>individualmente</em> por cada trabajador que
                  devengue <strong>menos de diez (10) SMMLV</strong> ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV * 10)} en 2026).
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong>Si supera 10 SMMLV:</strong> La empresa debe pagar el 100% de Salud (8.5%), SENA (2%) e ICBF (3%)
                  por dicho colaborador.
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-rose-800 font-medium">
                  <strong>Inexonerables:</strong> Pensión (12%), ARL y Caja de Compensación (4%) se siguen pagando siempre.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: SIMULADOR DE APORTES EN VIVO */}
      {activeTab === 'simulator' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md uppercase">
              Calculadora de Aportes a Seguridad Social y Parafiscales
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Simulador con Tarifas Oficiales 2026
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ingresa un salario para observar el desglose exacto de aportes del empleado y de la empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controles de Entrada */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Salario Básico a Cotizar (IBC)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    min={LEGAL_CONSTANTS_2026.SMMLV}
                    step="50000"
                    value={simSalary}
                    onChange={(e) => setSimSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Mínimo 1 SMMLV 2026: {formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}</span>
                  <span>{(validSalary / LEGAL_CONSTANTS_2026.SMMLV).toFixed(1)} SMMLV</span>
                </div>
              </div>

              {/* Selector ARL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Clase de Riesgo ARL (Decreto 1295)
                </label>
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(Number(e.target.value))}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:border-[#39A900] focus:ring-1"
                >
                  {ARL_RISK_CLASSES.map((r) => (
                    <option key={r.level} value={r.level}>
                      Clase {r.level} ({r.rate}%) - {r.name.split('-')[1]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox Exoneración */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExemptEmployer}
                    onChange={(e) => setIsExemptEmployer(e.target.checked)}
                    className="w-4 h-4 text-[#39A900] rounded focus:ring-[#39A900]"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Aplicar Exoneración Art. 114-1 E.T.
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Exenta de Salud patronal, SENA e ICBF si devenga &lt; 10 SMMLV
                    </span>
                  </div>
                </label>
              </div>

              {/* Preajustes rápidos */}
              <div className="flex flex-wrap gap-2 text-xs pt-1">
                <button
                  onClick={() => setSimSalary(LEGAL_CONSTANTS_2026.SMMLV)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold cursor-pointer"
                >
                  1 SMMLV 2026
                </button>
                <button
                  onClick={() => setSimSalary(LEGAL_CONSTANTS_2026.SMMLV * 2)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-medium cursor-pointer"
                >
                  2 SMMLV
                </button>
                <button
                  onClick={() => setSimSalary(LEGAL_CONSTANTS_2026.SMMLV * 5)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-medium cursor-pointer"
                >
                  5 SMMLV (+FSP)
                </button>
              </div>
            </div>

            {/* Visualización de Resultados */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Descuentos al Trabajador */}
                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                    <span className="text-xs font-black uppercase text-blue-900 tracking-wider">
                      Deducciones Trabajador
                    </span>
                    <span className="text-xs font-black text-blue-900">
                      {((totalEmployeeContributions / validSalary) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Salud (4%):</span>
                      <span className="font-bold text-slate-900">{formatCOP(empHealth)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pensión (4%):</span>
                      <span className="font-bold text-slate-900">{formatCOP(empPension)}</span>
                    </div>
                    {empFsp > 0 && (
                      <div className="flex justify-between text-amber-800">
                        <span>Fondo Solidaridad (1%):</span>
                        <span className="font-bold">{formatCOP(empFsp)}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-blue-200 flex justify-between font-black text-blue-950 text-sm">
                    <span>Total Retenido:</span>
                    <span>{formatCOP(totalEmployeeContributions)}</span>
                  </div>
                </div>

                {/* Aportes del Empleador */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                    <span className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                      Aportes Patronales
                    </span>
                    <span className="text-xs font-black text-emerald-900">
                      {((grandTotalEmployerContributions / validSalary) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Salud (8.5%):</span>
                      <span className={`font-bold ${employerHealth === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                        {employerHealth === 0 ? 'Exonerado ($0)' : formatCOP(employerHealth)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pensión (12%):</span>
                      <span className="font-bold text-slate-900">{formatCOP(employerPension)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ARL ({selectedARL.rate}%):</span>
                      <span className="font-bold text-slate-900">{formatCOP(employerARL)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Caja Comp. (4%):</span>
                      <span className="font-bold text-slate-900">{formatCOP(employerCCF)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">SENA (2%) & ICBF (3%):</span>
                      <span className={`font-bold ${employerSENA === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                        {employerSENA === 0 ? 'Exonerado ($0)' : formatCOP(employerSENA + employerICBF)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-emerald-200 flex justify-between font-black text-[#00324D] text-sm">
                    <span>Total Patronal:</span>
                    <span>{formatCOP(grandTotalEmployerContributions)}</span>
                  </div>
                </div>
              </div>

              {/* Grand Total Comparison Ribbon */}
              <div className="bg-[#00324D] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-300 block">Recaudo Global al Sistema Integral (2026)</span>
                  <span className="text-lg font-black text-emerald-300">
                    {formatCOP(totalEmployeeContributions + grandTotalEmployerContributions)}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <span>Equivalente al </span>
                  <strong className="text-white text-sm">
                    {(((totalEmployeeContributions + grandTotalEmployerContributions) / validSalary) * 100).toFixed(1)}%
                  </strong>
                  <span> del salario del trabajador</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: PRUEBA DE CONOCIMIENTOS MÓDULO 3 (10 PREGUNTAS) */}
      {activeTab === 'test10' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Header Banner de la Prueba */}
          <div className="bg-gradient-to-br from-[#00324D] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Evaluación de Conocimientos Módulo 3
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  Prueba Módulo 3: Seguridad Social Integral y Parafiscales
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Responde las 10 preguntas de selección múltiple sobre tarifas a 2026, discriminación entre trabajador y empleador, 
              clasificación de riesgos ARL, esquema de exoneración del Art. 114-1 del E.T. y marco regulatorio (PILA y UGPP).
            </p>
          </div>

          {/* Banner de Resultados tras Enviar */}
          {testSubmitted && (
            <div className={`p-6 rounded-3xl border shadow-md space-y-4 ${
              testPercentage >= 70
                ? 'bg-gradient-to-r from-emerald-900 to-teal-900 text-white border-emerald-500'
                : testPercentage >= 50
                ? 'bg-gradient-to-r from-amber-900 to-orange-950 text-white border-amber-500'
                : 'bg-gradient-to-r from-rose-950 to-slate-900 text-white border-rose-500'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Award className="w-8 h-8 text-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/20">
                        Resultados de la Evaluación
                      </span>
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded ${
                        testPercentage >= 70 ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-400 text-amber-950'
                      }`}>
                        {testPercentage >= 70 ? 'APROBADO' : 'REQUIERE REPASO'}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black mt-1">
                      Puntaje: {testScore} / {MODULE3_TEST_QUESTIONS.length} ({testPercentage}%)
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleResetTest}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-2 hover:bg-slate-100 transition-all shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  Reintentar Prueba
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-6 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Aciertos: <strong className="text-white font-black">{testScore}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Errores: <strong className="text-white font-black">{MODULE3_TEST_QUESTIONS.length - testScore}</strong></span>
                </div>
                <div className="text-slate-300">
                  {testPercentage >= 70
                    ? '¡Felicitaciones! Has demostrado un dominio solvente de las tarifas y normatividad de Seguridad Social en Colombia.'
                    : 'Revisa las justificaciones legales resaltadas abajo para afianzar los temas donde fallaste.'}
                </div>
              </div>
            </div>
          )}

          {/* Alerta de Validación si faltan preguntas por responder */}
          {testValidationError && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="font-semibold">{testValidationError}</span>
            </div>
          )}

          {/* Preguntas */}
          <div className="space-y-6">
            {MODULE3_TEST_QUESTIONS.map((q, idx) => {
              const selectedOpt = testAnswers[q.id];
              const isSelected = selectedOpt !== undefined;
              const isCorrect = testSubmitted && selectedOpt === q.correctIndex;
              const isIncorrect = testSubmitted && selectedOpt !== undefined && selectedOpt !== q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`bg-white border rounded-3xl p-6 shadow-xs transition-all ${
                    testSubmitted
                      ? isCorrect
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : isIncorrect
                        ? 'border-rose-500 ring-2 ring-rose-500/20'
                        : 'border-slate-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Encabezado Pregunta */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center shrink-0 border border-slate-200">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Pregunta {idx + 1} de {MODULE3_TEST_QUESTIONS.length}
                      </span>
                    </div>

                    {testSubmitted && (
                      isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ¡Correcto!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-100 text-rose-800 font-black text-xs">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          Incorrecto
                        </span>
                      )
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-4 leading-snug">
                    {q.question}
                  </h3>

                  {/* Opciones A, B, C, D */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correctIndex === optIdx;

                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";

                      if (testSubmitted) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500";
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-medium line-through";
                        } else {
                          btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-emerald-50 border-[#39A900] text-[#00324D] font-bold shadow-xs";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={testSubmitted}
                          onClick={() => handleSelectTestOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                              testSubmitted && isThisCorrect
                                ? 'bg-emerald-600 text-white'
                                : testSubmitted && isThisSelected && !isThisCorrect
                                ? 'bg-rose-600 text-white'
                                : isThisSelected
                                ? 'bg-[#39A900] text-white'
                                : 'bg-white text-slate-600 border border-slate-300'
                            }`}>
                              {letter}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {testSubmitted && isThisCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {testSubmitted && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Justificación Legal cuando la prueba ha sido enviada */}
                  {testSubmitted && (
                    <div className={`mt-4 p-4 rounded-2xl text-xs sm:text-sm space-y-1.5 border ${
                      isCorrect 
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-2 font-black text-[#00324D]">
                        <HelpCircle className="w-4 h-4 text-[#39A900]" />
                        <span>Fundamento Legal y Explicación:</span>
                      </div>
                      <p className="leading-relaxed text-slate-700 pl-6">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Acciones de envío */}
          <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-600 block">
                Estado del Test: {Object.keys(testAnswers).length} / {MODULE3_TEST_QUESTIONS.length} respondidas
              </span>
              <p className="text-xs text-slate-500">
                {testSubmitted 
                  ? 'Puedes volver a presentar el examen haciendo clic en Reintentar Prueba.'
                  : 'Revisa cuidadosamente tus respuestas antes de confirmarlas.'}
              </p>
            </div>

            {!testSubmitted ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-3 rounded-2xl bg-[#39A900] text-white font-extrabold text-sm flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Enviar Respuestas y Ver Resultados
              </button>
            ) : (
              <button
                onClick={handleResetTest}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                Reintentar Prueba
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
