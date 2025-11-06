import { useMemo, useState, useRef } from "react";
import styles from "./styles.module.css";

const ClientLogos = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const logos = [
    {
      name: "Potpourri",
      src: "/clients/Potpourri.svg",
      hover: "/client_hovers/Potpourri.png",
      url: "https://www.potpourri.agency/",
    },
    {
      name: "SK",
      src: "/clients/SK.svg",
      hover: "/client_hovers/SK.png",
      url: "https://accelbia-design-prelude.github.io/supriya-portfolio/",
    },
    {
      name: "TPC",
      src: "/clients/TPC.svg",
      hover: "/client_hovers/TPC.png",
      url: "https://www.thepedagogycommunity.org/",
    },
    {
      name: "TPPL",
      src: "/clients/TPPL.svg",
      hover: "/client_hovers/TPPL.png",
      url: "https://www.telford.in/",
    },
    {
      name: "Unibreakers",
      src: "/clients/Unibreakers.svg",
      hover: "/client_hovers/Unibreakers.png",
      url: "https://unibreakers.netlify.app/",
    },
  ];

  // Randomly divide logos into two rows for mobile
  const { topRow, bottomRow } = useMemo(() => {
    const shuffled = [...logos].sort(() => Math.random() - 0.5);
    const midPoint = Math.ceil(shuffled.length / 2);
    return {
      topRow: shuffled.slice(0, midPoint),
      bottomRow: shuffled.slice(midPoint),
    };
  }, []);

  const handleMouseEnter = (logoName: string) => {
    setHoveredLogo(logoName);
  };

  const handleMouseLeave = () => {
    setHoveredLogo(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Create multiple copies for seamless infinite scroll
  const createLogoRow = (logoArray: typeof logos, reverse = false) => {
    const extendedLogos = [...logoArray, ...logoArray, ...logoArray];
    return (
      <div className={`${styles.logoRow} ${reverse ? styles.reverse : ""}`}>
        {extendedLogos.map((logo, index) => (
          <a
            key={`${logo.name}-${index}`}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoItem}
            onMouseEnter={() => handleMouseEnter(logo.name)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className={styles.logoImage}
            />
          </a>
        ))}
      </div>
    );
  };

  const hoveredLogoData = logos.find((logo) => logo.name === hoveredLogo);

  return (
    <section className={styles.clientSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Trusted by Amazing Clients</h2>

        {/* Desktop: Single Row */}
        <div className={styles.desktopView}>
          <div className={styles.scrollContainer}>{createLogoRow(logos)}</div>
        </div>

        {/* Mobile: Two Rows */}
        <div className={styles.mobileView}>
          <div className={styles.scrollContainer}>{createLogoRow(topRow)}</div>
          <div className={styles.scrollContainer}>
            {createLogoRow(bottomRow, true)}
          </div>
        </div>

        {/* Hover Image */}
        {hoveredLogo && hoveredLogoData && (
          <div
            className={styles.hoverImage}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          >
            <img
              src={hoveredLogoData.hover}
              alt={`${hoveredLogo} hover`}
              className={styles.hoverImageContent}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
