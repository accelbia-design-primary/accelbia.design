import LiquidEther from "./LiquidEther";

const Background = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <LiquidEther
        colors={["#c41d50", "#ff4081", "#e91e63", "#f06292", "#ff80ab"]}
        mouseForce={30}
        cursorSize={120}
        isViscous={false}
        viscous={30}
        iterationsViscous={24}
        iterationsPoisson={24}
        resolution={0.75}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.3}
        autoIntensity={1.5}
        takeoverDuration={0.5}
        autoResumeDelay={2000}
        autoRampDuration={1.0}
        dt={0.016}
        BFECC={true}
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
};

export default Background;
