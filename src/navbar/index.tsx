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
          <div
            className={styles.logo}
            onClick={() => (window.location.href = "/")}
          >
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

            {/* Work For Us Widget */}
            <div
              className={`${styles.bentoCard} ${styles.workCard}`}
              onClick={onRecruitmentClick}
            >
              <h3 className={styles.bentoTitle}>Work For Us</h3>
              <button className={styles.workButton}>Join Our Team</button>
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
