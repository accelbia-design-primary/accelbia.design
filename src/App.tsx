import "./App.css";
import { useState } from "react";
import Navbar from "./navbar";
import Background from "./background";
import LandingScreen from "./landingScreen";
import BentoGrid from "./bentoGrid";
import InfiniteMenu from "./InfiniteMenu";
import ClientLogos from "./clientLogos";
import Footer from "./footer";
import Modal from "./modal";

const App = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);

  const items = [
    {
      image: "https://picsum.photos/300/300?grayscale",
      link: "https://google.com/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/400/400?grayscale",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ];

  return (
    <div className="app">
      <Background />
      <Navbar onContactClick={openContactModal} />
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
            <p className="vogue-display">Start building something amazing</p>
          </div>
        </main>
      </section>
      <section id="clients">
        <ClientLogos />
      </section>
      <section id="footer">
        <Footer
          onContactClick={openContactModal}
          onFeedbackClick={openFeedbackModal}
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

          <p style={{ marginTop: "2rem", fontStyle: "italic", opacity: 0.8 }}>
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
      fontFamily: "Very Vogue Text, serif",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    },
    textarea: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Very Vogue Text, serif",
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
      fontFamily: "Very Vogue Text, serif",
      fontSize: "0.9rem",
      cursor: isSubmitting || isSubmitted ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: isSubmitting || isSubmitted ? 0.7 : 1,
    },
    message: {
      fontFamily: "Very Vogue Text, serif",
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
      formData.append("message", feedback);
      formData.append("from_name", email || "Anonymous User");
      formData.append("to_email", "feedback@accelbia.design");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
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
      fontFamily: "Very Vogue Text, serif",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    },
    textarea: {
      padding: "0.75rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontFamily: "Very Vogue Text, serif",
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
      fontFamily: "Very Vogue Text, serif",
      fontSize: "0.9rem",
      cursor: isSubmitting || isSubmitted ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: isSubmitting || isSubmitted ? 0.7 : 1,
    },
    message: {
      fontFamily: "Very Vogue Text, serif",
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

export default App;
