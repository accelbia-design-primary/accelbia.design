import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("access_key", "8efe6827-4c43-4142-bef5-43beb1467900");
      formData.append(
        "subject",
        "Contact Inquiry from accelbia.design - Bento Grid"
      );
      formData.append("email", email);
      formData.append(
        "message",
        "Contact request submitted via Bento Grid email input."
      );
      formData.append("from_name", email);
      formData.append("to_email", "inquiry@accelbia.design");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setEmail("");
        setStatusMessage("Thanks! We'll be in touch soon.");
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setStatusMessage("");
        }, 5000);
      } else {
        console.error("Error:", data);
        setStatusMessage("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h3>Get In Touch</h3>
            <p>Let's discuss how we can help your business grow</p>
            <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.emailInput}
                  required
                  disabled={isSubmitting || isSubmitted}
                />
                <button
                  type="submit"
                  className={`${styles.submitButton} ${
                    isSubmitted ? styles.submitButtonSuccess : ""
                  }`}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? "..." : isSubmitted ? "✓" : "→"}
                </button>
              </div>
              {statusMessage && (
                <p className={styles.statusMessage}>{statusMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
