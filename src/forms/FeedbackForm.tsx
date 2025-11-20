import { useState } from "react";
import styles from "./styles.module.css";

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

  return (
    <>
      <form onSubmit={submitFeedbackForm} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name (Optional)"
          className={styles.input}
          disabled={isSubmitting || isSubmitted}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address (Optional)"
          className={styles.input}
          disabled={isSubmitting || isSubmitted}
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback, suggestions, or thoughts..."
          className={`${styles.textarea} ${styles.textareaLarge}`}
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
            ? "Feedback Sent!"
            : "Send Feedback"}
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

export default FeedbackForm;
