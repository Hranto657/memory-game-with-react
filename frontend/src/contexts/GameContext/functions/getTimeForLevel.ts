export const getTimeForLevel = (level: number, difficulty: string) => {
  if (difficulty === 'normal') {
    switch (level) {
      case 1:
        return 30;
      case 2:
        return 60;
      case 3:
        return 90;
      case 4:
        return 120;
      case 5:
        return 150;
    }
  }
  if (difficulty === 'hard') {
    switch (level) {
      case 1:
        return 60;
      case 2:
        return 120;
      case 3:
        return 180;
      case 4:
        return 240;
      case 5:
        return 300;
    }
  }
  if (difficulty === 'veryhard') {
    switch (level) {
      case 1:
        return 30;
      case 2:
        return 90;
      case 3:
        return 150;
      case 4:
        return 210;
      case 5:
        return 270;
    }
  }
};
