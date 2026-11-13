import { LEGAL_CONSTANTS_2026, ARL_RISK_CLASSES } from '../constants/colombia2026';
import { PayrollCalculationResult } from '../types/payroll';

export interface CalculatorInputs {
  baseSalary: number;
  daysWorked?: number;
  overtimeHoursDiurna?: number;
  overtimeHoursNocturna?: number;
  commissions?: number;
  nonSalaryAid?: number;
  applyTransportAllowance?: boolean;
  riskClassLevel?: number; // 1 to 5
  isExemptEmployer?: boolean; // Exoneración Art. 114-1 E.T. (< 10 SMMLV)
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function calculatePayroll(inputs: CalculatorInputs): PayrollCalculationResult {
  const daysWorked = Math.min(30, Math.max(1, inputs.daysWorked ?? 30));
  // El salario en ningún caso podrá ser inferior a 1 SMMLV 2026
  const baseSalary = Math.max(LEGAL_CONSTANTS_2026.SMMLV, inputs.baseSalary);
  
  const proportionalSalary = (baseSalary / 30) * daysWorked;
  
  // Valor hora ordinaria 2026 basada en la jornada máxima legal de 42 horas/semana (Ley 2101)
  const hourlyRate = baseSalary / LEGAL_CONSTANTS_2026.MONTHLY_WORK_HOURS_2026;
  
  const otDiurnaHours = inputs.overtimeHoursDiurna ?? 0;
  const otNocturnaHours = inputs.overtimeHoursNocturna ?? 0;
  
  const otDiurnaValue = otDiurnaHours * (hourlyRate * 1.25);
  const otNocturnaValue = otNocturnaHours * (hourlyRate * 1.75);
  const totalOvertimeValue = otDiurnaValue + otNocturnaValue;
  
  const commissions = inputs.commissions ?? 0;
  const nonSalaryAid = inputs.nonSalaryAid ?? 0;

  // Auxilio de transporte: obligatorio si devenga hasta 2 SMMLV y trabaja presencial
  const earnsTransport = inputs.applyTransportAllowance !== undefined
    ? inputs.applyTransportAllowance
    : baseSalary <= (LEGAL_CONSTANTS_2026.SMMLV * LEGAL_CONSTANTS_2026.MAX_SMMLV_FOR_TRANSPORT);

  const transportAllowance = earnsTransport
    ? (LEGAL_CONSTANTS_2026.AUXILIO_TRANSPORTE / 30) * daysWorked
    : 0;

  // Total devengado salarial (constitutivo de salario CST Art. 127)
  const totalSalaryDevengado = proportionalSalary + totalOvertimeValue + commissions;

  // Regla del 40% (Art. 30 Ley 1393 de 2010):
  // Los pagos no salariales no pueden superar el 40% de la remuneración total.
  const totalRemuneration = totalSalaryDevengado + nonSalaryAid;
  const nonSalaryLimit = totalRemuneration * LEGAL_CONSTANTS_2026.LIMIT_40_PERCENT_LAW_1393;
  const excessNonSalary40Percent = Math.max(0, nonSalaryAid - nonSalaryLimit);

  // IBC (Ingreso Base de Cotización) para Seguridad Social
  const ibcSeguridadSocial = totalSalaryDevengado + excessNonSalary40Percent;

  // Total devengado bruto recibido
  const totalGrossDevengado = totalSalaryDevengado + nonSalaryAid + transportAllowance;

  // 1. DEDUCCIONES AL TRABAJADOR
  const employeeHealth = ibcSeguridadSocial * 0.04;
  const employeePension = ibcSeguridadSocial * 0.04;

  // Fondo de Solidaridad Pensional (FSP) si IBC >= 4 SMMLV
  let fspRate = 0;
  const smmlvCount = ibcSeguridadSocial / LEGAL_CONSTANTS_2026.SMMLV;
  if (smmlvCount >= 4 && smmlvCount < 16) {
    fspRate = 0.01;
  } else if (smmlvCount >= 16 && smmlvCount < 17) {
    fspRate = 0.012;
  } else if (smmlvCount >= 17 && smmlvCount < 18) {
    fspRate = 0.014;
  } else if (smmlvCount >= 18 && smmlvCount < 19) {
    fspRate = 0.016;
  } else if (smmlvCount >= 19 && smmlvCount < 20) {
    fspRate = 0.018;
  } else if (smmlvCount >= 20) {
    fspRate = 0.02;
  }
  const employeeSolidarityPension = ibcSeguridadSocial * fspRate;

  // Retención en la fuente laboral estimada (para ingresos muy altos)
  let retentionSource = 0;
  if (baseSalary >= LEGAL_CONSTANTS_2026.SMMLV * 5) {
    // Estimación simplificada pedagógica para rentas laborales altas
    retentionSource = Math.max(0, (totalSalaryDevengado - (employeeHealth + employeePension)) * 0.04);
  }

  const totalEmployeeDeductions = employeeHealth + employeePension + employeeSolidarityPension + retentionSource;
  const netSalaryToPay = totalGrossDevengado - totalEmployeeDeductions;

  // 2. PROVISIONES PRESTACIONES SOCIALES (EMPLEADOR)
  // Base para Cesantías y Prima = Salario devengado + Auxilio de transporte
  const basePrestacionesConAuxilio = totalSalaryDevengado + transportAllowance;
  
  // Cesantías: 8.333% (un mes por año) -> (Base * Días) / 360
  const cesantias = (basePrestacionesConAuxilio * daysWorked) / 360;
  // Intereses a las Cesantías: 12% anual -> (Cesantías * Días * 0.12) / 360
  const interesesCesantias = (cesantias * daysWorked * 0.12) / 360;
  // Prima de Servicios: 8.333% -> (Base * Días) / 360
  const primaServicios = (basePrestacionesConAuxilio * daysWorked) / 360;
  // Vacaciones: 4.167% -> (Salario básico * Días) / 720 (NO incluye auxilio de transporte)
  const vacaciones = (proportionalSalary * daysWorked) / 720;

  const totalPrestacionesSociales = cesantias + interesesCesantias + primaServicios + vacaciones;

  // 3. SEGURIDAD SOCIAL Y PARAFISCALES (EMPLEADOR)
  const isExempt = inputs.isExemptEmployer ?? true;
  const isUnder10SMMLV = baseSalary < (LEGAL_CONSTANTS_2026.SMMLV * 10);
  const appliesTaxExemption = isExempt && isUnder10SMMLV;

  // Salud Empleador: 8.5% (Exonerable por Art. 114-1 E.T.)
  const employerHealth = appliesTaxExemption ? 0 : ibcSeguridadSocial * 0.085;
  // Pensión Empleador: 12% (NUNCA exonerable)
  const employerPension = ibcSeguridadSocial * 0.12;
  
  // ARL: según clase de riesgo seleccionada (100% Empleador)
  const riskLevel = Math.min(5, Math.max(1, inputs.riskClassLevel ?? 1));
  const riskClass = ARL_RISK_CLASSES.find((r) => r.level === riskLevel) || ARL_RISK_CLASSES[0];
  const employerARL = (ibcSeguridadSocial * riskClass.rate) / 100;

  const totalSeguridadSocialEmployer = employerHealth + employerPension + employerARL;

  // Parafiscales
  // SENA: 2% (Exonerable por Art. 114-1 E.T.)
  const sena = appliesTaxExemption ? 0 : ibcSeguridadSocial * 0.02;
  // ICBF: 3% (Exonerable por Art. 114-1 E.T.)
  const icbf = appliesTaxExemption ? 0 : ibcSeguridadSocial * 0.03;
  // CCF: 4% (NUNCA exonerable)
  const cajaCompensacion = ibcSeguridadSocial * 0.04;

  const totalParafiscalesEmployer = sena + icbf + cajaCompensacion;

  // 4. COSTO TOTAL EMPLEADOR
  const totalEmployerCost = totalGrossDevengado + totalPrestacionesSociales + totalSeguridadSocialEmployer + totalParafiscalesEmployer;
  const costPercentageOverSalary = ((totalEmployerCost - baseSalary) / baseSalary) * 100;

  return {
    baseSalary,
    daysWorked,
    proportionalSalary,
    transportAllowance,
    overtimeValue: totalOvertimeValue,
    commissionsValue: commissions,
    totalSalaryDevengado,
    nonSalaryDevengado: nonSalaryAid,
    excessNonSalary40Percent,
    ibcSeguridadSocial,
    totalGrossDevengado,
    employeeHealth,
    employeePension,
    employeeSolidarityPension,
    retentionSource,
    totalEmployeeDeductions,
    netSalaryToPay,
    cesantias,
    interesesCesantias,
    primaServicios,
    vacaciones,
    totalPrestacionesSociales,
    employerHealth,
    employerPension,
    employerARL,
    totalSeguridadSocialEmployer,
    sena,
    icbf,
    cajaCompensacion,
    totalParafiscalesEmployer,
    totalEmployerCost,
    costPercentageOverSalary,
  };
}
