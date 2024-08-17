export const getRequiredMatches = (level: number) => {
  switch (level) {
    case 1:
      return 12;
    case 2:
      return 16;
    case 3:
      return 22;
    case 4:
      return 28;
    case 5:
      return 34;
  }
};
