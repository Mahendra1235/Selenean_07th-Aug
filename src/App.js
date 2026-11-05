import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

import Home from "./pages/Home";
import Silicon from "./pages/Silicon";
import Systems from "./pages/Systems";
import Sustainability from "./pages/Sustainability";
import Partners from "./pages/Partners";
// import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookie from "./pages/Cookie";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/silicon" element={<Silicon />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/partners" element={<Partners />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookie-policy" element={<Cookie />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;