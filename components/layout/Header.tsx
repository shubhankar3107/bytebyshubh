"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Menu,
  X
} from "lucide-react";

import Navigation from "./Navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">

        {/* ORIGINAL BRAND */}

        <Link
          href="#home"
          className="brand"
          aria-label="Byte by Shubh home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">
            b<span>.</span>
          </span>

          <span>
            BYTE <em>BY SHUBH</em>
          </span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <Navigation />


        {/* HEADER CTA */}

        <Link
          className="header-cta"
          href="#connect"
        >
          LET&apos;S CONNECT
          <ArrowUpRight size={14} />
        </Link>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="menu-toggle"
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </header>


      {/* MOBILE NAVIGATION */}

      {menuOpen && (
        <div id="mobile-navigation">
          <Navigation
            mobile
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}