import React, { useEffect, useState } from 'react';
import { IGameLoaderProps } from './types';
import styles from './index.module.css';

const GameLoader: React.FC<IGameLoaderProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const response = await fetch('/assets_map.json');
        if (!response.ok) {
          throw new Error(`Failed to load assets_map.json: ${response.statusText}`);
        }

        const assetsMap: Record<string, string> = await response.json();

        const imageUrls = Object.values(assetsMap);

        if (imageUrls.length === 0) {
          setIsLoaded(true);
          return;
        }

        let loadedCount = 0;
        const totalImages = imageUrls.length;

        const updateProgress = () => {
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalImages) * 100);
          setProgress(newProgress);

          if (loadedCount >= totalImages) {
            setIsLoaded(true);
          }
        };

        imageUrls.forEach((url) => {
          const img = new Image();

          img.onload = updateProgress;
          img.onerror = updateProgress; // Считаем ошибку как завершенную загрузку

          img.src = url;
        });
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoaded(true);
      }
    };

    preloadImages();
  }, []);

  if (!isLoaded) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loaderContent}>
          <div className={styles.loaderText}>Загрузка ресурсов... {progress}%</div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GameLoader;
