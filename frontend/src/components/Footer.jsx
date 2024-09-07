import { useMemo } from "react";
import PropTypes from "prop-types";

const Footer = ({
  className = "",
  footerTop,
  buttonPosition,
  buttonTop,
  buttonLeft,
  sIGNIN,
}) => {
  const footerStyle = useMemo(() => {
    return {
      top: footerTop,
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "right bottom",
      // backgroundSize: "contain",
    };
  }, [footerTop]);

  return (
    <footer
      id="about-us"
      className={`relative w-full bg-[url('/public/footer@3x.png')] bg-cover bg-no-repeat text-left text-sm text-gainsboro font-outfit ${className}`}
      style={footerStyle}
    >
      <div className="container mx-auto w-full py-10">
        <div className="flex flex-wrap justify-between">
          {/* Left Section */}
          <div className="flex flex-col items-start pl-4 md:pl-16 space-y-4 w-full md:w-1/4">
            <div className="flex items-center gap-4">
              <img
                className="w-16 h-16"
                alt="Logo"
                src="/link--logo--logo2xwhite1webp@2x.png"
              />
              <div>
                <h2 className="text-white font-semibold text-lg mb-0">
                  FarmSure
                </h2>
                <div className="text-white text-xs">
                  an agri-tech initiative
                </div>
              </div>
            </div>
            <p className="text-white text-sm">
              Using cutting-edge tech to provide farmers a marketplace where
              they are in control of their crops.
            </p>
            <a href="/signup">
              <button className="bg-white text-[#264e36] rounded-full py-2 px-6 text-sm mt-4">
                Create Account
              </button>
            </a>
          </div>

          {/* Explore Section */}
          <div className="flex flex-col items-start space-y-2 w-full md:w-1/6 mt-8 md:mt-0 md:ml-20">
            <h2 className="text-lg text-white mb-2">Explore</h2>
            <a href="/" className="text-white hover:underline">
              Home
            </a>
            <a href="/marketplace" className="text-white hover:underline">
              MarketPlace
            </a>
            <a href="/profile" className="text-white hover:underline">
              Profile
            </a>
            <a href="#about-us" className="text-white hover:underline">
              About Us
            </a>
            <a href="#faqs" className="text-white hover:underline">
              FAQs
            </a>
          </div>

          {/* Milestones Section */}
          <div className="flex flex-col items-start space-y-2 w-full md:w-1/4 mt-8 md:mt-0 md:ml-8">
            <h2 className="text-lg text-white">Milestones</h2>
            <img className="w-48" alt="Milestone 1" src="/frame-6.svg" />
            <img className="w-48 mt-4" alt="Milestone 2" src="/frame-8.svg" />
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col items-start space-y-4 w-full md:w-1/4 mt-8 md:mt-0 md:ml-[-2rem] md:mr-5">
            <h2 className="text-lg text-white">Contact Info</h2>
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8"
                alt="Address Icon"
                src="/list--item.svg"
              />
              <div>
                <div className="text-yellow-500 uppercase text-xs">
                  Address:
                </div>
                <div className="text-white text-sm">
                  Heritage Institute of Technology, Anandapur, Kolkata
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8"
                alt="Email Icon"
                src="/list--item1.svg"
              />
              <div>
                <div className="text-yellow-500 uppercase text-xs">Email:</div>
                <div className="text-white text-sm">
                  <a
                    href="mailto:sachin.kumar.cse26@heritageit.edu.in"
                    className="text-white hover:text-blue-300 underline"
                  >
                    sachin.kumar.cse26@heritageit.edu.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-lightgray leading-6 mt-10">
          <span className="font-semibold text-sm">
            © Copyright 2024. All Rights Reserved by Team FarmSure ☘✨
          </span>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  buttonPosition: PropTypes.string,
  buttonTop: PropTypes.string,
  buttonLeft: PropTypes.string,
  sIGNIN: PropTypes.string,

  /** Style props */
  footerTop: PropTypes.any,
};

export default Footer;
