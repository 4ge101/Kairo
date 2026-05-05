import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./app.css";

const App = () => {
  return (
    <>
      <div className="wood-frame">
        <div className="wood-top" />
        <div className="wood-bottom" />
        <div className="wood-left" />
        <div className="wood-right" />
      </div>

      <Navbar />
      <Home />
    </>
  );
};

export default App;