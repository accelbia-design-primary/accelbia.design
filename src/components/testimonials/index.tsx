import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Testimonial {
  id: number;
  testimonial: string;
  reviewer: string;
  credentials: string;
  image: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    testimonial:
      "Accelbia transformed our vision into reality with exceptional creativity and professionalism. Their attention to detail and innovative approach exceeded all our expectations.",
    reviewer: "Sarah Johnson",
    credentials: "CEO, TechStart Solutions",
    image: "/testimonials/sarah.jpg",
  },
  {
    id: 2,
    testimonial:
      "Working with Accelbia was a game-changer for our brand. They delivered a stunning design that perfectly captured our essence and drove real results.",
    reviewer: "Michael Chen",
    credentials: "Founder, Digital Ventures",
    image: "/testimonials/michael.jpg",
  },
  {
    id: 3,
    testimonial:
      "The team at Accelbia brings unparalleled expertise and creativity. Their collaborative approach made the entire process smooth and enjoyable.",
    reviewer: "Emily Rodriguez",
    credentials: "Marketing Director, GrowthCorp",
    image: "/testimonials/emily.jpg",
  },
  {
    id: 4,
    testimonial:
      "Exceptional quality and innovative design thinking. Accelbia delivered beyond what we imagined and helped us stand out in a competitive market.",
    reviewer: "David Kumar",
    credentials: "Product Manager, InnovateTech",
    image: "/testimonials/david.png",
  },
  {
    id: 5,
    testimonial:
      "From concept to execution, Accelbia demonstrated professionalism and creativity at every step. Highly recommended for any design project.",
    reviewer: "Lisa Thompson",
    credentials: "Creative Director, BrandForge",
    image: "/testimonials/lisa.jpg",
  },
  {
    id: 6,
    testimonial:
      "The results speak for themselves. Accelbia's design solutions helped us increase engagement by 300% and establish a strong brand presence.",
    reviewer: "Robert Martinez",
    credentials: "VP Marketing, ScaleUp Inc",
    image: "/testimonials/robert.jpg",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className={styles.testimonialCard}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${testimonial.image})`,
        }}
      />
      <div className={styles.content}>
        <p className={styles.testimonialText}>"{testimonial.testimonial}"</p>
        <div className={styles.reviewerInfo}>
          <h4 className={styles.reviewerName}>{testimonial.reviewer}</h4>
          <p className={styles.credentials}>{testimonial.credentials}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate the testimonials array to create seamless infinite scroll for desktop
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timeout = setTimeout(checkMobile, 100);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeout);
    };
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Touch handlers for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // Minimum swipe distance to trigger slide change
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left - next slide
        setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
      } else {
        // Swiped right - previous slide
        setCurrentSlide(
          (prev) =>
            (prev - 1 + testimonialsData.length) % testimonialsData.length
        );
      }
    }

    setIsDragging(false);
  };

  // Mouse handlers for desktop carousel simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMobile || !isDragging) return;

    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
      } else {
        setCurrentSlide(
          (prev) =>
            (prev - 1 + testimonialsData.length) % testimonialsData.length
        );
      }
    }

    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Testimonials</h2>

        {isMobile ? (
          // Mobile Carousel
          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              ref={carouselRef}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className={styles.carouselSlide}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className={styles.carouselDots}>
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === currentSlide ? styles.activeDot : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + testimonialsData.length) %
                    testimonialsData.length
                )
              }
              aria-label="Previous testimonial"
            >
              &#8249;
            </button>
            <button
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % testimonialsData.length)
              }
              aria-label="Next testimonial"
            >
              &#8250;
            </button>
          </div>
        ) : (
          // Desktop Infinite Scroll
          <div className={styles.scrollContainer}>
            <div className={styles.scrollTrack}>
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
