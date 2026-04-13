import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "../App";

interface SiteMenuProps {
  isLowPerf: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SiteMenu: React.FC<SiteMenuProps> = ({ isLowPerf, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Close menu on resize if it's open and we hit desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: isLowPerf
        ? { duration: 0.2 }
        : {
            type: "spring",
            stiffness: 400,
            damping: 40,
          },
    },
    opened: {
      x: 0,
      transition: isLowPerf
        ? { duration: 0.3 }
        : {
            type: "spring",
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 },
  };

  const navLinks = [
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8 font-medium">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-accent transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-text hover:text-accent transition-colors"
        aria-label="Abrir menu"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Sidebar Content */}
            <m.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg border-l border-glass-border z-[70] lg:hidden p-4 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text hover:text-accent transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <m.a
                    key={link.name}
                    variants={itemVariants}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold hover:text-accent transition-colors"
                  >
                    {link.name}
                  </m.a>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-glass-border flex flex-col gap-6">
                <div className="flex gap-6">
                  <a
                    href="https://github.com/gabrielborgesweb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/60 hover:text-accent transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gabrielborges-sc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/60 hover:text-accent transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:contato@gabrielborges.dev.br"
                    rel="noopener noreferrer"
                    className="text-text/60 hover:text-accent transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
                <p className="text-sm text-text/40 font-medium">
                  &copy; {new Date().getFullYear()} Gabriel Borges
                </p>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteMenu;
