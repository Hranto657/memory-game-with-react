export const getColumns = (level: number) => {
  if (level <= 1) return 'repeat(2, 1fr)';
  if (level <= 3) return 'repeat(3, 1fr)';
  if (level <= 5) return 'repeat(4, 1fr)';
  return 'repeat(6, 1fr)';
};
