import "./App.css";
import Navbar from "./navbar";
import Background from "./background";
import LandingScreen from "./landingScreen";
import ClientLogos from "./clientLogos";
import Footer from "./footer";

const App = () => {
  return (
    <div className="app">
      <Background />
      <Navbar />
      <LandingScreen />

      <main>
        {/* Your app content goes here */}
        <div className="content-placeholder">
          <p className="vogue-display">Start building something amazing</p>
        </div>
      </main>

      <ClientLogos />
      <Footer />
    </div>
  );
};

export default App;
