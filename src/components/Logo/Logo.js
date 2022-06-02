import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt>
        <div className="br2 shadow-2 logo">
          <img src={brain} alt="a brain" style={{ width: "100%" }} />
        </div>
      </Tilt>
    </div>
  );
}
