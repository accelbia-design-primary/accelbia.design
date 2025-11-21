import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface NavbarProps {
  onContactClick?: () => void;
  onRecruitmentClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  onRecruitmentClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBento, setShowBento] = useState(false);
  const [bentoState, setBentoState] = useState<"entering" | "exiting" | null>(
    null
  );
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger the fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay for smoother appearance

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    // Only enable expansion on non-mobile devices
    if (isMobile) {
      setIsExpanded(false);
      setShowBento(false);
      setBentoState(null);
      return;
    }

    // Handle scroll to detect when bottom is reached
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Check if user is near the bottom (within 100px of footer)
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      if (distanceFromBottom <= 100) {
        // Calculate the height needed to reach the footer
        const footer = document.querySelector("#footer") as HTMLElement;
        if (footer && navbarRef.current) {
          const footerTop = footer.getBoundingClientRect().top + scrollTop;
          const navbarTop =
            navbarRef.current.getBoundingClientRect().top + scrollTop;
          const heightToFooter = footerTop - navbarTop;
          setExpandedHeight(heightToFooter);
          setIsExpanded(true);

          // Show bento after navbar expansion animation completes (800ms)
          setTimeout(() => {
            setShowBento(true);
            setBentoState("entering");
          }, 800);
        }
      } else {
        // Hide bento first, then collapse navbar
        if (showBento) {
          setBentoState("exiting");
          // Wait for exit animation to complete before hiding
          setTimeout(() => {
            setShowBento(false);
            setBentoState(null);
            // Collapse navbar after bento disappears
            setTimeout(() => {
              setIsExpanded(false);
            }, 100);
          }, 600);
        } else {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, showBento]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    }
    closeMobileMenu();
  };

  const handleRecruitmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRecruitmentClick) {
      onRecruitmentClick();
    }
    closeMobileMenu();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
    setIsEmailValid(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleMailClick = () => {
    window.location.href = "mailto:inquiry@accelbia.design";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+918604485198";
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`${styles.navbar} ${isVisible ? styles.navbarVisible : ""} ${
          isExpanded && !isMobile ? styles.navbarExpanded : ""
        }`}
        style={
          isExpanded && !isMobile
            ? { height: `${expandedHeight}px` }
            : undefined
        }
      >
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoText}>accelbia</span>
            <span className={styles.logoDesign}>.design</span>
          </div>

          {/* Desktop Navigation - Hidden when expanded */}
          <div
            className={`${styles.desktopNav} ${
              isExpanded ? styles.desktopNavHidden : ""
            }`}
          >
            <a href="#about" className={styles.navLink}>
              About
            </a>
            <a
              href="#contact"
              className={styles.navLink}
              onClick={handleContactClick}
            >
              Contact
            </a>
            <a
              href="#explore"
              className={`${styles.navLink} ${styles.navLinkDisabled}`}
              onClick={(e) => e.preventDefault()}
            >
              Explore
            </a>
            <a
              href="#work-for-us"
              className={styles.navLink}
              onClick={handleRecruitmentClick}
            >
              Work For Us
            </a>
            <a
              href="#blog"
              className={`${styles.navLink} ${styles.navLinkDisabled}`}
              onClick={(e) => e.preventDefault()}
            >
              Blog
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`${styles.menuIcon} ${
                isMobileMenuOpen ? styles.menuIconOpen : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Bento Grid - Shown when expanded and after animation completes */}
        {isExpanded && !isMobile && showBento && (
          <div
            className={`${styles.bentoGrid} ${
              bentoState ? styles[bentoState] : ""
            }`}
          >
            {/* About Widget */}
            <div className={`${styles.bentoCard} ${styles.aboutCard}`}>
              <h3 className={styles.bentoTitle}>About</h3>
              <p className={styles.bentoText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Contact Widget */}
            <div className={`${styles.bentoCard} ${styles.contactCard}`}>
              <h3 className={styles.bentoTitle}>Contact</h3>
              <form onSubmit={handleEmailSubmit} className={styles.contactForm}>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your email address"
                  className={styles.emailInput}
                  required
                />
                <div className={styles.contactIcons}>
                  <button
                    type="button"
                    onClick={handleMailClick}
                    className={styles.iconButton}
                    aria-label="Send email"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handlePhoneClick}
                    className={styles.iconButton}
                    aria-label="Call phone"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className={`${styles.iconButton} ${
                      !isEmailValid ? styles.iconButtonDisabled : ""
                    }`}
                    aria-label="Submit email"
                    disabled={!isEmailValid}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Explore Widget */}
            <div
              className={`${styles.bentoCard} ${styles.exploreCard} ${styles.bentoCardDisabled}`}
            >
              <h3 className={styles.bentoTitle}>Explore</h3>
              <div className={styles.placeholderContent}>
                <p>Coming Soon</p>
              </div>
            </div>

            {/* Work For Us Widget */}
            <div
              className={`${styles.bentoCard} ${styles.workCard}`}
              onClick={onRecruitmentClick}
            >
              <h3 className={styles.bentoTitle}>Work For Us</h3>
              <button className={styles.workButton}>Join Our Team</button>
            </div>

            {/* Blog Widget */}
            <div
              className={`${styles.bentoCard} ${styles.blogCard} ${styles.bentoCardDisabled}`}
            >
              <h3 className={styles.bentoTitle}>Blog</h3>
              <div className={styles.placeholderContent}>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.overlay} ${
          isMobileMenuOpen ? styles.overlayOpen : ""
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Side Drawer */}
      <div
        className={`${styles.sideDrawer} ${
          isMobileMenuOpen ? styles.sideDrawerOpen : ""
        }`}
      >
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerLogo}>
              <span className={styles.logoText}>accelbia</span>
              <span className={styles.logoDesign}>.design</span>
            </div>
          </div>

          <nav className={styles.drawerNav}>
            <a
              href="#about"
              className={styles.drawerNavLink}
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a
              href="#contact"
              className={styles.drawerNavLink}
              onClick={handleContactClick}
            >
              Contact
            </a>
            <a
              href="#explore"
              className={`${styles.drawerNavLink} ${styles.drawerNavLinkDisabled}`}
              onClick={(e) => e.preventDefault()}
            >
              Explore
            </a>
            <a
              href="#work-for-us"
              className={styles.drawerNavLink}
              onClick={handleRecruitmentClick}
            >
              Work For Us
            </a>
            <a
              href="#blog"
              className={`${styles.drawerNavLink} ${styles.drawerNavLinkDisabled}`}
              onClick={(e) => e.preventDefault()}
            >
              Blog
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
