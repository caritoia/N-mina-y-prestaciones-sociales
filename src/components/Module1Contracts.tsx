import React, { useState } from 'react';
import { CONTRACT_TYPES } from '../constants/colombia2026';
import { ContractTypeInfo } from '../types/payroll';
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle, 
  Search, 
  Briefcase, 
  ShieldAlert, 
  ExternalLink,
  TableProperties,
  CheckSquare,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Send,
  AlertTriangle
} from 'lucide-react';

const MODULE1_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '1. ¿Cuál es la modalidad contractual en Colombia que NO admite renovaciones o prórrogas automáticas y finaliza estrictamente al culminar la tarea o proyecto?',
    options: [
      'Contrato de trabajo a término indefinido',
      'Contrato por Obra o Labor Determinada (Art. 45 CST)',
      'Contrato de trabajo a término fijo',
      'Contrato de prestación de servicios civil'
    ],
    correctIndex: 1,
    articleRef: 'Art. 45 CST',
    explanation: 'El contrato por obra o labor (Art. 45 CST) finaliza automáticamente al culminar la fase o proyecto convenido por escrito y no admite renovaciones sucesivas en cascada.'
  },
  {
    id: 2,
    question: '2. Según el Artículo 46 del CST, ¿cuál es el plazo máximo inicial por el cual se puede pactar un Contrato a Término Fijo?',
    options: [
      'Un (1) año',
      'Dos (2) años',
      'Tres (3) años',
      'Cinco (5) años'
    ],
    correctIndex: 2,
    articleRef: 'Art. 46 CST',
    explanation: 'El contrato a término fijo se puede pactar por períodos desde 1 día hasta un plazo máximo de tres (3) años, siendo renovable indefinidamente.'
  },
  {
    id: 3,
    question: '3. Conforme a la Ley 2466 de 2025 y el Decreto 0223 de 2026, ¿cuál es la naturaleza jurídica actual del Contrato de Aprendizaje SENA?',
    options: [
      'Contrato civil de prestación de servicios desalarizado',
      'Contrato de trabajo laboral especial a término fijo',
      'Convenio académico no remunerado',
      'Contrato comercial a término indefinido'
    ],
    correctIndex: 1,
    articleRef: 'Decreto 0223 de 2026 y Art. 81 CST',
    explanation: 'La reforma laboral (Ley 2466) y el Decreto 0223 de 2026 otorgaron la condición de contrato de trabajo laboral especial a término fijo al contrato de aprendizaje.'
  },
  {
    id: 4,
    question: '4. ¿Qué ocurre con un contrato a término fijo inferior a 1 año tras cumplirse tres (3) prórrogas sucesivas iguales o menores?',
    options: [
      'Se convierte automáticamente en contrato a término indefinido',
      'La cuarta prórroga debe ser obligatoriamente por un término mínimo de un (1) año',
      'Se extingue sin posibilidad legal de renovación',
      'Pasa a ser un contrato de prestación de servicios'
    ],
    correctIndex: 1,
    articleRef: 'Art. 46 CST',
    explanation: 'Según el Art. 46 del CST, al vencimiento del tercer período inferior a 1 año, la renovación siguiente será por un período mínimo de un (1) año completo.'
  },
  {
    id: 5,
    question: '5. En caso de despido sin justa causa en un contrato por obra o labor, ¿cuál es la indemnización legal fijada en el Art. 64 del CST?',
    options: [
      '30 días de salario fijos en todos los casos',
      'Los salarios correspondientes al tiempo que faltare para terminar la obra, mínimo 15 días de salario',
      '180 días de salario',
      'No genera indemnización por ser por obra'
    ],
    correctIndex: 1,
    articleRef: 'Art. 64 CST',
    explanation: 'El Art. 64 del CST establece que la indemnización en obra o labor equivale a los salarios del lapso que faltare para culminar la obra, nunca inferior a 15 días de salario.'
  },
  {
    id: 6,
    question: '6. ¿Cuál es el límite máximo legal permitido para el Período de Prueba en cualquier contrato laboral ordinario en Colombia?',
    options: [
      '15 días calendario',
      'Un (1) mes calendario',
      'Dos (2) meses calendario',
      'Seis (6) meses calendario'
    ],
    correctIndex: 2,
    articleRef: 'Art. 78 CST',
    explanation: 'El artículo 78 del CST estipula que el período de prueba no puede exceder en ningún caso de dos (2) meses calendario.'
  },
  {
    id: 7,
    question: '7. En un Contrato de Prestación de Servicios, si se comprueba subordinación continua y horario obligatorio, ¿qué principio declara el "Contrato Realidad"?',
    options: [
      'Principio de Libertad Contractual',
      'Principio de Primacía de la Realidad sobre las Formas (Art. 53 Constitución Política)',
      'Principio de Autonomía Civil',
      'Principio de Eficiencia Tributaria'
    ],
    correctIndex: 1,
    articleRef: 'Art. 53 Constitución Política de Colombia',
    explanation: 'El Art. 53 de la Constitución consagra que la realidad fáctica de la relación laboral prevalece sobre cualquier denominación escrita dada en contratos civiles.'
  },
  {
    id: 8,
    question: '8. Para terminar un contrato a término fijo por vencimiento del plazo pactado, ¿con cuántos días de anticipación debe notificarse el preaviso por escrito?',
    options: [
      'Mínimo 15 días calendario',
      'Mínimo 30 días calendario',
      'Mínimo 60 días calendario',
      'Se notifica el mismo día del vencimiento'
    ],
    correctIndex: 1,
    articleRef: 'Art. 46 CST',
    explanation: 'El empleador debe notificar por escrito la no renovación con al menos 30 días calendario de antelación; si no lo hace, el contrato se renueva de forma automática.'
  },
  {
    id: 9,
    question: '9. Según el Decreto 0223 de 2026, ¿cuáles son los derechos del aprendiz SENA durante la Etapa Productiva (Práctica)?',
    options: [
      'Apoyo del 50% del SMMLV únicamente con ARL',
      'Apoyo del 100% del SMMLV, Seguridad Social Integral (Salud, Pensión, ARL) y Prestaciones Sociales de Ley',
      'Honorarios de independiente sin primas ni cesantías',
      'Subsidio de transporte exclusivamente'
    ],
    correctIndex: 1,
    articleRef: 'Decreto 0223 de 2026',
    explanation: 'El Decreto 0223 de 2026 ratifica que en etapa productiva el aprendiz recibe el 100% del SMMLV + Salud, Pensión y ARL + Primas, Cesantías, Intereses y Vacaciones.'
  },
  {
    id: 10,
    question: '10. ¿Cuál es el requisito esencial para la validez legal del Contrato Ocasional, Accidental o Transitorio (Art. 6 CST)?',
    options: [
      'Que atienda actividades habituales de la empresa durante 1 año',
      'Que corresponda a labores extraordinarias ajenas al giro ordinario de la empresa y su duración no supere un (1) mes',
      'Que sea suscrito únicamente con aprendices SENA',
      'Que no reciba remuneración económica'
    ],
    correctIndex: 1,
    articleRef: 'Art. 6 CST',
    explanation: 'El artículo 6 del CST especifica que el trabajo ocasional aplica a tareas ajenas a las actividades normales del empleador por un lapso no superior a 30 días.'
  }
];

