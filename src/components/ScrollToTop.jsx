import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.pageYOffset > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0,0);
  };
  useEffect(() => {
    // Add a scroll event listener to show/hide the button
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <svg
            height="28"
            width="28"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511.867 511.867"
          >
            <path d="M508.827 350.027L263.493 104.373a10.955 10.955 0 00-15.147 0L3.12 350.027a10.623 10.623 0 000 15.04l42.24 42.347a10.955 10.955 0 0015.147 0L255.92 211.68l195.52 195.733a10.623 10.623 0 0015.04 0l42.347-42.347c4.053-4.159 4.053-10.879 0-15.039zM459.013 384.8l-195.52-195.733a10.623 10.623 0 00-15.04 0L52.933 384.8l-27.2-27.307L255.92 126.987l230.293 230.507-27.2 27.306z" />
          </svg>
        </button>
      )}
    </>
  );
}
