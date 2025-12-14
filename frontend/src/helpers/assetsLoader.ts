type AssetsMap = Record<string, string>;

let remoteAssets: AssetsMap | null = null;
let isLoading = false;
let loadPromise: Promise<void> | null = null;

export async function loadAssetsMap(): Promise<void> {
  if (remoteAssets !== null) {
    return Promise.resolve();
  }

  if (isLoading && loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  loadPromise = (async () => {
    try {
      const response = await fetch('/assets_map.json');

      if (!response.ok) {
        throw new Error(`Failed to load assets_map.json: ${response.statusText}`);
      }

      remoteAssets = await response.json();
      console.info(
        '✅ Assets map loaded successfully:',
        Object.keys(remoteAssets || {}).length,
        'images'
      );
    } catch (error) {
      console.warn('⚠️ Failed to load assets_map.json, falling back to local images:', error);

      remoteAssets = {};
    } finally {
      isLoading = false;
    }
  })();

  return loadPromise;
}

function extractFileName(importPath: string): string {
  try {
    const urlMatch = importPath.match(/([^/]+)\.(jpg|png|webp|svg)(\?.*)?$/i);
    if (urlMatch) {
      const [, name, ext] = urlMatch;

      const cleanName = name.replace(/-[a-f0-9]{8,}$/i, '');
      return `${cleanName}.${ext}`;
    }
  } catch (e) {
    console.error('Error extracting file name from import path:', e);
  }
  return importPath;
}

export function getImageSource(localImport: string): string {
  if (!remoteAssets) {
    return localImport;
  }

  const fileName = extractFileName(localImport);

  if (remoteAssets[fileName]) {
    return remoteAssets[fileName];
  }

  return localImport;
}

export function getImageSourceByName(fileName: string, fallbackPath?: string): string {
  if (!remoteAssets) {
    return fallbackPath || `/assets/${fileName}`;
  }

  if (remoteAssets[fileName]) {
    return remoteAssets[fileName];
  }

  return fallbackPath || `/assets/${fileName}`;
}

export function isAssetsMapLoaded(): boolean {
  return remoteAssets !== null;
}
