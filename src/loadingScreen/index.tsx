import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./styles.module.css";

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      // Simple pulsing animation for the loader
      gsap.to(loaderRef.current, {
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        }
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className={styles.loadingScreen} ref={containerRef}>
      <div className={styles.content}>
        <div ref={loaderRef} className={styles.loader}>
          <div className={styles.loaderRing}></div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div ref={progressBarRef} className={styles.progressFill} />
          </div>
          <p className={styles.progressText}>{Math.round(progress)}%</p>
        </div>

        <p className={styles.loadingText}>Loading assets...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
