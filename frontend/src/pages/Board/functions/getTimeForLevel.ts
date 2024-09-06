export const getTimeForLevel = (level: number) => {
  switch (level) {
    case 1:
      return 30;
    case 2:
      return 120;
    case 3:
      return 180;
    case 4:
      return 240;
    case 5:
      return 300;
  }
};
