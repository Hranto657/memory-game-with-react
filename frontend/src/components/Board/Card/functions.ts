export const getCardDimensions = (level: number) => {
  switch (level) {
    case 1:
      return { width: '174px', height: '226px' };
    case 2:
      return { width: '113px', height: '225px' };
    case 3:
      return { width: '113px', height: '147px' };
    case 4:
      return { width: '85px', height: '149px' };
    case 5:
      return { width: '85px', height: '111px' };
    case 6:
    case 7:
    default:
      return { width: '55px', height: '85px' };
  }
};
