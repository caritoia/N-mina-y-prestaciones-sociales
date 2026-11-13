import React from 'react';
import { ActiveTab } from './SenaHeader';
import { GraduationCap } from 'lucide-react';

interface StagesRoadmapProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const StagesRoadmap: React.FC<StagesRoadmapProps> = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#00324D] text-xs font-bold uppercase tracking-wider mb-3">
          <GraduationCap className="w-4 h-4 text-[#39A900]" />
          Metodología de Formación por Competencias SENA
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bienvenidos a la competencia de Nómina y salarios
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Estimado aprendiz en este espacio encontrará información básica sobre la temática de nómina y salarios en Colombia que le servirán como apoyo para desarrollar las actividades de aprendizaje planteadas en la guía de aprendizaje de Contabilizar operaciones comerciales. Los módulos que usted encontrará son los siguientes:
        </p>
      </div>
    </div>
  );
};
