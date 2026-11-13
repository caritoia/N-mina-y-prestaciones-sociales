import React, { useState } from 'react';
import { CST_SALARY_ARTICLES, LEGAL_CONSTANTS_2026 } from '../constants/colombia2026';
import { CSTArticle } from '../types/payroll';
import { formatCOP } from '../utils/payrollCalculator';
import { 
  Coins, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  HelpCircle, 
  Calculator, 
  AlertTriangle, 
  BookOpen, 
  Check, 
  X,
  FileCheck2,
  PieChart,
  CheckSquare,
  Award,
  RotateCcw,
  Send
} from 'lucide-react';

const MODULE2_TEST_QUESTIONS = [
  {
    id: 1,
    question: '1. Según el Artículo 127 del CST, ¿cuál de los siguientes conceptos constituye SIEMPRE salario pleno para liquidar prestaciones sociales y seguridad social?',
    options: [
      'El auxilio de transporte legal',
      'Las comisiones mensuales y porcentajes sobre ventas',
      'Las propinas voluntarias recibidas de los clientes',
      'Las herramientas de trabajo entregadas por la empresa'
    ],
    correctIndex: 1,
    articleRef: 'Art. 127 CST',
    explanation: 'El Art. 127 del CST establece que constituyen salario las comisiones y porcentajes sobre ventas por ser contraprestación directa e inmediata del servicio prestado.'
  },
  {
    id: 2,
    question: '2. De acuerdo con el Artículo 128 del CST, ¿qué condición formal es indispensable para que un auxilio o bonificación habitual NO constituya salario?',
    options: [
      'Que el pago no supere los $500.000 COP mensuales',
      'Que exista un pacto o acuerdo expreso por escrito entre el trabajador y el empleador',
      'Que el trabajador devengue más de 10 SMMLV',
      'Que se entregue en bonos o vales de papel únicamente'
    ],
    correctIndex: 1,
    articleRef: 'Art. 128 CST',
    explanation: 'Para desalarizar válidamente auxilios habituales, el Art. 128 del CST exige que conste por pacto escrito explícito entre las partes.'
  },
  {
    id: 3,
    question: '3. ¿Cuál es el tope legal máximo permitido para remunerar con Salario en Especie (Art. 129 CST) a un trabajador que devenga el SMMLV ($1.750.905 COP)?',
    options: [
      'Hasta el 50% del salario básico',
      'Hasta el 30% del salario básico ($525.272 COP)',
      'Hasta el 20% del salario básico',
      'No se permite salario en especie para trabajadores del salario mínimo'
    ],
    correctIndex: 1,
    articleRef: 'Art. 129 CST',
    explanation: 'El Art. 129 del CST dispone que cuando el trabajador devenga el salario mínimo legal, el salario en especie no podrá exceder del 30%.'
  },
  {
    id: 4,
    question: '4. Según el Artículo 130 del CST sobre Viáticos, ¿cuáles de las siguientes sumas entregadas por la empresa sí constituyen salario?',
    options: [
      'Los viáticos accidentales por requerimientos extraordinarios',
      'Los viáticos permanentes destinados a manutención y hospedaje del trabajador',
      'Los pasajes de transporte aéreo o terrestre',
      'Los gastos de representación reembolsados contra factura'
    ],
    correctIndex: 1,
    articleRef: 'Art. 130 CST',
    explanation: 'Los viáticos permanentes en la parte que proporcionan manutención y alojamiento constituyen salario; los de transporte y accidentales nunca son salario.'
  },
  {
    id: 5,
    question: '5. Conforme al Artículo 131 del CST, ¿cuál es la regulación legal respecto a las Propinas que reciben los empleados?',
    options: [
      'Constituyen salario y se le pueden retener al trabajador para completar el sueldo básico',
      'Constituyen salario únicamente para calcular el valor de las vacaciones',
      'NO constituyen salario ni pueden pactarse para compensar o sustituir el sueldo básico',
      'Son de propiedad exclusiva de la empresa'
    ],
    correctIndex: 2,
    articleRef: 'Art. 131 CST',
    explanation: 'Las propinas son gratificaciones voluntarias del cliente, no constituyen salario y el empleador no puede usarlas para pagar el salario mínimo.'
  },
  {
    id: 6,
    question: '6. Para pactar la figura de Salario Integral (Art. 132 CST) en 2026, ¿cuál es la asignación mensual mínima legal que se debe fijar?',
    options: [
      '10 SMMLV',
      '13 SMMLV ($22.761.765 COP: 10 SMMLV básico + 3 SMMLV factor prestacional del 30%)',
      '15 SMMLV',
      '8 SMMLV'
    ],
    correctIndex: 1,
    articleRef: 'Art. 132 CST',
    explanation: 'El salario integral en Colombia requiere mínimo 10 SMMLV de salario básico más un 30% de factor prestacional (3 SMMLV), sumando un piso de 13 SMMLV.'
  },
  {
    id: 7,
    question: '7. En la modalidad de Salario Integral, ¿cuál de los siguientes derechos del trabajador NO queda compensado de antemano y debe concederse legalmente?',
    options: [
      'Las Cesantías e Intereses sobre Cesantías',
      'La Prima de Servicios legal',
      'El descanso remunerado por Vacaciones',
      'Los recargos nocturnos ordinarios'
    ],
    correctIndex: 2,
    articleRef: 'Art. 132 CST',
    explanation: 'El salario integral compensa primas, cesantías y recargos, pero NO compensa el derecho al descanso remunerado por Vacaciones, las cuales se disfrutan o liquidan.'
  },
  {
    id: 8,
    question: '8. En aplicación de la Regla del 40% (Art. 30 Ley 1393 de 2010), ¿qué efecto jurídico ocurre si los pagos no salariales superan el 40% de la remuneración total?',
    options: [
      'Se anula el contrato de trabajo con sanción de la UGPP',
      'El monto excedente sobre el 40% se suma obligatoriamente a la base IBC de cotización a Seguridad Social',
      'Se exime a la empresa del pago de aportes a pensión',
      'El trabajador debe devolver los auxilios cobrados'
    ],
    correctIndex: 1,
    articleRef: 'Art. 30 Ley 1393 de 2010',
    explanation: 'La Ley 1393 establece que los pagos no salariales que excedan el 40% de la remuneración total integrarán la base IBC para liquidar aportes a Salud, Pensión y ARL.'
  },
  {
    id: 9,
    question: '9. Según el Artículo 134 del CST sobre Períodos de Pago, ¿cuál es el lapso máximo legal permitido para cancelar los sueldos en dinero a los empleados?',
    options: [
      'Máximo una (1) semana',
      'Máximo una (1) quincena',
      'Máximo un (1) mes',
      'Máximo tres (3) meses'
    ],
    correctIndex: 2,
    articleRef: 'Art. 134 CST',
    explanation: 'El Art. 134 del CST fija que el período de pago para sueldos no puede ser mayor a un (1) mes, y para jornales (pago por días) no mayor a una semana.'
  },
  {
    id: 10,
    question: '10. Conforme a las normas de inembargabilidad del salario (Arts. 154 a 156 CST), ¿en qué casos excepcionales se puede embargar hasta el 50% del Salario Mínimo (SMMLV)?',
    options: [
      'Por deudas financieras de tarjetas de crédito o créditos de libre inversión',
      'Únicamente por cobros de cooperativas autorizadas y por demandas de cuota alimentaria',
      'Por deudas de arriendo o servicios públicos',
      'El salario mínimo es inembargable en un 100% bajo cualquier circunstancia'
    ],
    correctIndex: 1,
    articleRef: 'Art. 156 CST',
    explanation: 'El SMMLV es inembargable por deudas ordinarias, pero el Art. 156 del CST autoriza embargos de hasta un 50% a favor de cooperativas y demandas de alimentos.'
  }
];

