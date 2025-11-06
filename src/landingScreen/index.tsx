import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./styles.module.css";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

const LandingScreen = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      // Create SplitText instance
      const splitText = new SplitText(textRef.current, {
        type: "chars,words,lines",
        charsClass: "char",
        wordsClass: "word",
        linesClass: "line",
      });

      // Set initial state
      gsap.set(splitText.chars, {
        opacity: 0,
        y: 30,
        rotationX: -90,
      });

      // Create timeline for animation
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate container fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      )
        // Animate characters
        .to(
          splitText.chars,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: {
              amount: 2,
              from: "start",
            },
          },
          "-=0.5"
        );

      // Cleanup function
      return () => {
        splitText.revert();
        tl.kill();
      };
    }
  }, []);

  return (
    <section className={styles.landingScreen} ref={containerRef}>
      <div className={styles.content}>
        <h1 className={styles.heroText} ref={textRef}>
          A digital studio based in{" "}
          <span className={styles.indiaWord}>India</span> leading an intelligent{" "}
          <span className={styles.designWord}>design</span> and{" "}
          <span className={styles.automationWord}>automation</span> revolution
        </h1>
      </div>
    </section>
  );
};

export default LandingScreen;
