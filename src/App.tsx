import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Gamepad2,
  Cpu,
  Folder,
  Star,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
};

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/gabrielborgesweb/repos?sort=updated&per_page=15",
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const filtered = data
            .filter((repo: Repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
          setRepos(filtered);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-accent selection:text-bg">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 blur-[100px] opacity-30">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-secondary rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-24 w-80 h-80 bg-accent rounded-full"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-glass-border backdrop-blur-md">
        <div className="container flex justify-between items-center py-4">
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#"
            className="text-2xl font-black"
          >
            GB<span className="text-accent">.</span>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8 font-medium"
          >
            <a href="#about" className="hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#projects" className="hover:text-accent transition-colors">
              Projetos
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contato
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-48 pb-24 container overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Olá, eu sou <br />
              <span className="highlight leading-tight">Gabriel Borges</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl">
              Desenvolvedor Full-Stack | Desenvolvedor de Games | Entusiasta de
              Tecnologia. Criando experiências digitais rápidas, acessíveis e
              imersivas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="btn-primary flex items-center gap-2"
              >
                Ver Projetos <ChevronRight size={20} />
              </motion.a>
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ y: -5, color: "#00d2ff" }}
                  href="https://github.com/gabrielborgesweb" 
                  target="_blank" 
                  aria-label="GitHub de Gabriel Borges"
                  className="w-12 h-12 flex items-center justify-center glass transition-all"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5, color: "#00d2ff" }}
                  href="https://www.linkedin.com/in/gabrielborges-sc/" 
                  target="_blank" 
                  aria-label="LinkedIn de Gabriel Borges"
                  className="w-12 h-12 flex items-center justify-center glass transition-all"
                >
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="w-64 h-64 md:w-80 md:h-80 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-secondary animate-morph -z-10 opacity-50 blur-xl" />
            <img
              src="https://github.com/gabrielborgesweb.png"
              alt="Gabriel Borges"
              className="w-full h-full object-cover animate-morph border-4 border-glass-border shadow-2xl"
            />
          </motion.div>
        </div>
      </header>

      {/* About */}
      <motion.section {...fadeIn} id="about" className="py-24 container">
        <h2 className="text-4xl font-black mb-12 text-center">Sobre Mim</h2>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-lg text-white/80 space-y-6">
            <p>
              Sou um desenvolvedor brasileiro de 24 anos apaixonado por criar
              aplicações web modernas e experiências imersivas em jogos.
            </p>
            <p>
              Com foco em Desenvolvimento Web e interesse em performance de
              baixo nível, exploro tecnologias como
              <strong> Rust</strong>, <strong>Tauri</strong>,{" "}
              <strong>Godot Engine</strong> e <strong>TypeScript</strong>.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-accent">
                <Code2 size={24} /> <span>Web Dev</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Gamepad2 size={24} /> <span>Game Dev</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Cpu size={24} /> <span>Software Engine</span>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 glass p-8"
          >
            <h3 className="text-xl font-bold mb-6">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "Rust",
                "JavaScript",
                "Python",
                "GDScript",
                "Tauri",
                "Godot",
                "Node.js",
                "React",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects */}
      <section id="projects" className="py-24 container">
        <motion.h2
          {...fadeIn}
          className="text-4xl font-black mb-12 text-center"
        >
          Projetos
        </motion.h2>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-white/50 italic"
            >
              Carregando projetos recentes...
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {repos.map((repo) => (
                <motion.div
                  key={repo.id}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="glass p-8 flex flex-col transition-shadow hover:shadow-accent/10"
                >
                  <div className="flex justify-between items-start mb-6">
                    <Folder className="text-accent" size={32} />
                    <div className="flex gap-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="hover:text-accent transition-colors"
                      >
                        <Github size={20} />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          className="hover:text-accent transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{repo.name}</h3>
                  <p className="text-white/60 text-sm mb-6 flex-grow">
                    {repo.description ||
                      "Sem descrição disponível para este projeto."}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/40">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} /> {repo.stargazers_count}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div {...fadeIn} className="mt-16 text-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/gabrielborgesweb"
            target="_blank"
            className="btn-secondary"
          >
            Ver tudo no GitHub
          </motion.a>
        </motion.div>
      </section>

      {/* Contact */}
      <motion.section
        {...fadeIn}
        id="contact"
        className="py-24 container text-center"
      >
        <h2 className="text-4xl font-black mb-6">Vamos nos Conectar</h2>
        <p className="text-white/70 mb-12 max-w-xl mx-auto">
          Sinta-se à vontade para entrar em contato para colaborações ou apenas
          um papo amigável!
        </p>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <motion.a
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            href="https://github.com/gabrielborgesweb"
            target="_blank"
            className="glass p-8 flex flex-col items-center gap-4 transition-colors"
          >
            <Github size={32} className="text-accent" />
            <span className="font-bold">GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            href="https://www.linkedin.com/in/gabrielborges-sc/"
            target="_blank"
            className="glass p-8 flex flex-col items-center gap-4 transition-colors"
          >
            <Linkedin size={32} className="text-accent" />
            <span className="font-bold">LinkedIn</span>
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border text-center text-white/40 text-sm">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Gabriel Borges. Criado com React,
            Tailwind v4 & Lucide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
