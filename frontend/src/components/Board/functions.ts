export const getRequiredMatches = (level: number) => {
  switch (level) {
    case 1:
      return 4;
    case 2:
      return 6;
    case 3:
      return 12;
    case 4:
      return 14;
    case 5:
      return 18;
    case 6:
      return 28;
    case 7:
      return 34;
    default:
      return 34;
  }
};
