import React, { useState } from 'react';
import { 
  LEGAL_CONSTANTS_2026, 
  ARL_RISK_CLASSES, 
  MATH_EXERCISES_DATA 
} from '../constants/colombia2026';
import { 
  calculatePayroll, 
  formatCOP, 
  CalculatorInputs 
} from '../utils/payrollCalculator';
import { 
  Calculator, 
  BookOpen, 
  Percent, 
  Coins, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  HelpCircle,
  FileSpreadsheet,
  Building,
  UserCheck,
  FileText
} from 'lucide-react';

export const Module4BenefitsAndExercises: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'concepts' | 'exercises' | 'calculator'>('exercises');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(MATH_EXERCISES_DATA[0].id);

  // Estados del Simulador Libre de Nómina 2026
  const [customSalary, setCustomSalary] = useState<number>(LEGAL_CONSTANTS_2026.SMMLV);
  const [customDays, setCustomDays] = useState<number>(30);
  const [customOtDiurna, setCustomOtDiurna] = useState<number>(0);
  const [customOtNocturna, setCustomOtNocturna] = useState<number>(0);
  const [customCommissions, setCustomCommissions] = useState<number>(0);
  const [customNonSalary, setCustomNonSalary] = useState<number>(0);
  const [customRiskLevel, setCustomRiskLevel] = useState<number>(1);
  const [customIsExempt, setCustomIsExempt] = useState<boolean>(true);

  // Validación estricta: en ningún caso el salario puede ser inferior a 1 SMMLV 2026
  const isBelowMinSalary = customSalary < LEGAL_CONSTANTS_2026.SMMLV;
  const enforcedSalary = Math.max(LEGAL_CONSTANTS_2026.SMMLV, customSalary);

  // Cálculo en vivo para el simulador libre
  const currentCalculation = calculatePayroll({
    baseSalary: enforcedSalary,
    daysWorked: customDays,
    overtimeHoursDiurna: customOtDiurna,
    overtimeHoursNocturna: customOtNocturna,
    commissions: customCommissions,
    nonSalaryAid: customNonSalary,
    riskClassLevel: customRiskLevel,
    isExemptEmployer: customIsExempt,
  });

  // Ejercicio seleccionado actualmente
  const selectedExercise = MATH_EXERCISES_DATA.find((e) => e.id === selectedExerciseId) || MATH_EXERCISES_DATA[0];
  const exerciseCalculation = calculatePayroll({
    baseSalary: selectedExercise.employeeProfile.baseSalary,
    daysWorked: selectedExercise.employeeProfile.daysWorked,
    overtimeHoursDiurna: selectedExercise.employeeProfile.overtimeHoursDiurna,
    commissions: selectedExercise.employeeProfile.commissions,
    nonSalaryAid: selectedExercise.employeeProfile.nonSalaryAid,
    applyTransportAllowance: selectedExercise.employeeProfile.hasTransportAllowance,
    riskClassLevel: selectedExercise.employeeProfile.riskClass,
    isExemptEmployer: selectedExercise.employeeProfile.isExemptEmployer,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-purple-700" />
              MÓDULO 5 PROVISIONES PRESTACIONES SOCIALES
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Liquidación de Prestaciones Sociales con Base en SMMLV 2026
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
              Fórmulas matemáticas y ejercicios resueltos paso a paso. Recuerda: según la legislación laboral 
              colombiana, en ningún caso el salario base de cotización podrá ser inferior a 1 SMMLV 
              ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)} COP para 2026).
            </p>
          </div>

          {/* Subtabs Selector */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('definitions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'definitions' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Definiciones
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'concepts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fórmulas y Porcentajes
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'exercises' ? 'bg-[#39A900] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Ejercicios Matemáticos Guiados
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator' ? 'bg-[#00324D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Calculadora Libre 2026
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 0: DEFINICIONES CLAVE EN COLOMBIA */}
      {activeTab === 'definitions' && (
        <div className="space-y-6">
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800">
                Marco Conceptual · Código Sustantivo del Trabajo (Colombia)
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                ¿Qué son las Prestaciones Sociales y las Vacaciones?
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Son beneficios adicionales al salario ordinario que la ley laboral colombiana garantiza a los trabajadores con contrato de trabajo, orientados a proteger su bienestar económico y descanso.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Prima de Servicios */}
            <div className="bg-white border-2 border-emerald-500/25 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <span className="text-xs font-black px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Prestación Social · Art. 306 CST
                </span>
                <span className="text-xs font-bold text-slate-500">30 días / año</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">1. Prima de Servicios</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Es una prestación social obligatoria equivalente a <strong>un mes de salario por cada año trabajado</strong> (o proporcional al tiempo laborado), mediante la cual el empleador comparte con el trabajador parte de los beneficios económicos de la empresa.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Pago semestral:</strong> 50% a más tardar el <strong>30 de junio</strong> y 50% en los primeros <strong>20 días de diciembre</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Base de cálculo:</strong> Salario devengado + Auxilio de Transporte (si aplica).</span>
                </li>
              </ul>
            </div>

            {/* 2. Cesantías */}
            <div className="bg-white border-2 border-blue-500/25 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <span className="text-xs font-black px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Prestación Social · Art. 249 CST
                </span>
                <span className="text-xs font-bold text-slate-500">1 mes / año</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">2. Cesantías</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Es un <strong>ahorro obligatorio</strong> equivalente a <strong>un mes de salario por cada año de servicio</strong> (o proporcional), creado como respaldo económico cuando el trabajador queda cesante (desempleado) o para financiar vivienda y educación superior.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Consignación anual:</strong> Se liquidan al 31 de diciembre y se consignan en el <strong>Fondo de Cesantías</strong> máximo el <strong>14 de febrero</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Base de cálculo:</strong> Salario base + Auxilio de Transporte (si aplica).</span>
                </li>
              </ul>
            </div>

            {/* 3. Intereses a las Cesantías */}
            <div className="bg-white border-2 border-amber-500/25 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <span className="text-xs font-black px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                  Rendimiento Legal · Ley 52 de 1975
                </span>
                <span className="text-xs font-bold text-slate-500">12% anual</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">3. Intereses a las Cesantías</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Es la <strong>utilidad o rendimiento financiero obligatorio del 12% anual</strong> (o proporcional al tiempo trabajado) que el empleador debe reconocer al trabajador sobre el saldo de las cesantías acumuladas durante el año.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Pago directo al trabajador:</strong> No van al fondo; se pagan por nómina a más tardar el <strong>31 de enero</strong> del año siguiente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Liquidación final:</strong> También se pagan directamente al terminar el contrato laboral.</span>
                </li>
              </ul>
            </div>

            {/* 4. Vacaciones */}
            <div className="bg-white border-2 border-purple-500/25 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <span className="text-xs font-black px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded">
                  Descanso Remunerado · Art. 186 CST
                </span>
                <span className="text-xs font-bold text-slate-500">15 días hábiles / año</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">4. Vacaciones</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Aunque contablemente se provisionan junto con las prestaciones, jurídicamente son un <strong>descanso remunerado obligatorio de 15 días hábiles consecutivos</strong> por cada año de servicio para preservar la salud y el bienestar del trabajador.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Compensación en dinero:</strong> Al finalizar el contrato sin disfrutarlas, o hasta el 50% en vigencia del contrato por acuerdo escrito.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Base de cálculo:</strong> Solo salario básico/ordinario (<strong>NO</strong> incluye Auxilio de Transporte ni horas extras al disfrutarse).</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#39A900] shrink-0" />
              <p className="text-slate-200 leading-relaxed">
                <strong className="text-white">Diferencia clave para liquidar nómina:</strong> Prima, Cesantías e Intereses sí incluyen el <strong>Auxilio de Transporte</strong> en su base; las <strong>Vacaciones</strong> no lo incluyen por corresponder a descanso laboral.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 1: FÓRMULAS Y PORCENTAJES DE PRESTACIONES SOCIALES */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Prima de Servicios */}
            <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  8.33% Mensual
                </span>
                <span className="text-xs text-slate-400 font-semibold">1 Mes / Año</span>
              </div>
              <h3 className="text-base font-black text-slate-900">Prima de Servicios</h3>
              <p className="text-xs text-slate-600">
                Pagadera en 2 cuotas: 50% máximo el 30 de junio y 50% en los primeros 20 días de diciembre.
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-emerald-950">
                (Base salarial + Auxilio) × Días / 360
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">
                ✓ SÍ incluye Auxilio de Transporte (Ley 1 de 1963).
              </div>
            </div>

            {/* Cesantías */}
            <div className="bg-white border-2 border-blue-500/30 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  8.33% Mensual
                </span>
                <span className="text-xs text-slate-400 font-semibold">1 Mes / Año</span>
              </div>
              <h3 className="text-base font-black text-slate-900">Cesantías de Ley</h3>
              <p className="text-xs text-slate-600">
                Consignadas obligatoriamente a más tardar el 14 de febrero en el fondo de cesantías elegido.
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-blue-950">
                (Base salarial + Auxilio) × Días / 360
              </div>
              <div className="text-[11px] text-blue-800 font-medium">
                ✓ SÍ incluye Auxilio de Transporte como factor.
              </div>
            </div>

            {/* Intereses sobre Cesantías */}
            <div className="bg-white border-2 border-amber-500/30 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                  1.0% Mes (12% Año)
                </span>
                <span className="text-xs text-slate-400 font-semibold">Pago Directo</span>
              </div>
              <h3 className="text-base font-black text-slate-900">Intereses Cesantías</h3>
              <p className="text-xs text-slate-600">
                Se pagan directamente al trabajador en su cuenta de nómina a más tardar el 31 de enero.
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-amber-950">
                (Cesantías × Días × 0.12) / 360
              </div>
              <div className="text-[11px] text-amber-800 font-medium">
                ✓ Rinde el 12% anual sobre el valor acumulado.
              </div>
            </div>

            {/* Vacaciones */}
            <div className="bg-white border-2 border-purple-500/30 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                  4.17% Mensual
                </span>
                <span className="text-xs text-slate-400 font-semibold">15 Días Hábiles</span>
              </div>
              <h3 className="text-base font-black text-slate-900">Vacaciones</h3>
              <p className="text-xs text-slate-600">
                Descanso remunerado anual o compensación en dinero al término de la relación laboral.
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-purple-950">
                (Salario básico × Días) / 720
              </div>
              <div className="text-[11px] text-rose-700 font-bold">
                ✕ NO incluye Auxilio de Transporte (descanso).
              </div>
            </div>
          </div>

          {/* Banner Dotación y Otros Beneficios */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center font-black text-slate-700">
                3x
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Dotación Legal de Calzado y Vestido de Labor (Art. 230 CST)
                </h4>
                <p className="text-xs text-slate-500">
                  Obligatorio 3 veces al año (30 de abril, 31 de agosto y 20 de diciembre) para quienes devenguen hasta 2 SMMLV.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Entrega en especie • Prohibido compensar en dinero activo
            </span>
          </div>
        </div>
      )}

      {/* SUBTAB 2: EJERCICIOS MATEMÁTICOS DE EJEMPLO GUIADOS */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Exercise Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MATH_EXERCISES_DATA.map((ex) => {
              const isSelected = selectedExerciseId === ex.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExerciseId(ex.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#39A900] bg-emerald-50/80 shadow-md ring-2 ring-[#39A900]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    isSelected ? 'bg-[#39A900] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {ex.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                    {ex.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {ex.employeeProfile.role} • Salario: {formatCOP(ex.employeeProfile.baseSalary)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Exercise Workspace Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-[#00324D] tracking-wider">
                  Caso de Estudio SENA • Liquidación Completa
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {selectedExercise.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  {selectedExercise.description}
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Imprimir Caso
              </button>
            </div>

            {/* Guided Mathematical Steps */}
            <div className="space-y-6">
              {/* PASO 1: Ingresos Devengados */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00324D] text-white flex items-center justify-center text-[10px]">1</span>
                    Paso 1: Determinación de Ingresos y Devengados (CST Art. 127)
                  </h4>
                  <span className="text-xs font-bold text-slate-900">
                    Total Devengado: {formatCOP(exerciseCalculation.totalGrossDevengado)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Sueldo Básico:</span>
                    <strong className="text-slate-900">{formatCOP(exerciseCalculation.baseSalary)}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Auxilio de Transporte:</span>
                    <strong className="text-emerald-700">{formatCOP(exerciseCalculation.transportAllowance)}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Horas Extras / Recargos:</span>
                    <strong className="text-slate-900">{formatCOP(exerciseCalculation.overtimeValue)}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Comisiones Habituales:</span>
                    <strong className="text-slate-900">{formatCOP(exerciseCalculation.commissionsValue)}</strong>
                  </div>
                </div>
              </div>

              {/* PASO 2: Deducciones Trabajador */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">2</span>
                    Paso 2: Deducciones del Trabajador y Salario Neto en Cuenta
                  </h4>
                  <span className="text-xs font-bold text-blue-900">
                    Neto a Pagar: {formatCOP(exerciseCalculation.netSalaryToPay)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-slate-500 block">Salud (4% sobre IBC):</span>
                    <strong className="text-slate-900">{formatCOP(exerciseCalculation.employeeHealth)}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">IBC: {formatCOP(exerciseCalculation.ibcSeguridadSocial)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-slate-500 block">Pensión (4% sobre IBC):</span>
                    <strong className="text-slate-900">{formatCOP(exerciseCalculation.employeePension)}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">IBC: {formatCOP(exerciseCalculation.ibcSeguridadSocial)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-slate-500 block">Fondo Solidaridad (FSP):</span>
                    <strong className="text-amber-800">{formatCOP(exerciseCalculation.employeeSolidarityPension)}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Para salarios ≥ 4 SMMLV</span>
                  </div>
                  <div className="bg-blue-900 text-white p-3 rounded-xl">
                    <span className="text-blue-200 block text-[11px]">Neto Recibido:</span>
                    <strong className="text-sm font-black text-cyan-300">{formatCOP(exerciseCalculation.netSalaryToPay)}</strong>
                  </div>
                </div>
              </div>

              {/* PASO 3: Provisiones de Prestaciones Sociales */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#00324D] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-[10px]">3</span>
                    Paso 3: Fórmulas Matemáticas de Prestaciones Sociales de Ley
                  </h4>
                  <span className="text-xs font-bold text-emerald-900">
                    Total Provisiones: {formatCOP(exerciseCalculation.totalPrestacionesSociales)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Prima */}
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">Prima (8.33%):</span>
                      <span className="text-emerald-800">{formatCOP(exerciseCalculation.primaServicios)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      ({formatCOP(exerciseCalculation.totalSalaryDevengado + exerciseCalculation.transportAllowance)} × 30) / 360
                    </p>
                  </div>

                  {/* Cesantías */}
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">Cesantías (8.33%):</span>
                      <span className="text-emerald-800">{formatCOP(exerciseCalculation.cesantias)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      ({formatCOP(exerciseCalculation.totalSalaryDevengado + exerciseCalculation.transportAllowance)} × 30) / 360
                    </p>
                  </div>

                  {/* Intereses */}
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">Intereses (1% mes):</span>
                      <span className="text-emerald-800">{formatCOP(exerciseCalculation.interesesCesantias)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      ({formatCOP(exerciseCalculation.cesantias)} × 30 × 0.12) / 360
                    </p>
                  </div>

                  {/* Vacaciones */}
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">Vacaciones (4.17%):</span>
                      <span className="text-emerald-800">{formatCOP(exerciseCalculation.vacaciones)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      ({formatCOP(exerciseCalculation.proportionalSalary)} × 30) / 720
                    </p>
                    <span className="text-[9px] text-purple-700 block font-semibold">*Sin auxilio transporte</span>
                  </div>
                </div>
              </div>

              {/* PASO 4: Costo Total Empresa */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">4</span>
                    Paso 4: Costo Total Integral de Contratación para el Empleador
                  </h4>
                  <span className="text-sm sm:text-base font-black text-emerald-300">
                    Costo Empresa: {formatCOP(exerciseCalculation.totalEmployerCost)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[11px] text-slate-400">Nómina Bruta Devengada:</span>
                    <strong className="text-white">{formatCOP(exerciseCalculation.totalGrossDevengado)}</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[11px] text-slate-400">Prestaciones Sociales:</span>
                    <strong className="text-white">{formatCOP(exerciseCalculation.totalPrestacionesSociales)}</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[11px] text-slate-400">Seguridad Social Patronal:</span>
                    <strong className="text-white">{formatCOP(exerciseCalculation.totalSeguridadSocialEmployer)}</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="block text-[11px] text-slate-400">Parafiscales Patronales:</span>
                    <strong className="text-white">{formatCOP(exerciseCalculation.totalParafiscalesEmployer)}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 flex justify-between">
                  <span>Sobrecosto laboral sobre el salario básico: <strong>+{exerciseCalculation.costPercentageOverSalary.toFixed(1)}%</strong></span>
                  <span className="text-emerald-400 font-semibold">{selectedExercise.explanation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: CALCULADORA LIBRE DE NÓMINA 2026 */}
      {activeTab === 'calculator' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold px-2.5 py-1 bg-[#39A900]/20 text-[#00324D] rounded-md uppercase">
              Simulador Integral con Parámetros 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Calculadora Libre de Nómina y Provisiones
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ingresa cualquier asignación salarial. Nota: el sistema validará automáticamente que no sea 
              inferior al Salario Mínimo Legal Vigente para 2026 ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}).
            </p>
          </div>

          {/* Form & Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {/* Salario Básico con advertencia si es < SMMLV */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Salario Básico Mensual (COP) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    step="10000"
                    value={customSalary}
                    onChange={(e) => setCustomSalary(Number(e.target.value))}
                    className={`w-full pl-8 pr-4 py-2 bg-white rounded-xl border font-bold text-slate-900 text-sm focus:outline-hidden ${
                      isBelowMinSalary
                        ? 'border-rose-500 ring-2 ring-rose-200'
                        : 'border-slate-300 focus:border-[#39A900]'
                    }`}
                  />
                </div>

                {isBelowMinSalary ? (
                  <div className="mt-2 p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-[11px] text-rose-900 font-semibold flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      ¡Alerta legal! En Colombia el salario NO puede ser inferior a 1 SMMLV 2026 ({formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}).
                      El cálculo se ajustó automáticamente al piso legal mínimo.
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Equivalente a {(enforcedSalary / LEGAL_CONSTANTS_2026.SMMLV).toFixed(2)} SMMLV 2026.
                  </p>
                )}
              </div>

              {/* Días trabajados */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Días Laborados (Mes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={customDays}
                    onChange={(e) => setCustomDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Clase Riesgo ARL
                  </label>
                  <select
                    value={customRiskLevel}
                    onChange={(e) => setCustomRiskLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  >
                    {ARL_RISK_CLASSES.map((r) => (
                      <option key={r.level} value={r.level}>
                        Clase {r.level} ({r.rate}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Horas extras */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    H.E. Diurnas (+25%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={customOtDiurna}
                    onChange={(e) => setCustomOtDiurna(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    H.E. Nocturnas (+75%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={customOtNocturna}
                    onChange={(e) => setCustomOtNocturna(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Comisiones y No salariales */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Comisiones Salariales
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={customCommissions}
                    onChange={(e) => setCustomCommissions(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Auxilios No Salariales
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={customNonSalary}
                    onChange={(e) => setCustomNonSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Exoneración */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customIsExempt}
                    onChange={(e) => setCustomIsExempt(e.target.checked)}
                    className="w-4 h-4 text-[#39A900] rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Empresa exonerada de Salud, SENA e ICBF (Art. 114-1 E.T.)
                  </span>
                </label>
              </div>

              {/* Auxilio Transporte Note */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950">
                <strong>Auxilio de Transporte: </strong>
                {enforcedSalary <= LEGAL_CONSTANTS_2026.SMMLV * LEGAL_CONSTANTS_2026.MAX_SMMLV_FOR_TRANSPORT ? (
                  <span>
                    Aplica automáticamente ({formatCOP(LEGAL_CONSTANTS_2026.AUXILIO_TRANSPORTE)}) por devengar ≤ 2 SMMLV.
                  </span>
                ) : (
                  <span>No aplica ($0) por devengar más de 2 SMMLV.</span>
                )}
              </div>
            </div>

            {/* Calculations Dashboard Display */}
            <div className="lg:col-span-7 space-y-5">
              {/* Volante del Colaborador */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                  <span className="text-xs font-black uppercase text-blue-950 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-700" />
                    Liquidación Nómina Trabajador
                  </span>
                  <span className="text-xs font-bold text-blue-800">Mes 2026</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-600">Total Devengado Bruto:</span>
                    <span className="font-bold text-slate-900">{formatCOP(currentCalculation.totalGrossDevengado)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>- Aporte Salud Trabajador (4%):</span>
                    <span className="font-bold text-rose-700">-{formatCOP(currentCalculation.employeeHealth)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>- Aporte Pensión Trabajador (4%):</span>
                    <span className="font-bold text-rose-700">-{formatCOP(currentCalculation.employeePension)}</span>
                  </div>
                  {currentCalculation.employeeSolidarityPension > 0 && (
                    <div className="flex justify-between text-amber-800 font-medium">
                      <span>- Fondo Solidaridad Pensional (FSP):</span>
                      <span className="font-bold">-{formatCOP(currentCalculation.employeeSolidarityPension)}</span>
                    </div>
                  )}
                  {currentCalculation.retentionSource > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>- Retención en la Fuente Laboral:</span>
                      <span className="font-bold text-rose-700">-{formatCOP(currentCalculation.retentionSource)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-blue-200 flex justify-between items-center text-sm font-black text-blue-950">
                    <span>Neto a Pagar en Cuenta:</span>
                    <span className="text-base text-blue-900 font-extrabold">{formatCOP(currentCalculation.netSalaryToPay)}</span>
                  </div>
                </div>
              </div>

              {/* Provisiones y Costo Patronal */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <span className="text-xs font-black uppercase text-[#00324D] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#39A900]" />
                    Provisiones y Costos Patronales de Nómina
                  </span>
                  <span className="text-xs font-black text-emerald-900">
                    +{currentCalculation.costPercentageOverSalary.toFixed(1)}% Costo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 block">Cesantías (8.33%):</span>
                    <strong className="text-slate-900">{formatCOP(currentCalculation.cesantias)}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 block">Intereses (1% mes):</span>
                    <strong className="text-slate-900">{formatCOP(currentCalculation.interesesCesantias)}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 block">Prima Servicios (8.33%):</span>
                    <strong className="text-slate-900">{formatCOP(currentCalculation.primaServicios)}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 block">Vacaciones (4.17%):</span>
                    <strong className="text-slate-900">{formatCOP(currentCalculation.vacaciones)}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Provisiones Prestaciones:</span>
                    <span className="font-bold text-emerald-900">{formatCOP(currentCalculation.totalPrestacionesSociales)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Seguridad Social Patronal (Salud+Pensión+ARL):</span>
                    <span className="font-bold text-slate-800">{formatCOP(currentCalculation.totalSeguridadSocialEmployer)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Parafiscales (CCF+SENA+ICBF):</span>
                    <span className="font-bold text-slate-800">{formatCOP(currentCalculation.totalParafiscalesEmployer)}</span>
                  </div>
                </div>

                {/* Total Costo Empresa */}
                <div className="bg-[#00324D] text-white p-3.5 rounded-xl flex justify-between items-center font-bold">
                  <div>
                    <span className="text-xs text-slate-300 block">Costo Total Mensual Empresa:</span>
                    <span className="text-base sm:text-lg font-black text-emerald-300">
                      {formatCOP(currentCalculation.totalEmployerCost)}
                    </span>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Imprimir Volante
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
