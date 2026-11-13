export interface ContractTypeInfo {
  id: string;
  name: string;
  cstArticle: string;
  duration: string;
  formality: string;
  probationPeriod: string;
  advanceNotice: string;
  indemnity: string;
  useCases: string[];
  keyRules: string[];
  pros: string[];
  cons: string[];
  category: 'direct' | 'special' | 'independent';
}

export interface CSTArticle {
  article: string;
  title: string;
  summary: string;
  fullText: string;
  isSalary: boolean | 'mixed';
  practicalExample: string;
  impactOnPayroll: string;
}

export interface ContributionRate {
  concept: string;
  category: 'security' | 'parafiscal';
  totalRate: number; // percentage, e.g. 12.5
  employeeRate: number; // percentage, e.g. 4.0
  employerRate: number; // percentage, e.g. 8.5
  lawReference: string;
  exemptionApplies: boolean; // Art. 114-1 E.T.
  description: string;
  calculationBase: string;
}

export interface MathExercise {
  id: string;
  title: string;
  badge: string;
  description: string;
  employeeProfile: {
    name: string;
    role: string;
    baseSalary: number;
    daysWorked: number;
    overtimeHoursDiurna: number;
    commissions: number;
    nonSalaryAid: number;
    hasTransportAllowance: boolean;
    riskClass: number; // 1 to 5
    isExemptEmployer: boolean;
  };
  explanation: string;
}

export interface PayrollCalculationResult {
  // Ingresos
  baseSalary: number;
  daysWorked: number;
  proportionalSalary: number;
  transportAllowance: number;
  overtimeValue: number;
  commissionsValue: number;
  totalSalaryDevengado: number; // IBC de seguridad social (sin aux transporte)
  nonSalaryDevengado: number;
  excessNonSalary40Percent: number; // Regla 40% Ley 1393
  ibcSeguridadSocial: number;
  totalGrossDevengado: number; // Total devengado

  // Deducciones Trabajador
  employeeHealth: number; // 4%
  employeePension: number; // 4%
  employeeSolidarityPension: number; // FSP 1% - 2%
  retentionSource: number;
  totalEmployeeDeductions: number;
  netSalaryToPay: number; // Neto a pagar al trabajador

  // Provisiones Prestaciones Sociales (Empleador)
  cesantias: number; // 8.33%
  interesesCesantias: number; // 1% mensual / 12% anual
  primaServicios: number; // 8.33%
  vacaciones: number; // 4.17% (sin aux transporte)
  totalPrestacionesSociales: number;

  // Aportes Seguridad Social (Empleador)
  employerHealth: number; // 8.5% (o 0% si exonerado)
  employerPension: number; // 12%
  employerARL: number; // según clase de riesgo
  totalSeguridadSocialEmployer: number;

  // Aportes Parafiscales (Empleador)
  sena: number; // 2% (o 0% si exonerado)
  icbf: number; // 3% (o 0% si exonerado)
  cajaCompensacion: number; // 4%
  totalParafiscalesEmployer: number;

  // Total Costo Empresa
  totalEmployerCost: number;
  costPercentageOverSalary: number;
}
