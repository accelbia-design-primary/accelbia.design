import { useState } from "react";
import styles from "./styles.module.css";

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

  return (
    <>
      <form onSubmit={submitContactForm} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address"
          className={styles.input}
          required
          disabled={isSubmitting || isSubmitted}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className={styles.textarea}
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
            ? "Sending..."
            : isSubmitted
            ? "Message Sent!"
            : "Send Message"}
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
    </>
  );
};

export default ContactForm;
