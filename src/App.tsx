import "./App.css";
import { useState, useEffect } from "react";
import { useAssetPreloader } from "./hooks/useAssetPreloader";
import { POPOVER_CONFIGS, cleanPopoverFromUrl } from "./configs/popovers";
import type { PopoverType } from "./configs/popovers";
import LoadingScreen from "./components/loadingScreen";
import TransitionOverlay from "./components/TransitionOverlay";
import Navbar from "./navbar";
import Background from "./components/background";
import LandingScreen from "./landingScreen";
import BentoGrid from "./components/bentoGrid";
import InfiniteMenu from "./components/InfiniteMenu";
import ClientLogos from "./components/clientLogos";
import Testimonials from "./components/testimonials";
import Footer from "./footer";
import Modal from "./components/modal";
import AboutSection from "./components/AboutSection";
import ContactForm from "./forms/ContactForm";
import FeedbackForm from "./forms/FeedbackForm";
import RecruitmentForm from "./forms/RecruitmentForm";
import SecretsForm from "./forms/SecretsForm";

const App = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRecruitmentModalOpen, setIsRecruitmentModalOpen] = useState(false);
  const [isSecretsModalOpen, setIsSecretsModalOpen] = useState(false);
  const [isAboutSectionOpen, setIsAboutSectionOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { progress, isLoading } = useAssetPreloader();

  // Check for URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const popoverParam = urlParams.get("popover") as PopoverType | null;

    if (popoverParam) {
      // Map popover parameter to modal state setters
      const modalSetters: Record<PopoverType, () => void> = {
        feedback: () => setIsFeedbackModalOpen(true),
        contact: () => setIsContactModalOpen(true),
        careers: () => setIsRecruitmentModalOpen(true),
        secrets: () => setIsSecretsModalOpen(true),
      };

      // Open the corresponding modal if valid popover type
      if (popoverParam in POPOVER_CONFIGS) {
        modalSetters[popoverParam]();
        cleanPopoverFromUrl();
      }
    }
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);
  const openRecruitmentModal = () => setIsRecruitmentModalOpen(true);
  const closeRecruitmentModal = () => setIsRecruitmentModalOpen(false);
  const openSecretsModal = () => setIsSecretsModalOpen(true);
  const closeSecretsModal = () => setIsSecretsModalOpen(false);
  const openAboutSection = () => setIsAboutSectionOpen(true);
  const closeAboutSection = () => setIsAboutSectionOpen(false);

  const handleLogoClick = () => {
    // Check if already at root
    if (window.location.pathname === "/" && window.scrollY === 0) {
      return; // Already at root, do nothing
    }

    // Start transition animation
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    // Navigate to root after animation completes
    window.location.href = "/";
  };

  const items = [
    {
      image: "/projects/titp.png",
      link: "https://google.com/",
      title: "This is the Proof",
      description:
        "A social media platform that verifies information to its root source, ensuring correctness and trustability.",
    },
    {
      image: "/projects/2nd-deg.png",
      link: "https://google.com/",
      title: "2nd\u00B0",
      description:
        "We connect people, through people you trust, to people you know you can trust.",
    },
  ];

  // Show loading screen while assets are loading
  if (isLoading) {
    return <LoadingScreen progress={progress} onComplete={() => {}} />;
  }

  return (
    <div className="app">
      <TransitionOverlay
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
      />
      <Background />
      <Navbar
        onContactClick={openContactModal}
        onRecruitmentClick={openRecruitmentModal}
        onLogoClick={handleLogoClick}
        onSecretsClick={openSecretsModal}
        onAboutClick={openAboutSection}
      />
      <section id="landing">
        <LandingScreen />
      </section>
      <section id="bento">
        <BentoGrid />
      </section>
      <section id="infinite-menu">
        <div style={{ height: "600px", position: "relative" }}>
          <InfiniteMenu items={items} />
        </div>
      </section>
      <section id="main">
        <main>
          {/* Your app content goes here */}
          <div className="content-placeholder">
            <p className="vogue-display">What we are working on</p>
          </div>
        </main>
      </section>
      <section id="clients">
        <ClientLogos />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="footer">
        <Footer
          onContactClick={openContactModal}
          onFeedbackClick={openFeedbackModal}
          onRecruitmentClick={openRecruitmentModal}
          onSecretsClick={openSecretsModal}
          onAboutClick={openAboutSection}
        />
      </section>

      {/* About Section */}
      <AboutSection
        isOpen={isAboutSectionOpen}
        onClose={closeAboutSection}
        onContactClick={openContactModal}
      />

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Get in Touch"
      >
        <div>
          <p>
            Ready to transform your ideas into reality? Let's discuss your next
            project.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <h3
              style={{
                fontFamily: "Very Vogue Display, serif",
                color: "#c41d50",
                marginBottom: "1rem",
                fontSize: "1.25rem",
              }}
            >
              Contact Information
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:inquiry@accelbia.design"
                  style={{ color: "#c41d50", textDecoration: "none" }}
                >
                  inquiry@accelbia.design
                </a>
              </div>

              <div>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+918604485198"
                  style={{ color: "#c41d50", textDecoration: "none" }}
                >
                  +91 8604485198
                </a>
              </div>

              <div>
                <strong>Location:</strong> India
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3
              style={{
                fontFamily: "Very Vogue Display, serif",
                color: "#c41d50",
                marginBottom: "1rem",
                fontSize: "1.25rem",
              }}
            >
              Send us a Message
            </h3>
            <ContactForm />
          </div>

          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              opacity: 0.8,
              fontFamily: "Very Vogue Text, serif",
            }}
          >
            Let's create something extraordinary together.
          </p>
        </div>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
        title="Share Your Feedback"
      >
        <div>
          <p>
            Your feedback helps us improve and deliver better experiences. We'd
            love to hear your thoughts!
          </p>

          <div style={{ marginTop: "2rem" }}>
            <h3
              style={{
                fontFamily: "Very Vogue Display, serif",
                color: "#c41d50",
                marginBottom: "1rem",
                fontSize: "1.25rem",
              }}
            >
              Send us Your Feedback
            </h3>
            <FeedbackForm />
          </div>

          <p style={{ marginTop: "2rem", fontStyle: "italic", opacity: 0.8 }}>
            Thank you for helping us grow and improve.
          </p>
        </div>
      </Modal>

      {/* Recruitment Modal */}
      <Modal
        isOpen={isRecruitmentModalOpen}
        onClose={closeRecruitmentModal}
        title="Career Opportunities"
        maxWidth="700px"
      >
        <RecruitmentForm />
      </Modal>

      {/* Secrets Modal */}
      <Modal
        isOpen={isSecretsModalOpen}
        onClose={closeSecretsModal}
        title="The Secret Cove"
        maxWidth="500px"
      >
        <SecretsForm />
      </Modal>
    </div>
  );
};

export default App;
