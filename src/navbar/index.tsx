import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Trigger the fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay for smoother appearance

    return () => clearTimeout(timer);
  }, []);

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
        className={`${styles.navbar} ${isVisible ? styles.navbarVisible : ""}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoText}>accelbia</span>
            <span className={styles.logoDesign}>.design</span>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
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
            <a href="#explore" className={styles.navLink}>
              Explore
            </a>
            <a
              href="#work-for-us"
              className={styles.navLink}
              onClick={handleRecruitmentClick}
            >
              Work For Us
            </a>
            <a href="#blog" className={styles.navLink}>
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
              className={styles.drawerNavLink}
              onClick={closeMobileMenu}
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
              className={styles.drawerNavLink}
              onClick={closeMobileMenu}
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
