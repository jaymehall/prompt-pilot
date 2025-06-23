import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-[#0f172a] to-[#10172a] bg-opacity-90 backdrop-blur-sm text-white px-6 py-4 flex gap-6 items-center shadow-md"
    >
      <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
      <Link to="/prompt" className="hover:text-blue-400 transition-colors duration-200">Prompt Tool</Link>
      <Link to="/prompting101" className="hover:text-blue-400 transition-colors duration-200">Prompting 101</Link>
      <Link to="/login" className="hover:text-blue-400 transition-colors duration-200 ml-auto">Login</Link>
      <Link to="/register" className="hover:text-blue-400 transition-colors duration-200">Register</Link>
    </motion.nav>
  );
}
