import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-3 select-none flex items-center gap-2">
            <span className="text-2xl">📚</span> Library Management
          </h2>
          <p className="text-sm leading-relaxed">
            A modern web application to manage library books, users, and borrowing activity with ease.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/about" className="hover:underline hover:text-gray-100 transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-gray-100 transition-colors duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline hover:text-gray-100 transition-colors duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline hover:text-gray-100 transition-colors duration-300">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm leading-snug">
            Email:{" "}
            <a href="mailto:mainurrahat51@gmail.com" className="hover:underline hover:text-gray-100 transition-colors duration-300">
              mainurrahat51@gmail.com
            </a>
          </p>
          <p className="text-sm mt-2">Phone: +880 1890-159627</p>
          <p className="text-sm mt-2">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Me</h3>
          <div className="flex space-x-5 mt-2">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500 select-none">
        &copy; {new Date().getFullYear()} Mainur Islam Rahat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