export const Module1Contracts: React.FC = () => {
  const [selectedContractId, setSelectedContractId] = useState<string>(CONTRACT_TYPES[0].id);
  const [activeView, setActiveView] = useState<'cards' | 'comparator' | 'advisor' | 'quiz'>('cards');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para el Asesor Contractual Interactivo
  const [advisorAnswers, setAdvisorAnswers] = useState<{
    nature: string;
    subordination: string;
    duration: string;
  }>({
    nature: '',
    subordination: '',
    duration: '',
  });

  // Estados para la Prueba de Conocimientos (10 Preguntas)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<boolean>(false);

  const selectedContract = CONTRACT_TYPES.find((c) => c.id === selectedContractId) || CONTRACT_TYPES[0];

  const filteredContracts = CONTRACT_TYPES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cstArticle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.useCases.some((u) => u.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Lógica de recomendación de contrato
  const getAdvisorRecommendation = () => {
    if (advisorAnswers.subordination === 'independent') {
      return {
        contract: CONTRACT_TYPES.find((c) => c.id === 'prestacion-servicios')!,
        reason: 'Al tratarse de una labor autónoma sin subordinación continua ni horario fijo, corresponde a un Contrato de Prestación de Servicios Civil/Comercial.',
        warning: '¡Cuidado! Si en la práctica se le imponen horarios estrictos o jefatura directa, un juez laboral declarará la existencia de un Contrato Realidad con sanciones.',
      };
    }
    if (advisorAnswers.nature === 'student') {
      return {
        contract: CONTRACT_TYPES.find((c) => c.id === 'aprendizaje-sena')!,
        reason: 'Para estudiantes técnicos, tecnológicos o universitarios en etapa formativa, aplica el Contrato de Aprendizaje Laboral Especial (Decreto 0223 de 2026 y Ley 2466).',
        warning: 'Carácter laboral a término fijo: 75% SMMLV en etapa lectiva (Salud+ARL) y 100% SMMLV en etapa práctica con Seguridad Social Integral y Prestaciones de Ley (Decreto 0223 de 2026).',
      };
    }
    if (advisorAnswers.nature === 'accidental') {
      return {
        contract: CONTRACT_TYPES.find((c) => c.id === 'ocasional-transitorio')!,
        reason: 'Para tareas ajenas al giro ordinario de la empresa menores a 30 días, aplica el Contrato Ocasional o Accidental.',
        warning: 'Tiene derecho a todas las prestaciones proporcionales (Sentencia C-825/06).',
      };
    }
    if (advisorAnswers.duration === 'task') {
      return {
        contract: CONTRACT_TYPES.find((c) => c.id === 'obra-labor')!,
        reason: 'Cuando la permanencia depende exclusivamente de la culminación de un proyecto, hito u obra civil concreta, debe celebrarse por Obra o Labor (Art. 45 CST).',
        warning: 'No admite renovaciones sucesivas en cascada para tareas permanentes.',
      };
    }
    if (advisorAnswers.duration === 'fixed') {
      return {
        contract: CONTRACT_TYPES.find((c) => c.id === 'termino-fijo')!,
        reason: 'Para necesidades temporales con fecha cierta de terminación (hasta 3 años), el Contrato a Término Fijo (Art. 46 CST) es el adecuado.',
        warning: 'Debe preavisarse la no renovación con al menos 30 días de antelación.',
      };
    }
    return {
      contract: CONTRACT_TYPES.find((c) => c.id === 'termino-indefinido')!,
      reason: 'Para cargos de planta permanente y actividades misionales recurrentes, la ley colombiana privilegia el Contrato a Término Indefinido (Art. 47 CST).',
      warning: 'Garantiza estabilidad laboral y mayor fidelización del equipo.',
    };
  };

  // Manejadores de la prueba de conocimientos (10 Preguntas)
  const handleSelectQuizOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (validationError) setValidationError(false);
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(quizAnswers).length;
    if (answeredCount < MODULE1_QUIZ_QUESTIONS.length) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setValidationError(false);
  };

  const calculateScore = () => {
    let score = 0;
    MODULE1_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Module Title Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-blue-700" />
              Módulo 1 • Contratación Laboral en Colombia
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Modalidades de Contratos de Trabajo y Casos de Uso
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
              Análisis exhaustivo de las tipologías contractuales del Código Sustantivo del Trabajo (CST):
              duración legal, formalidades obligatorias, preaviso, indemnización y casos específicos de aplicación.
            </p>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              onClick={() => setActiveView('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fichas Detalladas
            </button>
            <button
              onClick={() => setActiveView('comparator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'comparator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" />
              Tabla Comparativa
            </button>
            <button
              onClick={() => setActiveView('advisor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'advisor'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Asesor de Selección
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: CARDS DETALLADAS */}
      {activeView === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contract Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar contrato o caso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
              />
            </div>

            <div className="space-y-2">
              {filteredContracts.map((contract) => {
                const isSelected = selectedContractId === contract.id;
                return (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContractId(contract.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-[#39A900] bg-emerald-50/70 shadow-xs ring-1 ring-[#39A900]'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {contract.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                        {contract.category === 'direct' ? 'Laboral Directo' : contract.category === 'special' ? 'Formativo SENA' : 'Civil / Comercial'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#00324D] font-semibold mt-1">
                      {contract.cstArticle}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {contract.duration}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Details of Selected Contract */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black px-3 py-1 bg-emerald-100 text-[#00324D] rounded-full uppercase">
                  {selectedContract.cstArticle}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Régimen Laboral Colombiano 2026
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {selectedContract.name}
              </h2>
            </div>

            {/* Core Characteristics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  <Clock className="w-4 h-4 text-emerald-600" /> Duración Legal
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedContract.duration}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  <FileText className="w-4 h-4 text-blue-600" /> Formalidad Exigida
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedContract.formality}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Preaviso y Terminación
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedContract.advanceNotice}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> Indemnización (Art. 64 CST)
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedContract.indemnity}
                </p>
              </div>
            </div>

            {/* Specific Use Cases: ¿En qué casos se puede utilizar? */}
            <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00324D] mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#39A900]" />
                ¿En qué casos se puede utilizar este contrato?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedContract.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-emerald-200/60 shadow-2xs">
                    <CheckCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 leading-relaxed font-medium">
                      {useCase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Rules & Warnings */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Reglas Jurídicas y Doctrina SENA
              </h4>
              <ul className="space-y-2">
                {selectedContract.keyRules.map((rule, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TABLA COMPARATIVA */}
      {activeView === 'comparator' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-black text-slate-900 mb-4">
            Cuadro Comparativo de Contratos en Colombia
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="p-3">Modalidad</th>
                  <th className="p-3">Base Legal</th>
                  <th className="p-3">Duración Máxima</th>
                  <th className="p-3">Forma</th>
                  <th className="p-3">Preaviso</th>
                  <th className="p-3">Prestaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CONTRACT_TYPES.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 text-slate-600 font-medium">{c.cstArticle}</td>
                    <td className="p-3 text-slate-700">{c.duration}</td>
                    <td className="p-3 text-slate-600">{c.formality}</td>
                    <td className="p-3 text-slate-700">{c.advanceNotice}</td>
                    <td className="p-3">
                      {c.id === 'aprendizaje-sena' ? (
                        <span className="px-2 py-0.5 rounded bg-[#39A900]/20 text-[#00324D] font-extrabold text-[11px] block">
                          Laboral Especial • Prestacional en Práctica (Decreto 0223/26)
                        </span>
                      ) : c.id === 'prestacion-servicios' ? (
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                          Honorarios independientes
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          100% Prestaciones de Ley
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: ASESOR INTERACTIVO DE CONTRATACIÓN */}
      {activeView === 'advisor' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
              <HelpCircle className="w-4 h-4 text-[#39A900]" />
              Herramienta Didáctica SENA
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Qué modalidad contractual debes aplicar?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Responde las siguientes 3 preguntas prácticas para recibir la recomendación jurídica ajustada al CST.
            </p>
          </div>

          <div className="space-y-5">
            {/* Pregunta 1 */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                1. ¿Cuál es el grado de control y horario requerido?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, subordination: 'subordinated' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.subordination === 'subordinated'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cumple horario, órdenes directas y subordinación continua en las instalaciones.
                </button>
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, subordination: 'independent' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.subordination === 'independent'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Autonomía técnica y directiva total, sin horario ni órdenes de jefatura (resultados).
                </button>
              </div>
            </div>

            {/* Pregunta 2 */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                2. ¿Cuál es el perfil del colaborador o naturaleza de la labor?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, nature: 'employee' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.nature === 'employee'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Trabajador ordinario (operativo, comercial, administrativo o directivo).
                </button>
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, nature: 'student' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.nature === 'student'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Estudiante o aprendiz SENA / universitario en fase formativa obligatoria.
                </button>
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, nature: 'accidental' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.nature === 'accidental'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Labor imprevista y breve (menor a 1 mes), ajena al negocio (ej: pintar bodega).
                </button>
              </div>
            </div>

            {/* Pregunta 3 */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                3. ¿Cuál es el horizonte temporal o duración esperada?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, duration: 'permanent' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.duration === 'permanent'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Permanente y continua en el tiempo (puesto de planta).
                </button>
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, duration: 'fixed' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.duration === 'fixed'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Temporal con fecha exacta de vencimiento prefijada (hasta 3 años).
                </button>
                <button
                  onClick={() => setAdvisorAnswers({ ...advisorAnswers, duration: 'task' })}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    advisorAnswers.duration === 'task'
                      ? 'border-[#39A900] bg-emerald-100/70 text-[#00324D] font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Hasta que se termine una obra física o entregable de software específico.
                </button>
              </div>
            </div>
          </div>

          {/* Resultado del Asesor */}
          {advisorAnswers.subordination && (
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-[#39A900] space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle className="w-5 h-5 text-[#39A900]" />
                Contrato Sugerido por la Normativa:
              </div>
              <h4 className="text-xl font-black text-[#00324D]">
                {getAdvisorRecommendation().contract.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {getAdvisorRecommendation().reason}
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{getAdvisorRecommendation().warning}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
