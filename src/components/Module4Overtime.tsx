import React, { useState } from 'react';
import { LEGAL_CONSTANTS_2026 } from '../constants/colombia2026';
import { formatCOP } from '../utils/payrollCalculator';
import {
  Clock,
  Sun,
  Moon,
  Calendar,
  Calculator,
  BookOpen,
  CheckSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Send,
  HelpCircle,
  Scale,
  TrendingUp,
  Info,
  ShieldCheck
} from 'lucide-react';

interface OvertimeConcept {
  code: string;
  name: string;
  schedule: string;
  surchargePct: string;
  totalPct: string;
  factor: number;
  cstRef: string;
  description: string;
  isSurchargeOnly?: boolean;
}

const OVERTIME_CONCEPTS_2026: OvertimeConcept[] = [
  {
    code: 'RN',
    name: 'Recargo Nocturno Ordinario',
    schedule: '7:00 p.m. a 6:00 a.m. (jornada ordinaria)',
    surchargePct: '+35%',
    totalPct: '135% (recargo 0.35)',
    factor: 0.35,
    cstRef: 'Arts. 160 y 168 CST · Ley 2466/2025',
    description: 'Se paga por trabajar dentro de la jornada ordinaria en horario nocturno (desde las 7:00 p.m.). Como la hora base ya está en el sueldo, se liquida el 35% adicional.',
    isSurchargeOnly: true,
  },
  {
    code: 'HED',
    name: 'Hora Extra Diurna Ordinaria',
    schedule: '6:00 a.m. a 7:00 p.m. (fuera de jornada)',
    surchargePct: '+25%',
    totalPct: '125% (factor 1.25)',
    factor: 1.25,
    cstRef: 'Art. 168 Num. 2 CST',
    description: 'Trabajo suplementario realizado después de cumplir la jornada ordinaria diaria en horario diurno.',
  },
  {
    code: 'HEN',
    name: 'Hora Extra Nocturna Ordinaria',
    schedule: '7:00 p.m. a 6:00 a.m. (fuera de jornada)',
    surchargePct: '+75%',
    totalPct: '175% (factor 1.75)',
    factor: 1.75,
    cstRef: 'Art. 168 Num. 3 CST · Ley 2466/2025',
    description: 'Trabajo suplementario ejecutado por encima de la jornada ordinaria en franja nocturna (7:00 p.m. a 6:00 a.m.).',
  },
  {
    code: 'RDF',
    name: 'Recargo Dominical o Festivo Ordinario',
    schedule: 'Domingos y festivos (6:00 a.m. a 7:00 p.m.)',
    surchargePct: '+90% (2026)',
    totalPct: '190% (recargo 0.90)',
    factor: 0.90,
    cstRef: 'Art. 179 CST · Ley 2466/2025',
    description: 'Recargo gradual vigente en 2026 (90%) por laborar en domingo o festivo dentro de la jornada ordinaria (el 100% base del día ya viene incluido en el sueldo mensual).',
    isSurchargeOnly: true,
  },
  {
    code: 'RNDF',
    name: 'Recargo Nocturno Dominical o Festivo',
    schedule: 'Domingos y festivos (7:00 p.m. a 6:00 a.m.)',
    surchargePct: '+125% (35% + 90%)',
    totalPct: '225% (recargo 1.25)',
    factor: 1.25,
    cstRef: 'Arts. 168 y 179 CST · Ley 2466/2025',
    description: 'Combina el recargo nocturno del 35% y el recargo dominical/festivo del 90% vigente en 2026 sobre la hora ordinaria ya remunerada en el salario mensual.',
    isSurchargeOnly: true,
  },
  {
    code: 'HEDD',
    name: 'Hora Extra Diurna Dominical o Festiva',
    schedule: 'Domingos y festivos (6:00 a.m. a 7:00 p.m., extra)',
    surchargePct: '+115% (90% + 25%)',
    totalPct: '215% (factor 2.15)',
    factor: 2.15,
    cstRef: 'Arts. 168 y 179 CST · Ley 2466/2025',
    description: 'Hora extra diurna laborada en día de descanso obligatorio o festivo: suma 100% hora base + 90% dominical + 25% extra diurna.',
  },
  {
    code: 'HEND',
    name: 'Hora Extra Nocturna Dominical o Festiva',
    schedule: 'Domingos y festivos (7:00 p.m. a 6:00 a.m., extra)',
    surchargePct: '+165% (90% + 75%)',
    totalPct: '265% (factor 2.65)',
    factor: 2.65,
    cstRef: 'Arts. 168 y 179 CST · Ley 2466/2025',
    description: 'Hora extra nocturna ejecutada en domingo o festivo: suma 100% hora base + 90% dominical + 75% extra nocturna.',
  },
];

