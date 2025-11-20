import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useAssetPreloader } from "./hooks/useAssetPreloader";
import LoadingScreen from "./loadingScreen";
import Navbar from "./navbar";
import Background from "./background";
import LandingScreen from "./landingScreen";
import BentoGrid from "./bentoGrid";
import InfiniteMenu from "./InfiniteMenu";
import ClientLogos from "./clientLogos";
import Testimonials from "./testimonials";
import Footer from "./footer";
import Modal from "./modal";

const App = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRecruitmentModalOpen, setIsRecruitmentModalOpen] = useState(false);
  const { progress, isLoading } = useAssetPreloader();

  // Check for URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const popoverParam = urlParams.get("popover");

    if (popoverParam === "feedback") {
      setIsFeedbackModalOpen(true);
      // Clean up URL by removing the parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("popover");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);
  const openRecruitmentModal = () => setIsRecruitmentModalOpen(true);
  const closeRecruitmentModal = () => setIsRecruitmentModalOpen(false);

  const handleLoadingComplete = () => {
    // Additional logic can be added here if needed
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
    // {
    //   image: "/projects/titp.png",
    //   link: "https://google.com/",
    //   title: "Item 3",
    //   description: "This is pretty cool, right?",
    // },
    // {
    //   image: "/projects/titp.png",
    //   link: "https://google.com/",
    //   title: "Item 4",
    //   description: "This is pretty cool, right?",
    // },
  ];

  // Show loading screen while assets are loading
  if (isLoading) {
    return (
      <LoadingScreen progress={progress} onComplete={handleLoadingComplete} />
    );
  }

  return (
    <div className="app">
      <Background />
      <Navbar
        onContactClick={openContactModal}
        onRecruitmentClick={openRecruitmentModal}
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
        />
      </section>

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
    </div>
  );
};

