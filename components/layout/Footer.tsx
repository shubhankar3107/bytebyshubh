export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer section-wrap">

      {/* BRAND */}

      <a
        href="#home"
        className="brand footer-brand"
        aria-label="Byte by Shubh — Back to home"
      >
        <span className="brand-mark">
          b<span>.</span>
        </span>

        <span>
          BYTE <em>BY SHUBH</em>
        </span>
      </a>

      {/* TAGLINE */}

      <span className="footer-tagline">
        BUILDING THE FUTURE, ONE BYTE AT A TIME.
      </span>

      {/* COPYRIGHT */}

      <span className="footer-copy">
        © {currentYear} BYTE BY SHUBH
      </span>

      {/* BACK TO TOP */}

      <a
        className="back-top"
        href="#home"
        aria-label="Back to top"
      >
        ↑
      </a>

    </footer>
  );
}