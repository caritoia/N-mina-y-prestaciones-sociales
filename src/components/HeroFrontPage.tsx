import React from 'react';
import { SenaLogo } from './SenaLogo';
import { ActiveTab } from './SenaHeader';
import { LEGAL_CONSTANTS_2026 } from '../constants/colombia2026';
import { formatCOP } from '../utils/payrollCalculator';
import { 
  ArrowRight, 
  FileText, 
  Coins, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  Layers,
  Clock,
  Briefcase,
  TrendingUp,
  PlayCircle
} from 'lucide-react';

interface HeroFrontPageProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenManual?: () => void;
}

export const HeroFrontPage: React.FC<HeroFrontPageProps> = ({ onNavigate, onOpenManual }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Imagery with Multi-Layer Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.voki.com/site/pickup?scid=20899088&chsm=512dac4e5d0d0d0be5ddbf1e0b71a89f&allowshare=0"
          alt="Trabajadores y profesionales en Colombia"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-150 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Deep Colombian Green & Institutional Navy Blue Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002233]/95 via-[#00324D]/90 to-[#0c4026]/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950/90" />
        
        {/* Subtle geometric grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24">
        


        {/* Eye-catching Hero Title & Hook */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39A900]/25 border border-[#39A900]/50 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>Competencia Contabilizar operaciones comerciales de acuerdo a la normativa vigente, sección nómina y salarios</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Régimen de Salarios,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39A900] via-emerald-300 to-teal-200">
              Contratación y Nómina
            </span>{' '}
            en Colombia 2026
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            Estimado aprendiz en este espacio encontrará información básica sobre la temática de nómina y salarios en Colombia fundamentada en el código sustantivo de trabajo y demás normativa legal vigente, la cual le servirá como apoyo para el desarrollo de las actividades de aprendizaje planteadas en la guía de Contabilizar operaciones comerciales
          </p>
        </div>

        {/* Video de bienvenida */}
        <div className="mt-12 max-w-4xl space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Video de bienvenida</h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
            <iframe 
              className="w-full h-full"
              src="https://www.voki.com/site/pickup?scid=20899088&chsm=512dac4e5d0d0d0be5ddbf1e0b71a89f&allowshare=0" 
              title="Video de bienvenida"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Visual Module Showcase Cards */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="text-xs uppercase tracking-widest text-[#39A900] font-bold mb-4">
            Módulos de Formación y Práctica Integrada
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card Módulo 1 */}
            <div
              onClick={() => onNavigate('contracts')}
              className="group cursor-pointer bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Módulo 1
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Contratos Laborales
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Término fijo, indefinido, por obra o labor, aprendizaje SENA y transitorio. Duración, preavisos e indemnizaciones.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card Módulo 2 */}
            <div
              onClick={() => onNavigate('salary-cst')}
              className="group cursor-pointer bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Módulo 2
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Salario en el CST (127-142)
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Factores salariales vs no salariales, viáticos, propinas, salario en especie, salario integral y límite del 40% Ley 1393.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card Módulo 3 */}
            <div
              onClick={() => onNavigate('social-security')}
              className="group cursor-pointer bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Módulo 3
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Seguridad Social & Parafiscales
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Porcentajes exactos Trabajador vs Empleador (Salud, Pensión, ARL I-V, CCF, SENA, ICBF) y exoneración Art. 114-1 E.T.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card Módulo 4: Horas Extras y Recargos */}
            <div
              onClick={() => onNavigate('overtime')}
              className="group cursor-pointer bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Módulo 4
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Horas Extras y Recargos
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Jornada nocturna desde 7 p.m., recargo dominical del 90% en 2026 (Ley 2466/2025), divisor de 210 horas y liquidador en vivo.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card Módulo 5 */}
            <div
              onClick={() => onNavigate('benefits-math')}
              className="group cursor-pointer bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                Módulo 5
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Provisiones y prestaciones sociales
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Prima, Cesantías, Intereses y Vacaciones con ejercicios matemáticos paso a paso a partir de 1 SMMLV 2026.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Actualidad laboral */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 bg-[#39A900] p-4 rounded-xl">Actualidad laboral</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
              <Coins className="w-4 h-4" /> SMMLV 2026 (Base)
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatCOP(LEGAL_CONSTANTS_2026.SMMLV)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Piso mínimo legal garantizado en todo el territorio
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Auxilio de Transporte
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatCOP(LEGAL_CONSTANTS_2026.AUXILIO_TRANSPORTE)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Obligatorio para devengos de hasta 2 SMMLV
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Jornada Legal Máxima
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              42 Horas / Semana
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Ley 2101 culmina su transición en 2026
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Salario Integral Mínimo
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatCOP(LEGAL_CONSTANTS_2026.SMMLV * LEGAL_CONSTANTS_2026.INTEGRAL_SALARY_MIN_SMMLV)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              10 SMMLV básico + 30% prestacional (13 SMMLV)
            </div>
          </div>
          </div>
        </div>

        {/* Quick CTA Buttons below modules */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={() => onNavigate('benefits-math')}
            className="px-8 py-4 rounded-xl bg-[#39A900] text-white font-bold text-base shadow-xl shadow-emerald-950/50 hover:bg-[#2f8c00] hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-white" />
            <span>Ejercicios & Calculadora 2026</span>
          </button>

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-base shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-[#39A900]" />
              <span>Manual del usuario</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
