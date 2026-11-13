import React, { useState, useRef, useEffect } from 'react';
import { SenaLogo } from './SenaLogo';
import { 
  FileText, 
  Coins, 
  ShieldCheck, 
  Calculator, 
  Layers, 
  Menu, 
  X,
  BookOpenCheck,
  Building2,
  Calendar,
  ChevronDown,
  Clock,
  PlayCircle
} from 'lucide-react';

export type ActiveTab = 'home' | 'stages' | 'contracts' | 'salary-cst' | 'social-security' | 'overtime' | 'benefits-math';

interface SenaHeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenManual?: () => void;
}

export const SenaHeader: React.FC<SenaHeaderProps> = ({ activeTab, onSelectTab, onOpenManual }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: 'home', label: 'Portada', icon: <Building2 className="w-4 h-4" /> },
    { id: 'stages', label: 'Plan por Etapas', icon: <Layers className="w-4 h-4" /> },
    { id: 'contracts', label: 'Módulo 1: Contratos', icon: <FileText className="w-4 h-4" /> },
    { id: 'salary-cst', label: 'Módulo 2: Salario CST', icon: <Coins className="w-4 h-4" /> },
    { id: 'social-security', label: 'Módulo 3: Seguridad Social', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'overtime', label: 'Módulo 4: Horas Extras y Recargos', icon: <Clock className="w-4 h-4" /> },
    { id: 'benefits-math', label: 'Módulo 5: Prestaciones & Ejercicios', icon: <Calculator className="w-4 h-4" />, tag: 'Tarifas 2026' },
  ];

  const modulesList = [
    { id: 'contracts' as ActiveTab, title: 'Módulo 1: Contratos Laborales', icon: <FileText className="w-4 h-4 text-blue-600" /> },
    { id: 'salary-cst' as ActiveTab, title: 'Módulo 2: Salario CST (127-142)', icon: <Coins className="w-4 h-4 text-amber-600" /> },
    { id: 'social-security' as ActiveTab, title: 'Módulo 3: Seguridad Social & Parafiscales', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
    { id: 'overtime' as ActiveTab, title: 'Módulo 4: Horas Extras y Recargos', icon: <Clock className="w-4 h-4 text-indigo-600" /> },
    { id: 'benefits-math' as ActiveTab, title: 'Módulo 5: Provisiones Prestaciones Sociales', icon: <Calculator className="w-4 h-4 text-purple-600" /> },
  ];

  const handleSelect = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModulesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Institutional Notification Ribbon */}
      <div className="bg-[#00324D] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
            <span>Centro de Servicios y Gestión Empresarial - Tecnología en Gestión Empresarial</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-emerald-300 font-semibold">Instructora Carolina Cardona Flórez</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#39A900]" />
              Tarifas Proyectadas y Vigencia 2026
            </span>
            <span className="hidden md:inline bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded text-[10px] border border-emerald-700/50">
              Jornada Ley 2101: 42 hrs/sem
            </span>
            <img 
              src="/assets/aistudio/Foto_banner_376088ac.jpg" 
              alt="Instructora Carolina Cardona Flórez" 
              className="w-8 h-8 rounded-full object-cover border-2 border-[#39A900] shadow-md shrink-0 cursor-pointer hover:scale-110 transition-transform" 
              title="Instructora Carolina Cardona Flórez"
            />
          </div>
        </div>
      </div>

      {/* Main Bar with SENA Logo and Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-18">
          {/* Logo SENA Brand */}
          <div
            onClick={() => handleSelect('home')}
            className="cursor-pointer py-1 group flex items-center gap-3 shrink-0"
            role="button"
            tabIndex={0}
            aria-label="Ir a inicio SENA"
          >
            <SenaLogo size="md" variant="color" />
            <div className="hidden lg:block xl:hidden 2xl:block border-l border-slate-200 pl-3">
              <p className="text-xs font-bold text-slate-800 leading-tight whitespace-nowrap">
                Centro de Servicios y Gestión Empresarial
              </p>
              <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                Tecnología en Gestión Empresarial
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`relative flex items-center gap-1 px-2 2xl:px-2.5 py-2 rounded-lg text-[11px] 2xl:text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#00324D] hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.tag && !isActive && (
                    <span className="ml-0.5 text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded whitespace-nowrap">
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top Right Buttons: Front Page, Calculadora 2026, and Módulos Dropdown */}
          <div className="flex items-center gap-2 relative shrink-0">
            {activeTab !== 'home' ? (
              <button
                onClick={() => handleSelect('home')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
                title="Volver a la Front Page"
              >
                <Building2 className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Portada</span>
              </button>
            ) : (
              onOpenManual && (
                <button
                  onClick={onOpenManual}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
                  title="Ver video del Manual del usuario"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Manual del usuario</span>
                </button>
              )
            )}

            <button
              onClick={() => handleSelect('benefits-math')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#39A900] text-white text-xs font-bold shadow-xs hover:bg-[#2e8800] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora 2026</span>
            </button>

            {/* Módulos Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00324D] text-white text-xs font-bold shadow-xs hover:bg-[#002233] transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Módulos</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${modulesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {modulesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Seleccione un Módulo SENA
                  </div>
                  {modulesList.map((m) => {
                    const isModActive = activeTab === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(m.id)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center gap-2.5 transition-colors ${
                          isModActive
                            ? 'bg-emerald-50 text-[#00324D] border-l-4 border-[#39A900]'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {m.icon}
                        <span>{m.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top duration-150">
          <div className="px-3 py-2 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
            <BookOpenCheck className="w-4 h-4 text-[#39A900]" />
            Módulos del Prototipo Salarios Colombia 2026
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.tag && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
