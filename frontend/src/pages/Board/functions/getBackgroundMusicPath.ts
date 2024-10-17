export const getBackgroundMusicPath = (theme: string) => {
  switch (theme) {
    case 'dragon':
      return '/sounds/dragon_background.mp3';
    case 'mythical':
      return '/sounds/mythical_background.mp3';
  }
};
