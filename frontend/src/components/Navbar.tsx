import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
      className="bg-gradient-to-r from-black to-zinc-900 bg-opacity-95 backdrop-blur-md text-gray-100 px-6 py-4 flex gap-6 items-center shadow-md"
    >
    <Link
    to="/"
    className="text-lg text-gray-300 hover:text-white hover:brightness-125 hover:scale-105 transition-all duration-200 tracking-tight"
  >
    Home
  </Link>
  <Link
    to="/prompt"
    className="text-lg text-gray-300 hover:text-white hover:brightness-125 hover:scale-105 transition-all duration-200 tracking-tight"
  >
    Prompt Tool
  </Link>
  <Link
    to="/prompting101"
    className="text-lg text-gray-300 hover:text-white hover:brightness-125 hover:scale-105 transition-all duration-200 tracking-tight"
  >
    Prompting 101
  </Link>
  <Link
    to="/login"
    className="text-lg text-gray-300 hover:text-white hover:brightness-125 hover:scale-105 transition-all duration-200 ml-auto tracking-tight"
  >
    Login
  </Link>
  <Link
    to="/register"
    className="text-lg text-gray-300 hover:text-white hover:brightness-125 hover:scale-105 transition-all duration-200 tracking-tight"
  >
    Register
  </Link>
    </motion.nav>
  );
}
