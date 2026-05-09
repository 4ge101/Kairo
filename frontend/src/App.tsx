import Router from "preact-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./app.css";

// Import your own pages here as you build them:
import Events from "./pages/Events";
import About from "./pages/About";
import Guides from "./pages/Guides";
import Social from "./pages/Social";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";

const App = () => {
  return (
    <div id="app">
      <div className="wood-frame">
        <div className="wood-top" />
        <div className="wood-bottom" />
        <div className="wood-left" />
        <div className="wood-right" />
      </div>

      <Navbar />

      <Router>
        <Home path="/" />
        <Events path="/events" />
        <About path="/about" />
        <Guides path="/guides" />
        <Social path="/social" />
        <Blog path="/blog" />
        <Contact path="/contact" />
        <Faq path="/faq" />
      </Router>
    </div>
  );
};

export default App;
