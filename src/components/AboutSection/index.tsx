import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./styles.module.css";

interface AboutSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  isOpen,
  onClose,
  onContactClick,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isTextSplit, setIsTextSplit] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const hasAnimated = useRef(false);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      hasAnimated.current = false;
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Show content after overlay dims
  useEffect(() => {
    if (isOpen) {
      // Wait for overlay to dim (600ms) before showing content
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Split text into words when content becomes visible
  useEffect(() => {
    if (showContent && !isTextSplit) {
      paragraphRefs.current.forEach((paragraph) => {
        if (paragraph && !paragraph.querySelector(".word")) {
          // Get the HTML content to preserve the brand name spans
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = paragraph.innerHTML;

          // Process text nodes and split them into words
          const processNode = (node: Node): Node[] => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent || "";
              const words = text
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0);
              return words.map((word) => {
                const span = document.createElement("span");
                span.className = "word";
                span.textContent = word;
                return span;
              });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Wrap brand name elements with 'word' class for animation
              const element = node as HTMLElement;
              if (
                element.classList &&
                element.classList.contains(styles.brandName)
              ) {
                const wrapper = document.createElement("span");
                wrapper.className = "word";
                wrapper.appendChild(element.cloneNode(true));
                return [wrapper];
              }
              return [node.cloneNode(true)];
            }
            return [];
          };

          const newNodes: Node[] = [];
          Array.from(tempDiv.childNodes).forEach((child) => {
            const processed = processNode(child);
            processed.forEach((node) => {
              newNodes.push(node);
              // Add space between words
              newNodes.push(document.createTextNode(" "));
            });
          });

          paragraph.innerHTML = "";
          newNodes.forEach((node) => paragraph.appendChild(node));
        }
      });
      setIsTextSplit(true);
    }
  }, [showContent, isTextSplit]);

  // GSAP Animation - runs after text is split
  useEffect(() => {
    if (isOpen && isTextSplit && titleRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      const timeline = gsap.timeline();

      // Animate title
      timeline.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Animate each paragraph with word-by-word effect
      paragraphRefs.current.forEach((paragraph, index) => {
        if (paragraph) {
          const words = paragraph.querySelectorAll(".word");

          if (words.length > 0) {
            timeline.from(
              words,
              {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.03,
                ease: "power2.out",
              },
              `-=${0.4 - index * 0.1}`
            );
          }
        }
      });

      // Animate button after all text
      if (buttonRef.current) {
        timeline.fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.3"
        );
      }
    }
  }, [isOpen, isTextSplit]);

  // Reset animation state when closing
  useEffect(() => {
    if (!isOpen) {
      setIsTextSplit(false);
      hasAnimated.current = false;
    }
  }, [isOpen]);

  // Handle click outside content
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
    >
      <div className={styles.container} onClick={handleContainerClick}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close about section"
          type="button"
        >
          <svg
            className={styles.closeIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {showContent && (
          <div className={styles.content}>
            <h1 id="about-title" className={styles.title} ref={titleRef}>
              About
            </h1>

            <div className={styles.textSection}>
              <p
                className={styles.paragraph}
                ref={(el) => {
                  paragraphRefs.current[0] = el;
                }}
              >
                <span className={styles.brandName}>accelbia.design</span> is a
                focused, one-person studio supported by trusted partners who
                share a single vision: to cut through noise and complexity to
                build technology and design with purpose. We deliver branding,
                SEO, web design, and automation solutions grounded in clarity
                and function.
              </p>

              <p
                className={styles.paragraph}
                ref={(el) => {
                  paragraphRefs.current[1] = el;
                }}
              >
                Our approach is deliberate and unembellished. We don't chase
                fleeting trends or rely on jargon. Instead, we craft systems and
                visuals that work quietly and effectively—streamlining
                processes, elevating brands, and making digital experiences
                simpler and more intuitive.
              </p>

              <p
                className={styles.paragraph}
                ref={(el) => {
                  paragraphRefs.current[2] = el;
                }}
              >
                Every project is treated as an exercise in restraint.
                Collaboration with our carefully chosen partners allows us to
                maintain precision and integrity across all touchpoints—from
                visual identity to search presence, from automated workflows to
                user-centered web design.
              </p>

              <p
                className={styles.paragraph}
                ref={(el) => {
                  paragraphRefs.current[3] = el;
                }}
              >
                <span className={styles.brandName}>accelbia.design</span> stands
                for intentional impact over volume, precision over flash. We
                build tools and brands that matter, enabling our clients to move
                confidently through an increasingly complex world.
              </p>
            </div>

            <button
              ref={buttonRef}
              className={styles.ctaButton}
              onClick={() => {
                onClose();
                if (onContactClick) {
                  onContactClick();
                }
              }}
            >
              Let's Talk Business
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
