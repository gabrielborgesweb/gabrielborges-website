import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const Contact: React.FC = () => {
  return (
    <motion.section
      {...fadeIn}
      id="contact"
      className="py-24 container text-center"
    >
      <h2 className="text-4xl font-black mb-6">Vamos nos Conectar</h2>
      <p className="text-text/70 mb-12 max-w-md mx-auto text-pretty">
        Sinta-se à vontade para entrar em contato para colaborações ou apenas
        um papo amigável!
      </p>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.a
          whileHover={{
            y: -5,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
          href="https://github.com/gabrielborgesweb"
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-8 flex flex-col items-center gap-4 transition-colors"
        >
          <Github size={32} className="text-accent" />
          <span className="font-bold">GitHub</span>
        </motion.a>
        <motion.a
          whileHover={{
            y: -5,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
          href="https://www.linkedin.com/in/gabrielborges-sc/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-8 flex flex-col items-center gap-4 transition-colors"
        >
          <Linkedin size={32} className="text-accent" />
          <span className="font-bold">LinkedIn</span>
        </motion.a>
      </div>
    </motion.section>
  );
};

export default Contact;