interface OvertimeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  lawRef: string;
  explanation: string;
}

const MODULE4_OVERTIME_QUESTIONS: OvertimeQuestion[] = [
  {
    id: 1,
    question: '1. Con la Reforma Laboral (Ley 2466 de 2025), ¿en qué franja horaria se comprende la Jornada Nocturna en Colombia?',
    options: [
      'De 9:00 p.m. a 6:00 a.m.',
      'De 7:00 p.m. a 6:00 a.m.',
      'De 6:00 p.m. a 6:00 a.m.',
      'De 10:00 p.m. a 5:00 a.m.'
    ],
    correctIndex: 1,
    lawRef: 'Art. 160 CST · Ley 2466 de 2025',
    explanation: 'La Ley 2466 de 2025 modificó el Art. 160 del CST y adelantó el inicio del trabajo nocturno a las 7:00 p.m. (19:00 horas) hasta las 6:00 a.m.'
  },
  {
    id: 2,
    question: '2. Al reducirse la jornada máxima legal a 42 horas semanales en 2026 (Ley 2101 de 2021), ¿entre cuántas horas mensuales se divide el salario para hallar el valor de la hora ordinaria?',
    options: [
      'Entre 240 horas mensuales',
      'Entre 220 horas mensuales',
      'Entre 210 horas mensuales',
      'Entre 180 horas mensuales'
    ],
    correctIndex: 2,
    lawRef: 'Ley 2101 de 2021',
    explanation: 'Con una jornada semanal de 42 horas distribuidas en 6 días (7 horas diarias × 30 días), el divisor mensual vigente es de 210 horas/mes.'
  },
  {
    id: 3,
    question: '3. ¿Cuál es el porcentaje de recargo dominical y festivo ordinario vigente para el año 2026 según la gradualidad de la Ley 2466 de 2025?',
    options: [
      '75% sobre el valor de la hora ordinaria',
      '80% sobre el valor de la hora ordinaria',
      '90% sobre el valor de la hora ordinaria',
      '100% sobre el valor de la hora ordinaria'
    ],
    correctIndex: 2,
    lawRef: 'Art. 179 CST · Ley 2466 de 2025',
    explanation: 'La Ley 2466 fijó un incremento gradual del recargo dominical y festivo: 80% en 2025, 90% a partir de julio de 2026 y 100% en julio de 2027.'
  },
  {
    id: 4,
    question: '4. ¿Qué factor multiplicador se aplica sobre el valor de la hora ordinaria para liquidar una Hora Extra Diurna (HED)?',
    options: [
      'Factor 1.25 (125%)',
      'Factor 1.35 (135%)',
      'Factor 1.75 (175%)',
      'Factor 0.25 (25%)'
    ],
    correctIndex: 0,
    lawRef: 'Art. 168 Num. 2 CST',
    explanation: 'El trabajo extra diurno se remunera con un recargo del 25% sobre el valor del trabajo ordinario diurno, es decir, multiplicando por 1.25 (100% base + 25% recargo).'
  },
  {
    id: 5,
    question: '5. Si un trabajador cumple su turno ordinario entre las 7:00 p.m. y las 11:00 p.m. de un miércoles, ¿qué porcentaje adicional se liquida por esas 4 horas?',
    options: [
      'Hora extra nocturna del 75% (factor 1.75)',
      'Recargo nocturno ordinario del 35% (factor 0.35)',
      'Recargo diurno del 25% (factor 1.25)',
      'No genera recargo porque está dentro de la jornada ordinaria'
    ],
    correctIndex: 1,
    lawRef: 'Art. 168 Num. 1 CST',
    explanation: 'Cuando se labora dentro de la jornada ordinaria pactada en horario nocturno (7:00 p.m. a 6:00 a.m.), se paga únicamente el recargo nocturno del 35% (0.35) porque la hora ordinaria ya hace parte del salario mensual.'
  },
  {
    id: 6,
    question: '6. ¿Cuál es el factor total para liquidar una Hora Extra Nocturna Ordinaria (HEN)?',
    options: [
      'Factor 1.35 (135%)',
      'Factor 1.75 (175%)',
      'Factor 2.00 (200%)',
      'Factor 2.15 (215%)'
    ],
    correctIndex: 1,
    lawRef: 'Art. 168 Num. 3 CST',
    explanation: 'La hora extra nocturna ordinaria tiene un recargo del 75% adicional a la hora ordinaria, lo que equivale al 175% (factor 1.75).'
  },
  {
    id: 7,
    question: '7. Con el recargo dominical vigente del 90% en 2026, ¿cuál es el porcentaje total de una Hora Extra Diurna Dominical o Festiva (HEDD)?',
    options: [
      '200% (factor 2.00)',
      '215% (100% + 90% dominical + 25% extra diurna)',
      '265% (factor 2.65)',
      '190% (factor 1.90)'
    ],
    correctIndex: 1,
    lawRef: 'Arts. 168 y 179 CST · Ley 2466/2025',
    explanation: 'En 2026 la hora extra diurna dominical/festiva suma: 100% valor hora + 90% recargo dominical + 25% recargo extra diurno = 215% (factor 2.15).'
  },
  {
    id: 8,
    question: '8. Con el recargo dominical del 90% en 2026, ¿cuál es el porcentaje total de una Hora Extra Nocturna Dominical o Festiva (HEND)?',
    options: [
      '250% (factor 2.50)',
      '215% (factor 2.15)',
      '265% (100% + 90% dominical + 75% extra nocturna)',
      '125% (factor 1.25)'
    ],
    correctIndex: 2,
    lawRef: 'Arts. 168 y 179 CST · Ley 2466/2025',
    explanation: 'La hora extra nocturna dominical o festiva en 2026 se liquida al 265% (factor 2.65): 100% hora base + 90% dominical + 75% extra nocturna.'
  },
  {
    id: 9,
    question: '9. ¿Cuál es el límite máximo legal de horas extras que puede laborar un trabajador en Colombia?',
    options: [
      'Máximo 2 horas extras diarias y 12 horas extras a la semana',
      'Máximo 4 horas extras diarias y 24 horas a la semana',
      'No existe ningún límite si el trabajador acepta por escrito',
      'Máximo 1 hora extra diaria y 5 horas a la semana'
    ],
    correctIndex: 0,
    lawRef: 'Art. 22 Ley 50 de 1990',
    explanation: 'En ningún caso las horas extras de trabajo, diurnas o nocturnas, podrán exceder de dos (2) horas diarias y doce (12) semanales.'
  },
  {
    id: 10,
    question: '10. Para efectos de nómina, ¿cómo impactan los pagos por horas extras y recargos en las prestaciones sociales y seguridad social?',
    options: [
      'No constituyen salario y se excluyen de la base prestacional',
      'Constituyen salario pleno (Art. 127 CST): hacen base para Seguridad Social, Parafiscales, Prima y Cesantías',
      'Solo hacen base para liquidar vacaciones y no para cesantías',
      'Tienen un límite del 40% según la Ley 1393 de 2010'
    ],
    correctIndex: 1,
    lawRef: 'Art. 127 CST',
    explanation: 'El Art. 127 del CST incluye expresamente el valor del trabajo suplementario o de las horas extras y del trabajo en días de descanso obligatorio como salario pleno para aportes y prestaciones.'
  }
];

