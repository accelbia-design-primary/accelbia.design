import { useAuth } from "react-oidc-context";
import styles from "./styles.module.css";

const SecretsForm = () => {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "71q021nm4dr1bcbqdpucpit6d9";
    const logoutUri = "https://d84l1y8p4kdic.cloudfront.net";
    const cognitoDomain = "https://accelbia.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return (
      <div className={styles.form} style={{ textAlign: "center" }}>
        <p style={{ color: "#ffffff", fontFamily: "Poppins, sans-serif" }}>
          Loading authentication...
        </p>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className={styles.form}>
        <p className={`${styles.message} ${styles.messageError}`}>
          Authentication error: {auth.error.message}
        </p>
        <button onClick={() => auth.signinRedirect()} className={styles.button}>
          Try Again
        </button>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <div className={styles.form}>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              color: "#4caf50",
              fontFamily: "Very Vogue Display, serif",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            ✓ Access Granted
          </p>
          <p
            style={{
              color: "#ffffff",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>Welcome:</strong> {auth.user?.profile.email}
          </p>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.85rem",
            }}
          >
            You have successfully entered the secret cove.
          </p>
        </div>

        <button onClick={() => signOutRedirect()} className={styles.button}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <button onClick={() => auth.signinRedirect()} className={styles.button}>
        Enter the Cove
      </button>
    </div>
  );
};

export default SecretsForm;
