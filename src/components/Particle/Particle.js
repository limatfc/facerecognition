import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Particle() {
  const particlesInit = async (main) => {
    return await loadFull(main);
  };

  const particlesLoaded = (container) => {
    return container;
  };

  return (
    <Particles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 120,
        particles: {
          number: {
            value: 150,
          },
          color: {
            value: "black",
          },
          links: {
            color: "#ffffff",
            distance: 200,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            speed: 1,
            straight: false,
          },
        },
      }}
    />
  );
}
