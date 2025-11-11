import { useState, useEffect, useCallback } from "react";

interface UseAssetPreloaderReturn {
  progress: number;
  isLoading: boolean;
  error: string | null;
}

export const useAssetPreloader = (): UseAssetPreloaderReturn => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const preloadFont = (fontFamily: string, fontSrc: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const font = new FontFace(fontFamily, `url(${fontSrc})`);
      font
        .load()
        .then(() => {
          (document.fonts as any).add(font);
          resolve();
        })
        .catch(() => reject(new Error(`Failed to load font: ${fontFamily}`)));
    });
  };

  const getAllAssets = useCallback(() => {
    const assets: Promise<void>[] = [];

    // Preload fonts
    const fonts = [
      {
        family: "Very Vogue Display",
        src: "/fonts/nicky-laatz-very-vogue-display.otf",
      },
      {
        family: "Very Vogue Display Italic",
        src: "/fonts/nicky-laatz-very-vogue-display-italic.otf",
      },
      {
        family: "Very Vogue Text",
        src: "/fonts/nicky-laatz-very-vogue-text.otf",
      },
      {
        family: "Very Vogue Text Italic",
        src: "/fonts/nicky-laatz-very-vogue-text-italic.otf",
      },
    ];

    fonts.forEach((font) => {
      assets.push(preloadFont(font.family, font.src));
    });

    // Preload images
    const images = [
      // Project images
      "/projects/titp.png",
      "/projects/2nd-deg.png",
      "/projects/Artboard 1titp.png",

      // Client logos
      "/clients/IBS.svg",
      "/clients/Potpourri.svg",
      "/clients/SK.svg",
      "/clients/TPC.svg",
      "/clients/TPPL.svg",
      "/clients/Unibreakers.svg",

      // Client hovers
      "/client_hovers/IBS.png",
      "/client_hovers/Potpourri.png",
      "/client_hovers/SK.png",
      "/client_hovers/TPC.png",
      "/client_hovers/TPPL.png",
      "/client_hovers/Unibreakers.png",

      // Testimonials
      "/testimonials/david.png",

      // Favicons and other assets
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
      "/apple-touch-icon.png",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/favicon.ico",
      "/thumbnail.png",
    ];

    images.forEach((src) => {
      assets.push(preloadImage(src));
    });

    return assets;
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const assets = getAllAssets();
        const totalAssets = assets.length;
        let loadedAssets = 0;

        // Load assets with progress tracking
        const loadPromises = assets.map(async (assetPromise) => {
          try {
            await assetPromise;
          } catch (err) {
            console.warn("Asset loading failed:", err);
          } finally {
            loadedAssets++;
            setProgress((loadedAssets / totalAssets) * 100);
          }
        });

        await Promise.allSettled(loadPromises);

        // Ensure minimum loading time for smooth UX
        const minLoadingTime = 2000; // 2 seconds
        const loadingStartTime = Date.now();
        const elapsedTime = Date.now() - loadingStartTime;

        if (elapsedTime < minLoadingTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minLoadingTime - elapsedTime)
          );
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setIsLoading(false);
      }
    };

    loadAssets();
  }, [getAllAssets]);

  return { progress, isLoading, error };
};