export const Module2SalaryCST: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<CSTArticle>(CST_SALARY_ARTICLES[0]);
  const [activeTab, setActiveTab] = useState<'articles' | 'comparison' | 'rule40' | 'quiz' | 'test10'>('articles');

  // Estados para la Prueba de Conocimientos (10 Preguntas)
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testValidationError, setTestValidationError] = useState<boolean>(false);

  // Estados para el Simulador de la Regla del 40% (Ley 1393 de 2010 Art. 30)
  const [baseSalaryInput, setBaseSalaryInput] = useState<number>(3000000);
  const [nonSalaryAidInput, setNonSalaryAidInput] = useState<number>(2500000);

  // Cálculos de la Regla del 40%
  const totalRemuneration = baseSalaryInput + nonSalaryAidInput;
  const maxAllowedNonSalary = totalRemuneration * 0.40;
  const excessNonSalary = Math.max(0, nonSalaryAidInput - maxAllowedNonSalary);
  const ibcAdjusted = baseSalaryInput + excessNonSalary;
  const isViolating40Percent = excessNonSalary > 0;

  // Estados para el Quiz didáctico "¿Constituye o no Salario?"
  const quizQuestions = [
    {
      concept: 'Comisiones mensuales liquidadas por ventas logradas por el empleado',
      isSalary: true,
      articleRef: 'Art. 127 CST',
      justification: 'Constituye salario pleno al ser retribución directa por la labor comercial.',
    },
    {
      concept: 'Auxilio de alimentación de $300.000 pactado expresamente como NO salarial mediante otrosí',
      isSalary: false,
      articleRef: 'Art. 128 CST',
      justification: 'No constituye salario para prestaciones ni parafiscales (siempre que respete el tope del 40% de la Ley 1393).',
    },
    {
      concept: 'Viáticos permanentes girados para hospedaje y alimentación de un supervisor',
      isSalary: true,
      articleRef: 'Art. 130 CST',
      justification: 'Los viáticos permanentes destinados a manutención y alojamiento son salario en Colombia.',
    },
    {
      concept: 'Las propinas voluntarias recibidas de los comensales por un mesero',
      isSalary: false,
      articleRef: 'Art. 131 CST',
      justification: 'Las propinas NO constituyen salario ni pueden compensar el sueldo mínimo.',
    },
    {
      concept: 'El valor de las horas extras nocturnas y recargos festivos trabajados',
      isSalary: true,
      articleRef: 'Art. 127 CST',
      justification: 'Todo trabajo suplementario u horas extras constituye salario para todos los efectos legales.',
    },
    {
      concept: 'El auxilio de transporte legal otorgado a un trabajador que devenga 1 SMMLV',
      isSalary: false,
      articleRef: 'Ley 1 de 1963',
      justification: 'Por mandato legal NO es salario (no cotiza a EPS ni Pensión), aunque por ficción de ley se suma ÚNICAMENTE para Prima y Cesantías.',
    },
  ];

  const [quizIndex, setQuizIndex] = useState(0);
  const [userSelection, setUserSelection] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const handleQuizAnswer = (answer: boolean) => {
    if (userSelection !== null) return;
    setUserSelection(answer);
    setAnsweredCount(answeredCount + 1);
    if (answer === quizQuestions[quizIndex].isSalary) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setUserSelection(null);
    setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  // Manejadores de la prueba de conocimientos de Módulo 2 (10 Preguntas)
  const handleSelectTestOption = (questionId: number, optionIndex: number) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (testValidationError) setTestValidationError(false);
  };

  const handleSubmitTest = () => {
    const answeredCount = Object.keys(testAnswers).length;
    if (answeredCount < MODULE2_TEST_QUESTIONS.length) {
      setTestValidationError(true);
      return;
    }
    setTestValidationError(false);
    setTestSubmitted(true);
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestValidationError(false);
  };

  const calculateTestScore = () => {
    let score = 0;
    MODULE2_TEST_QUESTIONS.forEach((q) => {
      if (testAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Coins className="w-4 h-4 text-amber-700" />
              Módulo 2 • Régimen Salarial en Colombia
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Definición de Salario y Factores (CST Arts. 127 a 142)
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
              Criterios doctrinales y normativos para distinguir pagos constitutivos de salario de aquellos
              desalarizados, con la aplicación de la Regla del 40% (Ley 1393 de 2010).
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'articles' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Artículos 127 a 142
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'comparison' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriz Comparativa
            </button>
            <button
              onClick={() => setActiveTab('rule40')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rule40' ? 'bg-[#39A900] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Regla del 40% (Ley 1393)
            </button>
            <button
              onClick={() => setActiveTab('test10')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'test10' ? 'bg-[#00324D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Prueba de Conocimientos (10 Preguntas)
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: EXPLORADOR DE ARTÍCULOS 127 A 142 */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Pill Selector */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Índice Normativo del CST
            </div>
            {CST_SALARY_ARTICLES.map((item) => {
              const isSelected = selectedArticle.article === item.article;
              return (
                <button
                  key={item.article}
                  onClick={() => setSelectedArticle(item)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#39A900] bg-emerald-50/70 shadow-xs ring-1 ring-[#39A900]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-[#00324D]">{item.article}</span>
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.summary}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.isSalary === true
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.isSalary === false
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.isSalary === true ? 'Salario' : item.isSalary === false ? 'No Salario' : 'Mixto'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Article Full Detail View */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                  Código Sustantivo del Trabajo • {selectedArticle.article}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {selectedArticle.title}
                </h2>
              </div>

              <div
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 ${
                  selectedArticle.isSalary === true
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : selectedArticle.isSalary === false
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {selectedArticle.isSalary === true ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Constitutivo de Salario</span>
                  </>
                ) : selectedArticle.isSalary === false ? (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>NO Constitutivo de Salario</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Regulado Mixto</span>
                  </>
                )}
              </div>
            </div>

            {/* Texto Exegético Legal */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#39A900]" /> Texto Oficial de la Ley
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-serif">
                "{selectedArticle.fullText}"
              </p>
            </div>

            {/* Caso Práctico y Ejemplo Real */}
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00324D] mb-1.5 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#39A900]" /> Ejemplo Práctico en la Empresa
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {selectedArticle.practicalExample}
              </p>
            </div>

            {/* Impacto en la Nómina y Aportes */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-700" /> Impacto en Liquidación y Nómina
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {selectedArticle.impactOnPayroll}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MATRIZ COMPARATIVA DE FACTORES */}
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna: Constituyen Salario (Art. 127 CST) */}
          <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                ✓
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Conceptos que SÍ Constituyen Salario (Art. 127)
                </h3>
                <p className="text-xs text-slate-500">Contraprestación directa del servicio prestado</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Sueldo Básico u Ordinario:</strong> Fijo o pactado por unidad de tiempo.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Comisiones y Porcentajes sobre Ventas:</strong> Retribución del rendimiento.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Horas Extras y Recargos:</strong> Trabajo nocturno, dominical y festivo suplementario.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Bonificaciones Habituales:</strong> Primas recurrentes no pactadas como no salariales.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Salario en Especie:</strong> Vivienda y alimentación (hasta 30% en SMMLV, Art. 129).
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Viáticos Permanentes:</strong> Específicamente la parte destinada a manutención y hospedaje.
                </div>
              </li>
            </ul>

            <div className="bg-emerald-100/70 p-3 rounded-xl text-[11px] text-emerald-900 font-semibold">
              Efecto legal: Hacen base obligatoria para liquidar Prestaciones Sociales, Seguridad Social y Parafiscales.
            </div>
          </div>

          {/* Columna: NO Constituyen Salario (Art. 128 CST) */}
          <div className="bg-white border-2 border-rose-500/30 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black">
                ✕
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Conceptos que NO Constituyen Salario (Art. 128)
                </h3>
                <p className="text-xs text-slate-500">Mera liberalidad, herramientas o auxilios desalarizados</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Mera Liberalidad Ocasional:</strong> Bonos otorgados por una sola vez sin pacto de continuidad.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Prestaciones Sociales Legales:</strong> Cesantías, intereses, prima legal y vacaciones.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Herramientas de Trabajo:</strong> Computador, celular corporativo, dotación, gasolina requerida para operar.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Auxilios Extralegales con Pacto Expreso:</strong> Bonos de alimentación o medicina prepagada pactados por otrosí.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Propinas (Art. 131 CST):</strong> No son salario ni pueden sustituir el sueldo base.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Viáticos Accidentales o Medios de Transporte:</strong> Pasajes aéreos o taxis en desplazamientos.
                </div>
              </li>
            </ul>

            <div className="bg-amber-100/70 p-3 rounded-xl text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              Límite legal: No pueden superar el 40% de la remuneración mensual total (Ley 1393/2010 Art. 30).
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SIMULADOR DE LA REGLA DEL 40% (LEY 1393) */}
      {activeTab === 'rule40' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold px-2.5 py-1 bg-[#39A900]/20 text-[#00324D] rounded-md uppercase">
              Auditoría UGPP & Seguridad Social
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Simulador de la Regla del 40% de Desalarización (Art. 30 Ley 1393 de 2010)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              En Colombia, para evitar la evasión de aportes parafiscales y a la seguridad social mediante pactos 
              desalarizados excesivos, la ley dispone que los pagos no salariales que excedan el 40% de la remuneración 
              total se integrarán obligatoriamente al Ingreso Base de Cotización (IBC).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Salario Básico Mensual (Constitutivo)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    min={LEGAL_CONSTANTS_2026.SMMLV}
                    step="50000"
                    value={baseSalaryInput}
                    onChange={(e) => setBaseSalaryInput(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Mínimo legal 2026: {formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pagos Acordados como NO Salariales (Art. 128)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={nonSalaryAidInput}
                    onChange={(e) => setNonSalaryAidInput(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Auxilios de alimentación, medicina prepagada, rodamiento, bonos de gasolina.
                </p>
              </div>

              {/* Botones de Preajuste Rápido */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => { setBaseSalaryInput(2000000); setNonSalaryAidInput(500000); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-medium cursor-pointer"
                >
                  Ejemplo Normal (20% No Salarial)
                </button>
                <button
                  onClick={() => { setBaseSalaryInput(3000000); setNonSalaryAidInput(3000000); }}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 font-medium cursor-pointer"
                >
                  Ejemplo Con Exceso (50% No Salarial)
                </button>
              </div>
            </div>

            {/* Results Card */}
            <div className={`p-6 rounded-2xl border-2 space-y-4 ${
              isViolating40Percent ? 'bg-amber-50/60 border-amber-400' : 'bg-emerald-50/60 border-emerald-400'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Dictamen de Aportes Seguridad Social
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  isViolating40Percent ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {isViolating40Percent ? 'Excede el Límite del 40%' : 'Dentro del Límite Legal'}
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">Total Remuneración Bruta:</span>
                  <span className="font-bold text-slate-900">{formatCOP(totalRemuneration)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">Tope Máximo No Salarial Permitido (40%):</span>
                  <span className="font-bold text-emerald-800">{formatCOP(maxAllowedNonSalary)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">Pagos No Salariales Declarados:</span>
                  <span className="font-bold text-slate-900">{formatCOP(nonSalaryAidInput)}</span>
                </div>
                <div className="flex justify-between py-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800">Exceso Sujeto a Cotización:</span>
                  <span className={`font-black ${isViolating40Percent ? 'text-rose-600' : 'text-slate-500'}`}>
                    {formatCOP(excessNonSalary)}
                  </span>
                </div>
                <div className="flex justify-between py-2 bg-[#00324D] text-white p-3 rounded-xl font-bold">
                  <span>IBC Definitivo para Seguridad Social:</span>
                  <span className="text-emerald-300 text-base">{formatCOP(ibcAdjusted)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 leading-relaxed">
                {isViolating40Percent ? (
                  <p className="text-amber-900 font-medium">
                    ⚠️ <strong>Consecuencia UGPP:</strong> La empresa y el empleado deberán pagar aportes a Salud (12.5%),
                    Pensión (16%) y ARL sobre <strong>{formatCOP(ibcAdjusted)}</strong> (y no solo sobre los {formatCOP(baseSalaryInput)} del básico),
                    debido a que se excedió en {formatCOP(excessNonSalary)} el límite legal del 40%.
                  </p>
                ) : (
                  <p className="text-emerald-900 font-medium">
                    ✓ <strong>Cumplimiento correcto:</strong> Los pagos no salariales no superan el 40% de la remuneración mensual,
                    por lo que la base de cotización a seguridad social será exactamente el salario básico ({formatCOP(baseSalaryInput)}).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}



      {/* SUBTAB 5: PRUEBA DE CONOCIMIENTOS DE MÓDULO 2 (10 PREGUNTAS) */}
      {activeTab === 'test10' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00324D] text-white text-xs font-bold mb-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Evaluación Sumativa Módulo 2 • 10 Preguntas
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Prueba de Conocimientos en Régimen Salarial y Factores
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Selecciona la respuesta correcta para cada una de las 10 preguntas sobre la definición de salario, pagos desalarizados, 
                salario en especie, viáticos, salario integral y la Regla del 40% (Ley 1393).
              </p>
            </div>

            {/* Score & Progress Badge */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-right shrink-0">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Progreso Respuestas
              </span>
              <strong className="text-lg font-black text-[#00324D]">
                {Object.keys(testAnswers).length} / {MODULE2_TEST_QUESTIONS.length}
              </strong>
            </div>
          </div>

          {/* Results Summary Banner (Visible upon submission) */}
          {testSubmitted && (
            <div className={`p-6 rounded-3xl border-2 space-y-4 animate-in fade-in ${
              calculateTestScore() >= 7 
                ? 'bg-emerald-50/90 border-[#39A900] text-emerald-950' 
                : 'bg-amber-50/90 border-amber-400 text-amber-950'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white ${
                    calculateTestScore() >= 7 ? 'bg-[#39A900]' : 'bg-amber-600'
                  }`}>
                    {calculateTestScore() >= 7 ? '✓' : '!'}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Resultado Final de la Evaluación
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                      {calculateTestScore() >= 7 ? '¡Aprobado con Éxito!' : 'Necesita Repasar la Normativa Salarial'}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Obtuviste <strong>{calculateTestScore()} de 10 aciertos</strong> ({(calculateTestScore() * 10)}%).
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetTest}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  Reintentar Prueba
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Total Aciertos:</span>
                  <strong className="text-emerald-700 text-sm">{calculateTestScore()} Correctas</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Total Errores:</span>
                  <strong className="text-rose-700 text-sm">{MODULE2_TEST_QUESTIONS.length - calculateTestScore()} Incorrectas</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Porcentaje:</span>
                  <strong className="text-slate-900 text-sm">{(calculateTestScore() * 10)}%</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Estado Módulo 2:</span>
                  <strong className={calculateTestScore() >= 7 ? 'text-[#39A900] text-sm' : 'text-amber-800 text-sm'}>
                    {calculateTestScore() >= 7 ? 'Competencia Demostrada' : 'Revisión Sugerida'}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error Warning */}
          {testValidationError && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-900 font-bold flex items-center gap-2 animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>
                ¡Atención! Para enviar la evaluación debes responder las 10 preguntas. Faltan por responder {MODULE2_TEST_QUESTIONS.length - Object.keys(testAnswers).length} pregunta(s).
              </span>
            </div>
          )}

          {/* 10 Questions Form List */}
          <div className="space-y-6">
            {MODULE2_TEST_QUESTIONS.map((q) => {
              const selectedOpt = testAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    testSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-rose-50/50 border-rose-300'
                      : isAnswered
                      ? 'bg-slate-50/90 border-[#39A900]/50'
                      : 'bg-slate-50/40 border-slate-200'
                  }`}
                >
                  {/* Question Title & Article Badge */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex-1">
                      {q.question}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded shrink-0">
                      {q.articleRef}
                    </span>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((option, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = optIdx === q.correctIndex;

                      let btnStyle = 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-100/70';

                      if (testSubmitted) {
                        if (isThisCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-400';
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-100 text-rose-950 font-bold';
                        } else {
                          btnStyle = 'border-slate-200 bg-white/60 text-slate-400 opacity-60';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold ring-1 ring-[#39A900]';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={testSubmitted}
                          onClick={() => handleSelectTestOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span className="flex-1 font-medium">
                            <strong className="mr-1.5 opacity-70">
                              {String.fromCharCode(65 + optIdx)})
                            </strong>
                            {option}
                          </span>

                          {/* Icons upon submission */}
                          {testSubmitted && (
                            <span>
                              {isThisCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isThisSelected && !isThisCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legal Justification Box (Shown after submission) */}
                  {testSubmitted && (
                    <div className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                      isCorrect 
                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950' 
                        : 'bg-rose-100/80 border-rose-300 text-rose-950'
                    }`}>
                      <div className="flex items-center gap-1.5 font-extrabold">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>¡Acierto! Fundamento Legal:</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-700" />
                            <span>Respuesta Incorrecta • Fundamento Legal:</span>
                          </>
                        )}
                        <span className="underline">{q.articleRef}</span>
                      </div>
                      <p className="font-medium text-slate-800">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Footer: Submit or Reset */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              {testSubmitted ? (
                <span>Evaluación finalizada • Revisa los aciertos y errores en cada pregunta.</span>
              ) : (
                <span>Responde las 10 preguntas para habilitar el envío de resultados.</span>
              )}
            </div>

            {!testSubmitted ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-3 rounded-xl bg-[#39A900] hover:bg-[#39A900]/90 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Respuestas y Ver Resultados
              </button>
            ) : (
              <button
                onClick={handleResetTest}
                className="px-6 py-3 rounded-xl bg-[#00324D] hover:bg-[#00324D]/90 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                Realizar Nueva Evaluación
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
