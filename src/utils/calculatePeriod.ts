interface CalculatePeriodArgs {
  days: number;
  units: "seconds" | "milliseconds";
}

export function calculatePeriod({ days, units }: CalculatePeriodArgs): number {
  const oneDayInSec = 86400;
  return units === "seconds" ? days * oneDayInSec : days * oneDayInSec * 1000;
}
