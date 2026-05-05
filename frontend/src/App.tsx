import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./app.css";

const App = () => {
  return (
    // id="app" matches the CSS — flex column, height 100%, overflow hidden
    <div id="app">
      <div className="wood-frame">
        <div className="wood-top" />
        <div className="wood-bottom" />
        <div className="wood-left" />
        <div className="wood-right" />
      </div>

      <Navbar />
      <Home />
    </div>
  );
};

export default App;