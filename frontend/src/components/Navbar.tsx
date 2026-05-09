import type { FunctionalComponent } from "preact";
import KairoLogo from "../assets/icons/logo.png";
import '../styles/Navbar.css'

const Navbar: FunctionalComponent = () => {
  return (
    <nav>
      <div className="logo">
        <img src={KairoLogo} alt="nexus hackclub logo" />
      </div>
      <div className="small-logo-title">
        <h2>IT'S! TIME! TO! COOK!</h2>
      </div>
    </nav>
  );
};

export default Navbar;
