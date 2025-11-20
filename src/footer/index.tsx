import { useState } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./styles.module.css";

interface FooterProps {
  onContactClick?: () => void;
  onFeedbackClick?: () => void;
  onRecruitmentClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onFeedbackClick,
  onRecruitmentClick,
}) => {
  const [email, setEmail] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("access_key", "8efe6827-4c43-4142-bef5-43beb1467900");
      formData.append("subject", "Newsletter Subscription Request");
      formData.append("email", email);
      formData.append(
        "message",
        `Newsletter subscription request from: ${email}`
      );
      formData.append("from_name", "Website Newsletter Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubscribed(true);
        setEmail("");
        // Reset button after 3 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);
      } else {
        console.error("Error:", data);
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    }
  };

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onFeedbackClick) {
      onFeedbackClick();
    }
  };

  const handleRecruitmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRecruitmentClick) {
      onRecruitmentClick();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <p className={styles.copyright}>© 2025 accelbia.design</p>

          <div className={styles.newsletter}>
            <p className={styles.newsletterTitle}>
              Join the newsletter and you'll get the latest updates, fresh
              inspiration, and teasers on what is coming next—delivered straight
              to your inbox!
            </p>
            <form onSubmit={subscribe} className={styles.newsletterForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={styles.emailInput}
                required
                disabled={isSubmitting || isSubscribed}
              />
              <button
                type="submit"
                className={`${styles.subscribeButton} ${
                  isSubscribed ? styles.subscribeButtonSuccess : ""
                }`}
                disabled={isSubmitting || isSubscribed}
              >
                {isSubmitting
                  ? "Subscribing..."
                  : isSubscribed
                  ? "Subscribed!"
                  : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`${styles.message} ${
                  message.includes("Successfully")
                    ? styles.messageSuccess
                    : styles.messageError
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Social Media Icons */}
          <div className={styles.social}>
            <SocialIcon
              url="https://x.com/accelbia_design"
              target="_blank"
              bgColor={hoveredIcon === "twitter" ? "#c41d50" : "#fff"}
              fgColor={hoveredIcon === "twitter" ? "#fff" : "#000"}
              style={{
                height: 30,
                width: 30,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIcon("twitter")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              url="https://www.facebook.com/accelbia.design/"
              target="_blank"
              bgColor={hoveredIcon === "facebook" ? "#c41d50" : "#fff"}
              fgColor={hoveredIcon === "facebook" ? "#fff" : "#000"}
              style={{
                height: 30,
                width: 30,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIcon("facebook")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              url="https://instagram.com/accelbia.design"
              target="_blank"
              bgColor={hoveredIcon === "instagram" ? "#c41d50" : "#fff"}
              fgColor={hoveredIcon === "instagram" ? "#fff" : "#000"}
              style={{
                height: 30,
                width: 30,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIcon("instagram")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              url="https://www.linkedin.com/company/accelbia-design/"
              target="_blank"
              bgColor={hoveredIcon === "linkedin" ? "#c41d50" : "#fff"}
              fgColor={hoveredIcon === "linkedin" ? "#fff" : "#000"}
              style={{
                height: 30,
                width: 30,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIcon("linkedin")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              url="https://www.youtube.com/@accelbia.design"
              bgColor={hoveredIcon === "youtube" ? "#c41d50" : "#fff"}
              fgColor={hoveredIcon === "youtube" ? "#fff" : "#000"}
              style={{
                height: 30,
                width: 30,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIcon("youtube")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.quickLinksSection}>
          <h3 className={styles.quickLinksTitle}>Quick Links</h3>
          <div className={styles.separator}></div>
          <nav className={styles.quickLinks}>
            <a href="#about" className={styles.quickLink}>
              About
            </a>
            <a
              href="#contact"
              className={styles.quickLink}
              onClick={handleContactClick}
            >
              Contact
            </a>
            <a
              href="#feedback"
              className={styles.quickLink}
              onClick={handleFeedbackClick}
            >
              Feedback
            </a>
            <a href="#blog" className={styles.quickLink}>
              Blog
            </a>
            <a
              href="#work-for-us"
              className={styles.quickLink}
              onClick={handleRecruitmentClick}
            >
              Work For Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