export const Module4Overtime: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'table' | 'calculator' | 'test10'>('schedule');

  // Estados del Simulador de Horas Extras y Recargos
  const [salaryInput, setSalaryInput] = useState<number>(LEGAL_CONSTANTS_2026.SMMLV);
  const [hoursByCode, setHoursByCode] = useState<Record<string, number>>({
    RN: 10,
    HED: 4,
    HEN: 2,
    RDF: 8,
    RNDF: 0,
    HEDD: 0,
    HEND: 0,
  });

  // Estados de la Prueba de Conocimientos (10 Preguntas)
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testValidationError, setTestValidationError] = useState<string | null>(null);

  const validSalary = Math.max(LEGAL_CONSTANTS_2026.SMMLV, salaryInput || 0);
  const ordinaryHourValue = validSalary / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026;

  const calculatedLines = OVERTIME_CONCEPTS_2026.map((concept) => {
    const qty = Math.max(0, hoursByCode[concept.code] ?? 0);
    const unitValue = ordinaryHourValue * concept.factor;
    const subtotal = qty * unitValue;
    return {
      ...concept,
      qty,
      unitValue,
      subtotal,
    };
  });

  const totalOvertimeAndSurcharges = calculatedLines.reduce((acc, item) => acc + item.subtotal, 0);
  const totalHoursCount = calculatedLines.reduce((acc, item) => acc + item.qty, 0);
  const totalSalaryWithExtras = validSalary + totalOvertimeAndSurcharges;

  const handleHourChange = (code: string, value: number) => {
    setHoursByCode((prev) => ({
      ...prev,
      [code]: Math.max(0, isNaN(value) ? 0 : value),
    }));
  };

  const handleResetCalculator = () => {
    setSalaryInput(LEGAL_CONSTANTS_2026.SMMLV);
    setHoursByCode({
      RN: 0,
      HED: 0,
      HEN: 0,
      RDF: 0,
      RNDF: 0,
      HEDD: 0,
      HEND: 0,
    });
  };

  // Manejadores de la Prueba
  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    if (testValidationError) setTestValidationError(null);
  };

  const handleSubmitTest = () => {
    const answered = Object.keys(testAnswers).length;
    if (answered < MODULE4_OVERTIME_QUESTIONS.length) {
      const remaining = MODULE4_OVERTIME_QUESTIONS.length - answered;
      setTestValidationError(`Has respondido ${answered} de ${MODULE4_OVERTIME_QUESTIONS.length} preguntas. Te faltan ${remaining} por responder antes de enviar.`);
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

  const testScore = MODULE4_OVERTIME_QUESTIONS.reduce((acc, q) => {
    return acc + (testAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
  const testPercentage = Math.round((testScore / MODULE4_OVERTIME_QUESTIONS.length) * 100);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-indigo-700" />
              Módulo 4 • Trabajo Suplementario y Recargos
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Horas Extras y Recargos en Colombia (Ley 2466 de 2025 · Vigencia 2026)
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
              Liquidación del trabajo suplementario, jornada nocturna desde las 7:00 p.m., recargo dominical/festivo gradual 
              del 90% en 2026 y divisor de 210 horas mensuales por jornada máxima de 42 horas semanales (Ley 2101).
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jornada y Ley 2466
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabla de Porcentajes
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator' ? 'bg-[#39A900] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Liquidador de Horas Extras
            </button>
            <button
              onClick={() => setActiveTab('test10')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'test10'
                  ? 'bg-[#00324D] text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Prueba Módulo 4 (10 Preguntas)
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: JORNADA LABORAL Y REFORMA LEY 2466 DE 2025 */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Franjas Diurna vs Nocturna */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Jornada Diurna Ordinaria</h3>
                    <p className="text-xs text-slate-500">Art. 160 CST modificado por Ley 2466 de 2025</p>
                  </div>
                </div>
                <span className="text-sm font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  6:00 a.m. – 7:00 p.m.
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprende el trabajo ejecutado entre las <strong>06:00 horas y las 19:00 horas</strong>. Las horas ordinarias 
                laboradas dentro de este rango en días hábiles no generan recargo adicional. Si se excede la jornada pactada, 
                se liquida como <strong>Hora Extra Diurna (+25%)</strong>.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#00324D] to-slate-950 text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center">
                    <Moon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Jornada Nocturna (Ley 2466)</h3>
                    <p className="text-xs text-indigo-300">Adelantada de 9:00 p.m. a 7:00 p.m.</p>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-300 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                  7:00 p.m. – 6:00 a.m.
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Por mandato de la <strong>Ley 2466 de 2025</strong>, todo trabajo ejecutado entre las <strong>7:00 p.m. (19:00) y las 6:00 a.m.</strong> 
                se considera jornada nocturna. Genera <strong>Recargo Nocturno (+35%)</strong> en turno ordinario o 
                <strong> Hora Extra Nocturna (+75%)</strong> en tiempo suplementario.
              </p>
            </div>
          </div>

          {/* Valor Hora 210 + Topes Legales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Divisor 210 horas */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#39A900]">
                <Scale className="w-4 h-4" />
                Fórmula Valor Hora 2026
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Divisor Mensual: 210 Horas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Con la culminación de la transición de la <strong>Ley 2101 de 2021</strong> en julio de 2026, la jornada 
                máxima legal es de <strong>42 horas semanales</strong> (7 horas/día × 30 días = 210 horas/mes).
              </p>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono tabular-nums">
                <div className="text-slate-500">Ejemplo con 1 SMMLV 2026:</div>
                <div className="font-bold text-slate-900">
                  {formatCOP(LEGAL_CONSTANTS_2026.SMMLV)} ÷ 210 h = {formatCOP(LEGAL_CONSTANTS_2026.SMMLV / 210)} / hora
                </div>
              </div>
            </div>

            {/* Límites y Naturaleza Salarial */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                <Calendar className="w-4 h-4" />
                Límites y Base Prestacional
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Tope Legal e Impacto en Nómina
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block">Límite Máximo (Art. 22 Ley 50/1990):</strong>
                  Máximo <strong>2 horas extras diarias</strong> y <strong>12 horas extras a la semana</strong>.
                </li>
                <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block">Constituyen Salario (Art. 127 CST):</strong>
                  El 100% de horas extras y recargos suman para Seguridad Social, Parafiscales, Cesantías y Prima.
                </li>
              </ul>
            </div>
          </div>

          {/* Referencia Horas Extras y Recargos - Ley 2466 de 2025 (movida debajo de Fórmula Valor Hora) */}
          <div className="bg-[#00324D]/5 p-5 sm:p-6 rounded-3xl border-2 border-[#39A900]/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-[#00324D] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#39A900]" />
                Horas Extras y Recargos • Ley 2466 de 2025
              </h4>
              <span className="text-[11px] font-black px-2.5 py-1 bg-[#39A900] text-white rounded-lg">
                Reforma Laboral 2025-2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>🌙 Jornada Nocturna (Art. 160 CST):</span>
                  <span className="text-purple-800">7:00 p.m. a 6:00 a.m.</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ley 2466 de 2025 adelanta el inicio del recargo nocturno a las 7:00 p.m. (antes 9:00 p.m.).
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>📅 Recargo Dominical/Festivo Gradual (Art. 179 CST):</span>
                  <span className="text-[#39A900] font-black">90% en 2026</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Gradualidad Ley 2466: 80% (2025) ➔ <strong>90% (Vigencia 2026)</strong> ➔ 100% (Julio 2027).
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-slate-800 font-semibold divide-y md:divide-y-0 divide-slate-100 bg-white p-4 rounded-2xl border border-slate-200 tabular-nums">
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span>• Hora extra diurna ordinaria:</span>
                <strong className="text-slate-900">125% (+25%)</strong>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span>• Hora extra nocturna ordinaria:</span>
                <strong className="text-slate-900">175% (+75%)</strong>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span>• Recargo nocturno ordinario (7pm-6am):</span>
                <strong className="text-purple-700">35%</strong>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span>• Recargo dominical o festivo ordinario:</span>
                <strong className="text-[#39A900]">90% (2026)</strong>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100 md:border-b-0">
                <span>• Hora extra diurna dominical / festiva:</span>
                <strong className="text-slate-900">215% (100%+90%+25%)</strong>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100 md:border-b-0">
                <span>• Hora extra nocturna dominical / festiva:</span>
                <strong className="text-slate-900">265% (100%+90%+75%)</strong>
              </li>
              <li className="flex justify-between py-1.5 md:col-span-2 md:border-t md:border-slate-100 md:pt-2.5">
                <span>• Recargo nocturno dominical / festivo:</span>
                <strong className="text-purple-900">125% (35%+90%)</strong>
              </li>
            </ul>

            <div className="text-[11px] text-slate-500 italic text-center pt-1">
              Cálculos basados en jornada legal de 42 horas semanales (210 horas/mes).
            </div>
          </div>

          {/* Gradualidad Dominical Ley 2466 (movida debajo de Horas Extras y Recargos Ley 2466 de 2025) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              <TrendingUp className="w-4 h-4" />
              Art. 179 CST · Ley 2466 de 2025
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Recargo Dominical y Festivo: 90%
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La reforma laboral incrementó progresivamente el recargo por trabajar en días de descanso obligatorio o festivos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs tabular-nums">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>Desde julio de 2025:</span>
                <strong className="text-slate-700">80%</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold">
                <span>Vigencia actual (Julio 2026):</span>
                <strong className="text-[#39A900]">90%</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>A partir de julio de 2027:</span>
                <strong className="text-slate-700">100%</strong>
              </div>
            </div>
          </div>

          {/* Ejemplo práctico paso a paso con SMMLV 2026 ($1.750.905) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#39A900]">
                  <Calculator className="w-4 h-4" />
                  Ejemplo Práctico Paso a Paso · Base 1 SMMLV 2026
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  ¿Cómo se liquida cada Hora Extra y Recargo con Salario Mínimo ($1.750.905)?
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Aplicando el divisor vigente de <strong>210 horas mensuales</strong> (jornada de 42 horas/semana · Ley 2101) y las tarifas de la <strong>Ley 2466 de 2025</strong> para 2026.
                </p>
              </div>
              <div className="bg-[#00324D] text-white px-4 py-2.5 rounded-2xl text-xs tabular-nums shrink-0">
                <span className="text-emerald-300 font-bold block">Paso 1 · Valor Hora Ordinaria</span>
                <strong className="text-sm font-black">
                  {formatCOP(LEGAL_CONSTANTS_2026.SMMLV)} ÷ 210 h = {formatCOP(LEGAL_CONSTANTS_2026.SMMLV / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026)}
                </strong>
              </div>
            </div>

            {/* Paso 2: Tabla de liquidación por cada hora extra y recargo */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse tabular-nums">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3">Concepto (1 Hora)</th>
                    <th className="p-3">Operación Matemática (Paso 2)</th>
                    <th className="p-3 text-center">Factor 2026</th>
                    <th className="p-3 text-right">Valor 1 Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {OVERTIME_CONCEPTS_2026.map((item) => {
                    const baseHour = LEGAL_CONSTANTS_2026.SMMLV / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026;
                    const oneHourValue = baseHour * item.factor;
                    return (
                      <tr key={item.code} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">
                            <span className="text-indigo-800 font-black">{item.code}</span> · {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.schedule}</div>
                        </td>
                        <td className="p-3 font-mono text-slate-700">
                          ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)} ÷ 210) × {item.factor.toFixed(2)} = {formatCOP(baseHour)} × {item.factor.toFixed(2)}
                        </td>
                        <td className="p-3 text-center font-bold text-emerald-800">
                          {item.factor.toFixed(2)} ({item.surchargePct})
                        </td>
                        <td className="p-3 text-right font-black text-[#00324D] text-sm">
                          {formatCOP(oneHourValue)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-emerald-50 border-t border-emerald-200 font-black text-emerald-950">
                    <td className="p-3" colSpan={3}>
                      Ejemplo resumen: Si el trabajador labora 1 hora de cada uno de los 7 conceptos en el mes
                    </td>
                    <td className="p-3 text-right text-[#39A900] text-sm">
                      {formatCOP(
                        OVERTIME_CONCEPTS_2026.reduce(
                          (sum, item) => sum + (LEGAL_CONSTANTS_2026.SMMLV / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026) * item.factor,
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Interpretación del ejemplo:</strong> Con un salario mínimo de <strong>{formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}</strong>, la hora básica vale <strong>{formatCOP(LEGAL_CONSTANTS_2026.SMMLV / 210)}</strong>. 
                Los valores de <strong>RN ($2.918)</strong>, <strong>RDF ($7.504)</strong> y <strong>RNDF ($10.422)</strong> representan el <em>recargo adicional</em> que se suma al sueldo mensual ya pactado; en cambio, <strong>HED ($10.422)</strong>, <strong>HEN ($14.591)</strong>, <strong>HEDD ($17.926)</strong> y <strong>HEND ($22.095)</strong> incluyen el 100% de la hora trabajada fuera de la jornada más su respectivo recargo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: TABLA OFICIAL DE PORCENTAJES Y FACTORES 2026 */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#39A900]" />
                  Tabla Oficial de Liquidación de Horas Extras y Recargos 2026
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Referencia con valor hora ordinaria base de 1 SMMLV 2026 ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)} ÷ 210 h = {formatCOP(LEGAL_CONSTANTS_2026.SMMLV / 210)}).
                </p>
              </div>
              <span className="text-xs font-bold text-[#00324D] bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                Fórmula: (Salario ÷ 210) × Factor × Horas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse tabular-nums">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3">Sigla</th>
                    <th className="p-3">Concepto</th>
                    <th className="p-3">Horario Aplicable</th>
                    <th className="p-3 text-center">Recargo</th>
                    <th className="p-3 text-center">Factor</th>
                    <th className="p-3 text-right">Valor Hora (1 SMMLV)</th>
                    <th className="p-3">Norma CST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {OVERTIME_CONCEPTS_2026.map((item) => {
                    const exampleHourVal = (LEGAL_CONSTANTS_2026.SMMLV / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026) * item.factor;
                    return (
                      <tr key={item.code} className="hover:bg-slate-50">
                        <td className="p-3 font-black text-indigo-900">{item.code}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 max-w-sm">{item.description}</div>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">{item.schedule}</td>
                        <td className="p-3 text-center font-bold text-emerald-800">{item.surchargePct}</td>
                        <td className="p-3 text-center font-mono font-black text-slate-900">{item.factor.toFixed(2)}</td>
                        <td className="p-3 text-right font-black text-[#00324D]">{formatCOP(exampleHourVal)}</td>
                        <td className="p-3 text-slate-600 text-[11px]">{item.cstRef}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Nota técnica sobre recargos (RN, RDF, RNDF):</strong> Cuando el trabajador tiene salario mensual ordinario, 
                la hora ordinaria (100%) ya se encuentra incluida en su sueldo básico mensual. Por ello, al liquidar la nómina 
                se multiplica por el porcentaje de recargo puro (<strong>0.35</strong>, <strong>0.90</strong> o <strong>1.25</strong>). 
                Si se trata de un día dominical adicional pagado por fuera del salario mensual sin descanso compensatorio, se suma el 100% de la hora base (factor 1.90 o 2.25).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: LIQUIDADOR INTERACTIVO DE HORAS EXTRAS Y RECARGOS */}
      {activeTab === 'calculator' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Simulador Práctico con Vigencia 2026
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Liquidador de Horas Extras y Recargos
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ingresa el salario mensual del trabajador y la cantidad de horas por cada novedad para calcular el valor exacto.
              </p>
            </div>
            <button
              onClick={handleResetCalculator}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpiar Horas
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Panel Izquierdo: Controles */}
            <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Salario Básico Mensual (COP)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    min={LEGAL_CONSTANTS_2026.SMMLV}
                    step="50000"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 bg-white rounded-xl border border-slate-300 font-bold text-slate-900 text-sm tabular-nums focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <button
                    onClick={() => setSalaryInput(LEGAL_CONSTANTS_2026.SMMLV)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold cursor-pointer hover:bg-emerald-200"
                  >
                    1 SMMLV ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)})
                  </button>
                  <button
                    onClick={() => setSalaryInput(LEGAL_CONSTANTS_2026.SMMLV * 2)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                  >
                    2 SMMLV
                  </button>
                  <button
                    onClick={() => setSalaryInput(3000000)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                  >
                    $3.000.000
                  </button>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs tabular-nums">
                  <span className="text-slate-600 font-medium">Valor Hora Ordinaria (÷ 210 h):</span>
                  <strong className="text-[#00324D] font-black text-sm">{formatCOP(ordinaryHourValue)}</strong>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Cantidad de Horas Trabajadas
                </div>
                {OVERTIME_CONCEPTS_2026.map((concept) => (
                  <div key={concept.code} className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {concept.code} · {concept.name}
                      </div>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        Factor: {concept.factor.toFixed(2)} ({concept.surchargePct})
                      </div>
                    </div>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      step="1"
                      aria-label={`Horas de ${concept.name}`}
                      value={hoursByCode[concept.code] ?? 0}
                      onChange={(e) => handleHourChange(concept.code, Number(e.target.value))}
                      className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 text-right font-bold text-sm text-slate-900 tabular-nums focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900] shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Panel Derecho: Resultados Desglosados */}
            <div className="lg:col-span-7 space-y-5">
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <span className="text-xs font-bold text-slate-500 block">Total Horas Novedad</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{totalHoursCount} h</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <span className="text-xs font-bold text-emerald-800 block">Total Extras y Recargos</span>
                  <span className="text-2xl font-black text-[#39A900] mt-1 block">{formatCOP(totalOvertimeAndSurcharges)}</span>
                </div>
                <div className="bg-[#00324D] text-white rounded-2xl p-4">
                  <span className="text-xs font-bold text-emerald-300 block">Nuevo Total Salarial</span>
                  <span className="text-2xl font-black mt-1 block">{formatCOP(totalSalaryWithExtras)}</span>
                </div>
              </div>

              {/* Desglose Matemático */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Desglose Matemático por Concepto (Vigencia 2026)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse tabular-nums">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-3">Concepto</th>
                        <th className="p-3 text-center">Cant.</th>
                        <th className="p-3 text-right">Valor Unitario</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {calculatedLines.map((line) => (
                        <tr key={line.code} className={line.qty > 0 ? 'bg-emerald-50/30 font-semibold' : 'text-slate-400'}>
                          <td className="p-3">
                            <span className="font-bold text-slate-900">{line.code}</span> · {line.name}
                          </td>
                          <td className="p-3 text-center font-mono">{line.qty} h</td>
                          <td className="p-3 text-right font-mono">{formatCOP(line.unitValue)}</td>
                          <td className="p-3 text-right font-black text-slate-900">{formatCOP(line.subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 border-t border-slate-200 font-black text-slate-900">
                        <td className="p-3" colSpan={3}>Total Trabajo Suplementario y Recargos</td>
                        <td className="p-3 text-right text-[#39A900] text-sm">{formatCOP(totalOvertimeAndSurcharges)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 leading-relaxed">
                <strong>Impacto Contable y Prestacional (Art. 127 CST):</strong> El valor total calculado ({formatCOP(totalOvertimeAndSurcharges)}) 
                se suma al salario básico para formar un nuevo IBC salarial de <strong>{formatCOP(totalSalaryWithExtras)}</strong>, sobre el cual se 
                liquidan Salud, Pensión, ARL, Parafiscales, Cesantías, Intereses y Prima de Servicios.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: PRUEBA DE CONOCIMIENTOS MÓDULO 4 (10 PREGUNTAS) */}
      {activeTab === 'test10' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Header Banner de la Prueba */}
          <div className="bg-gradient-to-br from-[#00324D] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Evaluación de Conocimientos Módulo 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  Prueba Módulo 4: Horas Extras y Recargos (Ley 2466 de 2025)
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Responde las 10 preguntas de selección múltiple sobre franja nocturna desde las 7:00 p.m., divisor de 210 horas 
              (Ley 2101), gradualidad del recargo dominical al 90% en 2026, factores matemáticos y límites legales.
            </p>
          </div>

          {/* Resultados */}
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
                    <h3 className="text-2xl sm:text-3xl font-black mt-1 tabular-nums">
                      Puntaje: {testScore} / {MODULE4_OVERTIME_QUESTIONS.length} ({testPercentage}%)
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
                  <span>Errores: <strong className="text-white font-black">{MODULE4_OVERTIME_QUESTIONS.length - testScore}</strong></span>
                </div>
              </div>
            </div>
          )}

          {testValidationError && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="font-semibold">{testValidationError}</span>
            </div>
          )}

          {/* Listado de Preguntas */}
          <div className="space-y-6">
            {MODULE4_OVERTIME_QUESTIONS.map((q, idx) => {
              const selectedOpt = testAnswers[q.id];
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
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center shrink-0 border border-slate-200">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Pregunta {idx + 1} de {MODULE4_OVERTIME_QUESTIONS.length} · {q.lawRef}
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

                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correctIndex === optIdx;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (testSubmitted) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-medium line-through';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'bg-emerald-50 border-[#39A900] text-[#00324D] font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={testSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
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

          <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-600 block">
                Estado del Test: {Object.keys(testAnswers).length} / {MODULE4_OVERTIME_QUESTIONS.length} respondidas
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
