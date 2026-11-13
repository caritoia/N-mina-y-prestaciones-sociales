import React, { useState } from 'react';
import { SenaHeader, ActiveTab } from './components/SenaHeader';
import { HeroFrontPage } from './components/HeroFrontPage';
import { StagesRoadmap } from './components/StagesRoadmap';
import { Module1Contracts } from './components/Module1Contracts';
import { Module2SalaryCST } from './components/Module2SalaryCST';
import { Module3SocialSecurity } from './components/Module3SocialSecurity';
import { Module4Overtime } from './components/Module4Overtime';
import { Module4BenefitsAndExercises } from './components/Module4BenefitsAndExercises';
import { ManualVideoModal } from './components/ManualVideoModal';
import { SenaLogo } from './components/SenaLogo';
import { LEGAL_CONSTANTS_2026 } from './constants/colombia2026';
import { formatCOP } from './utils/payrollCalculator';
import { 
  Building2, 
  BookOpenCheck, 
  Scale, 
  ExternalLink, 
  GraduationCap, 
  ChevronUp 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [manualVideoOpen, setManualVideoOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#39A900] selection:text-white">
      {/* Institutional Top Header */}
      <SenaHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenManual={() => setManualVideoOpen(true)}
      />

      {/* Main Content Area Routed by Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroFrontPage
              onNavigate={setActiveTab}
              onOpenManual={() => setManualVideoOpen(true)}
            />
          </>
        )}

        {activeTab === 'stages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <StagesRoadmap onNavigate={setActiveTab} />
          </div>
        )}

        {activeTab === 'contracts' && (
          <Module1Contracts />
        )}

        {activeTab === 'salary-cst' && (
          <Module2SalaryCST />
        )}

        {activeTab === 'social-security' && (
          <Module3SocialSecurity />
        )}

        {activeTab === 'overtime' && (
          <Module4Overtime />
        )}

        {activeTab === 'benefits-math' && (
          <Module4BenefitsAndExercises />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#002233] text-slate-300 border-t border-slate-800 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* SENA Identity */}
            <div className="space-y-4 md:col-span-2">
              <div className="bg-white/10 p-3.5 rounded-2xl inline-block border border-white/10">
                <SenaLogo variant="white" size="md" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Prototipo pedagógico y tecnológico modular sobre salarios, régimen contractual, aportes a la seguridad 
                social y prestaciones sociales en Colombia, desarrollado según el Código Sustantivo del Trabajo y 
                las directrices formativas del SENA para el año 2026.
              </p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Formación Profesional Integral y Gratuita para el Trabajo</span>
              </div>
            </div>

            {/* Referencias Normativas */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#39A900]" />
                Marco Normativo 2026
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Código Sustantivo del Trabajo (Arts. 127 a 142)</li>
                <li>• Ley 100 de 1993 y Ley 797 de 2003 (Seguridad Social)</li>
                <li>• Ley 2101 de 2021 (Reducción a 42h semanales en 2026)</li>
                <li>• Ley 1393 de 2010 Art. 30 (Límite del 40% No Salarial)</li>
                <li>• Art. 114-1 del Estatuto Tributario (Exoneración parafiscal)</li>
                <li>• Ley 2466 de 2025 y Decreto 0223 de 2026 (Contrato de Aprendizaje Laboral)</li>
              </ul>
            </div>

            {/* Parámetros Vigentes 2026 */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
                <BookOpenCheck className="w-4 h-4 text-[#39A900]" />
                Parámetros Base 2026
              </h4>
              <div className="space-y-2 bg-white/5 p-3 rounded-xl border border-white/10 text-[11px]">
                <div className="flex justify-between">
                  <span>SMMLV 2026:</span>
                  <strong className="text-white">{formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Auxilio Transporte:</span>
                  <strong className="text-white">{formatCOP(LEGAL_CONSTANTS_2026.AUXILIO_TRANSPORTE)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Jornada Máxima:</span>
                  <strong className="text-white">42 Horas / Semana</strong>
                </div>
                <div className="flex justify-between">
                  <span>Salario Integral Mín:</span>
                  <strong className="text-white">{formatCOP(LEGAL_CONSTANTS_2026.SMMLV * 13)}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Subfooter */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <p>
              © 2026 Servicio Nacional de Aprendizaje (SENA) • República de Colombia. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Volver al inicio</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ManualVideoModal
        isOpen={manualVideoOpen}
        onClose={() => setManualVideoOpen(false)}
      />
    </div>
  );
}
