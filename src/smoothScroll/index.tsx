import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const smoother = useRef<ScrollSmoother | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create ScrollSmoother instance
    if (scrollerRef.current && contentRef.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: scrollerRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      // Optional: Add some easing customization
      smoother.current.effects(".smooth-element", {
        speed: (_, target) => {
          return gsap.utils.clamp(
            0.1,
            2,
            parseFloat(target.getAttribute("data-speed") || "1")
          );
        },
      });
    }

    // Cleanup
    return () => {
      if (smoother.current) {
        smoother.current.kill();
        smoother.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Refresh ScrollSmoother when content changes
  useEffect(() => {
    if (smoother.current) {
      smoother.current.refresh();
    }
  });

  return (
    <div
      id="smooth-wrapper"
      ref={scrollerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        id="smooth-content"
        ref={contentRef}
        style={{
          position: "relative",
          overflow: "visible",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