// Contact Form Component
const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitContactForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      setStatusMessage("Please enter a message.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("access_key", "8efe6827-4c43-4142-bef5-43beb1467900");
      formData.append("subject", "Contact Form Inquiry from accelbia.design");
      formData.append("email", email);
      formData.append("message", message);
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
        setMessage("");
        setStatusMessage(
          "Message sent successfully! We'll get back to you soon."
        );
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setStatusMessage("");
        }, 5000);
      } else {
        console.error("Error:", data);
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyles = {
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    input: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    },
    textarea: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      minHeight: "100px",
      resize: "vertical" as const,
      transition: "all 0.3s ease",
    },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: isSubmitted ? "#4caf50" : "#c41d50",
      border: "none",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      cursor: isSubmitting || isSubmitted ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: isSubmitting || isSubmitted ? 0.7 : 1,
    },
    message: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.85rem",
      padding: "0.5rem",
      transition: "all 0.3s ease",
    },
    messageSuccess: {
      color: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
    },
    messageError: {
      color: "#ff6b6b",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      border: "1px solid rgba(255, 107, 107, 0.3)",
    },
  };

  return (
    <>
      <form onSubmit={submitContactForm} style={formStyles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address"
          style={formStyles.input}
          required
          disabled={isSubmitting || isSubmitted}
          onFocus={(e) => {
            e.target.style.borderColor = "#c41d50";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          style={formStyles.textarea}
          required
          disabled={isSubmitting || isSubmitted}
          onFocus={(e) => {
            e.target.style.borderColor = "#c41d50";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          style={formStyles.button}
          disabled={isSubmitting || isSubmitted}
          onMouseOver={(e) => {
            if (!isSubmitting && !isSubmitted) {
              e.currentTarget.style.backgroundColor = isSubmitted
                ? "#45a049"
                : "#a01640";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(196, 29, 80, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting && !isSubmitted) {
              e.currentTarget.style.backgroundColor = isSubmitted
                ? "#4caf50"
                : "#c41d50";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {isSubmitting
            ? "Sending..."
            : isSubmitted
            ? "Message Sent!"
            : "Send Message"}
        </button>
      </form>
      {statusMessage && (
        <p
          style={{
            ...formStyles.message,
            ...(statusMessage.includes("successfully")
              ? formStyles.messageSuccess
              : formStyles.messageError),
            marginTop: "1rem",
          }}
        >
          {statusMessage}
        </p>
      )}
    </>
  );
};

// Feedback Form Component
const FeedbackForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitFeedbackForm = async (event: React.FormEvent) => {
    event.preventDefault();

    // Only validate email if it's provided
    if (email.trim() && !validateEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    if (!feedback.trim()) {
      setStatusMessage("Please enter your feedback.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("access_key", "8efe6827-4c43-4142-bef5-43beb1467900");
      formData.append("subject", "Feedback from accelbia.design");
      formData.append("email", email || "anonymous@feedback.local");
      formData.append(
        "message",
        `Name: ${name || "Anonymous"}\nEmail: ${
          email || "Not provided"
        }\n\nFeedback:\n${feedback}`
      );
      formData.append("from_name", name || email || "Anonymous User");
      formData.append("to_email", "feedback@accelbia.design");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setFeedback("");
        setStatusMessage(
          "Feedback sent successfully! Thank you for helping us improve."
        );
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setStatusMessage("");
        }, 5000);
      } else {
        console.error("Error:", data);
        setStatusMessage("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyles = {
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    input: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    },
    textarea: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      minHeight: "120px",
      resize: "vertical" as const,
      transition: "all 0.3s ease",
    },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: isSubmitted ? "#4caf50" : "#c41d50",
      border: "none",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      cursor: isSubmitting || isSubmitted ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: isSubmitting || isSubmitted ? 0.7 : 1,
    },
    message: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.85rem",
      padding: "0.5rem",
      transition: "all 0.3s ease",
    },
    messageSuccess: {
      color: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
    },
    messageError: {
      color: "#ff6b6b",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      border: "1px solid rgba(255, 107, 107, 0.3)",
    },
  };

  return (
    <>
      <form onSubmit={submitFeedbackForm} style={formStyles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name (Optional)"
          style={formStyles.input}
          disabled={isSubmitting || isSubmitted}
          onFocus={(e) => {
            e.target.style.borderColor = "#c41d50";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address (Optional)"
          style={formStyles.input}
          disabled={isSubmitting || isSubmitted}
          onFocus={(e) => {
            e.target.style.borderColor = "#c41d50";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback, suggestions, or thoughts..."
          style={formStyles.textarea}
          required
          disabled={isSubmitting || isSubmitted}
          onFocus={(e) => {
            e.target.style.borderColor = "#c41d50";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          style={formStyles.button}
          disabled={isSubmitting || isSubmitted}
          onMouseOver={(e) => {
            if (!isSubmitting && !isSubmitted) {
              e.currentTarget.style.backgroundColor = isSubmitted
                ? "#45a049"
                : "#a01640";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(196, 29, 80, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting && !isSubmitted) {
              e.currentTarget.style.backgroundColor = isSubmitted
                ? "#4caf50"
                : "#c41d50";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {isSubmitting
            ? "Sending..."
            : isSubmitted
            ? "Feedback Sent!"
            : "Send Feedback"}
        </button>
      </form>
      {statusMessage && (
        <p
          style={{
            ...formStyles.message,
            ...(statusMessage.includes("successfully")
              ? formStyles.messageSuccess
              : formStyles.messageError),
            marginTop: "1rem",
          }}
        >
          {statusMessage}
        </p>
      )}
    </>
  );
};

// Recruitment Form Component
const RecruitmentForm: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const positions = [
    {
      id: "sales-director",
      title: "Founding Sales Director",
      emoji: "💼",
      description:
        "We're seeking a strategic sales leader to build and scale our client relationships from the ground up. You'll drive business development, establish our market presence, and create sustainable revenue streams. Ideal for someone who excels at building meaningful partnerships and has a proven track record in closing enterprise deals.",
    },
    {
      id: "backend-engineer",
      title: "Founding Backend Engineer",
      emoji: "⚙️",
      description:
        "Join us to architect and build robust backend systems that power our products. You'll work with modern technologies, design scalable APIs, and shape our technical foundation. We're looking for someone with strong fundamentals in system design, databases, and a passion for writing clean, maintainable code.",
    },
    {
      id: "intern",
      title: "Interns",
      emoji: "🎯",
      description:
        "Starting your career or looking to gain hands-on experience? We offer opportunities across design, development, and marketing. You'll work on real projects, learn from experienced professionals, and contribute meaningfully to our growth. We value curiosity, dedication, and a willingness to learn.",
    },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const handlePositionSelect = (positionId: string) => {
    setSelectedPosition(positionId);
    // Scroll to form after a short delay to ensure it's rendered
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  const submitRecruitmentForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPosition) {
      setStatusMessage("Please select a position to continue.");
      return;
    }

    if (!validateEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setStatusMessage("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const position = positions.find((p) => p.id === selectedPosition);
      const formData = new FormData();
      formData.append("access_key", "8efe6827-4c43-4142-bef5-43beb1467900");
      formData.append("subject", `Recruitment Form - ${position?.title}`);
      formData.append("email", email);
      formData.append(
        "message",
        `Position: ${position?.title}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
      );
      formData.append("from_name", name);
      formData.append("to_email", "recruitment@accelbia.design");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setSelectedPosition("");
        setStatusMessage(
          "Application submitted successfully. We'll be in touch soon."
        );
        setTimeout(() => {
          setIsSubmitted(false);
          setStatusMessage("");
        }, 5000);
      } else {
        console.error("Error:", data);
        setStatusMessage("Failed to send application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    positionsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1rem",
      marginBottom: "1rem",
    },
    positionCard: (isSelected: boolean) => ({
      padding: "1.25rem",
      backgroundColor: isSelected
        ? "rgba(196, 29, 80, 0.2)"
        : "rgba(255, 255, 255, 0.05)",
      border: `2px solid ${
        isSelected ? "#c41d50" : "rgba(255, 255, 255, 0.1)"
      }`,
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative" as const,
    }),
    positionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem",
    },
    positionEmoji: {
      fontSize: "1.5rem",
    },
    positionTitle: {
      fontFamily: "Very Vogue Display, serif",
      fontSize: "1.1rem",
      color: "#ffffff",
      margin: 0,
    },
    positionDescription: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.85rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: "1.5",
      margin: 0,
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    input: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
      borderRadius: "4px",
    },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: isSubmitted ? "#4caf50" : "#c41d50",
      border: "none",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      cursor: isSubmitting || isSubmitted ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: isSubmitting || isSubmitted ? 0.7 : 1,
      borderRadius: "4px",
    },
    divider: {
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      margin: "1rem 0",
    },
    sectionTitle: {
      fontFamily: "Very Vogue Display, serif",
      fontSize: "1.1rem",
      color: "#c41d50",
      marginBottom: "1rem",
    },
    message: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.85rem",
      padding: "0.5rem",
      borderRadius: "4px",
      transition: "all 0.3s ease",
    },
    messageSuccess: {
      color: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
    },
    messageError: {
      color: "#ff6b6b",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      border: "1px solid rgba(255, 107, 107, 0.3)",
    },
    footerText: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.85rem",
      color: "rgba(255, 255, 255, 0.6)",
      textAlign: "center" as const,
      fontStyle: "italic",
    },
  };

  return (
    <div style={formStyles.container}>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "0.95rem",
          color: "rgba(255, 255, 255, 0.9)",
          marginBottom: "0.5rem",
        }}
      >
        Explore our open positions and join us in building exceptional digital
        experiences.
      </p>

      <div style={formStyles.positionsGrid}>
        {positions.map((position) => (
          <div
            key={position.id}
            style={formStyles.positionCard(selectedPosition === position.id)}
            onClick={() => handlePositionSelect(position.id)}
            onMouseOver={(e) => {
              if (selectedPosition !== position.id) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(196, 29, 80, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (selectedPosition !== position.id) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <div style={formStyles.positionHeader}>
              <span style={formStyles.positionEmoji}>{position.emoji}</span>
              <h3 style={formStyles.positionTitle}>{position.title}</h3>
            </div>
            <p style={formStyles.positionDescription}>{position.description}</p>
          </div>
        ))}
      </div>

      {selectedPosition && (
        <>
          <div style={formStyles.divider} />

          <div ref={formRef}>
            <h3 style={formStyles.sectionTitle}>
              We will get in touch with you
            </h3>

            <form onSubmit={submitRecruitmentForm} style={formStyles.form}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                style={formStyles.input}
                required
                disabled={isSubmitting || isSubmitted}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c41d50";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                style={formStyles.input}
                required
                disabled={isSubmitting || isSubmitted}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c41d50";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
                style={formStyles.input}
                required
                disabled={isSubmitting || isSubmitted}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c41d50";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.target.style.boxShadow = "0 0 10px rgba(196, 29, 80, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                style={formStyles.button}
                disabled={isSubmitting || isSubmitted}
                onMouseOver={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.backgroundColor = isSubmitted
                      ? "#45a049"
                      : "#a01640";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(196, 29, 80, 0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.backgroundColor = isSubmitted
                      ? "#4caf50"
                      : "#c41d50";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isSubmitted
                  ? "Application Submitted"
                  : "Submit Application"}
              </button>
            </form>

            {statusMessage && (
              <p
                style={{
                  ...formStyles.message,
                  ...(statusMessage.includes("successfully")
                    ? formStyles.messageSuccess
                    : formStyles.messageError),
                }}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </>
      )}

      <p style={formStyles.footerText}>
        We look forward to learning more about you and exploring how we can work
        together.
      </p>
    </div>
  );
};

export default App;
