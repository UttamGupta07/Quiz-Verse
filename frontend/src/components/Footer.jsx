 import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-indigo-500 text-3xl" />

              <h2 className="text-2xl font-bold text-white">
                QuizMaster
              </h2>
            </div>

            <p className="mt-4 text-gray-400 leading-7">
              Practice thousands of quiz questions, track your progress,
              and compete with learners around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="hover:text-indigo-400 transition"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/leaderboard"
                  className="hover:text-indigo-400 transition"
                >
                  Leaderboard
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-400 transition"
                >
                  About
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-indigo-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-indigo-400 transition"
                >
                  FAQ
                </Link>
              </li>

            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Connect
            </h3>

            <div className="space-y-4">

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-indigo-400 transition"
              >
                <FaGithub className="text-xl" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-indigo-400 transition"
              >
                <FaLinkedin className="text-xl" />
                LinkedIn
              </a>

              <a
                href="mailto:your@email.com"
                className="flex items-center gap-3 hover:text-indigo-400 transition"
              >
                <FaEnvelope className="text-xl" />
                Email
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 mt-4 md:mt-0">
            Built with ❤️ using React, Tailwind CSS & Node.js
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;