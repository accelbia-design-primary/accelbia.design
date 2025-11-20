import { useState, useRef } from "react";
import styles from "./styles.module.css";

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
      formData.append("to_email", "careers@accelbia.design");

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

  return (
    <div className={styles.container}>
      <p className={styles.introText}>
        Explore our open positions and join us in building exceptional digital
        experiences.
      </p>

      <div className={styles.positionsGrid}>
        {positions.map((position) => (
          <div
            key={position.id}
            className={`${styles.positionCard} ${
              selectedPosition === position.id
                ? styles.positionCardSelected
                : ""
            }`}
            onClick={() => handlePositionSelect(position.id)}
          >
            <div className={styles.positionHeader}>
              <span className={styles.positionEmoji}>{position.emoji}</span>
              <h3 className={styles.positionTitle}>{position.title}</h3>
            </div>
            <p className={styles.positionDescription}>{position.description}</p>
          </div>
        ))}
      </div>

      {selectedPosition && (
        <>
          <div className={styles.divider} />

          <div ref={formRef}>
            <h3 className={styles.sectionTitle}>
              We will get in touch with you
            </h3>

            <form onSubmit={submitRecruitmentForm} className={styles.form}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className={styles.input}
                required
                disabled={isSubmitting || isSubmitted}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className={styles.input}
                required
                disabled={isSubmitting || isSubmitted}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
                className={styles.input}
                required
                disabled={isSubmitting || isSubmitted}
              />
              <button
                type="submit"
                className={`${styles.button} ${
                  isSubmitted ? styles.buttonSuccess : ""
                }`}
                disabled={isSubmitting || isSubmitted}
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
                className={`${styles.message} ${
                  statusMessage.includes("successfully")
                    ? styles.messageSuccess
                    : styles.messageError
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </>
      )}

      <p className={styles.footerText}>
        We look forward to learning more about you and exploring how we can work
        together.
      </p>
    </div>
  );
};

export default RecruitmentForm;
