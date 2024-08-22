export const getRequiredMatches = (level: number, difficulty: string) => {
  if (difficulty === 'hard') {
    switch (level) {
      case 1:
        return 10;
      case 2:
        return 16;
      case 3:
        return 22;
      case 4:
        return 28;
      case 5:
        return 34;
    }
  }
  if (difficulty === 'veryhard') {
    switch (level) {
      case 1:
        return 8;
      case 2:
        return 14;
      case 3:
        return 20;
      case 4:
        return 26;
      case 5:
        return 32;
    }
  }
  switch (level) {
    case 1:
      return 12;
    case 2:
      return 18;
    case 3:
      return 24;
    case 4:
      return 30;
    case 5:
      return 36;
  }
};
