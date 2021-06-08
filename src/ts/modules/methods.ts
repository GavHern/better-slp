export function getCurrentAcademicYear(): number {
  const date = new Date();
  return date.getFullYear() + (date.getMonth() > 5 ? 1 : 0);
}