import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const fadeIn = (isLowPerf: boolean) => ({
  initial: isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
});

const Contact: React.FC<{ isLowPerf: boolean }> = ({ isLowPerf }) => {
  return (
    <motion.section
      {...fadeIn(isLowPerf)}
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
          whileHover={isLowPerf ? {} : {
            y: -5,
            backgroundColor: "rgba(255,255,255,0.08)",
            transition: { duration: 0.2 }
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
          whileHover={isLowPerf ? {} : {
            y: -5,
            backgroundColor: "rgba(255,255,255,0.08)",
            transition: { duration: 0.2 }
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
