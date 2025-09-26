import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/movie/:id" element={<PageWrapper><MovieDetail /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
        <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-gray-900 dark:bg-gray-900"
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
