import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./styles.module.css";

interface TransitionOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  isActive,
  onComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && overlayRef.current) {
      // Animate overlay to fade in and dim the screen
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Wait a moment at full dim before completing
          setTimeout(() => {
            onComplete();
          }, 200);
        },
      });
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return <div ref={overlayRef} className={styles.transitionOverlay} />;
};

export default TransitionOverlay;
