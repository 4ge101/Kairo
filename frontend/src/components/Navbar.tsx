import type { FunctionalComponent } from "preact";
import NexusLogo from "../assets/icons/logo.png";
import '../styles/Navbar.css'

const Navbar: FunctionalComponent = () => {
  return (
    <nav>
      <div className="logo">
        <img src={NexusLogo} alt="nexus hackclub logo" />
      </div>
      <div className="small-logo-title">
        <h2>IT'S! TIME! TO! COOK!</h2>
      </div>
    </nav>
  );
};

export default Navbar;
