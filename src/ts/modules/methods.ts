export function getCurrentAcademicYear(): number {
  const date = new Date();
  return date.getFullYear() + (date.getMonth() > 5 ? 1 : 0);
}

export function getAverage(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}