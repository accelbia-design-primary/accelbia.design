import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && gridRef.current) {
      const boxes = gridRef.current.querySelectorAll(`.${styles.bentoBox}`);

      // Set initial state
      gsap.set(boxes, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      });

      // Create scroll trigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // Animate boxes in sequence
      tl.to(boxes, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: {
          amount: 1.2,
          from: "start",
        },
      });

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        tl.kill();
      };
    }
  }, []);

  return (
    <section className={styles.bentoSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.bentoGrid} ref={gridRef}>
          <div className={`${styles.bentoBox} ${styles.box1}`}>
            <h3>Our Vision</h3>
            <p>Leading the future of design and automation</p>
          </div>
          <div className={`${styles.bentoBox} ${styles.box2}`}>
            <h3>Design</h3>
            <p>Intelligent design solutions</p>
          </div>
          <div className={`${styles.bentoBox} ${styles.box3}`}>
            <h3>Innovation</h3>
            <p>Cutting-edge technology</p>
          </div>
          <div className={`${styles.bentoBox} ${styles.box4}`}>
            <h3>Automation</h3>
            <p>Streamlined processes</p>
          </div>
          <div className={`${styles.bentoBox} ${styles.box5}`}>
            <h3>Results</h3>
            <p>Delivering exceptional outcomes for our clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
