export function calculateTtl(days: number): number {
  const oneDayInMilSec = 1000 * 60 * 60 * 24;
  return oneDayInMilSec * days;
}
