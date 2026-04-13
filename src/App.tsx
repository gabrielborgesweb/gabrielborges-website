import React, { useEffect, useState, useMemo } from "react";
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

// Optimization: Pre-define animation variants outside component to prevent recreation on re-render
const fadeIn = {
  initial: { opacity: 0, y: 15 }, // Reduced y translation for smoother feel
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.05 } }, // Faster stagger for better responsiveness
};

const Logo = () => (
  <svg
    viewBox="0 0 256 256"
    className="w-10 h-10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#fff"
      d="m58 188.6q-17.1 0-30.1-7.3-12.9-7.3-20.1-20.8-7.3-13.4-7.3-31.9 0-19.4 7.7-32.9 7.8-13.5 20.8-20.5 13-7.1 28.8-7.1 10.4 0 19.3 3 9 2.9 15.9 8.3 7 5.5 11.1 12.9 4.3 7.3 5.2 16.1h-32.1q-0.7-3-2.3-5.3-1.6-2.4-4.1-4-2.3-1.6-5.5-2.4-3-0.9-6.8-0.9-8 0-13.7 3.9-5.6 3.7-8.6 11-2.9 7.2-2.9 17.4 0 10.3 2.8 17.6 2.8 7.4 8.4 11.3 5.5 3.9 13.8 3.9 7.3 0 12.1-2.2 4.8-2.1 7.2-6 2.5-3.9 2.5-9.2l5.5 0.7h-26.8v-22.7h52v16.2q0 16.1-6.8 27.5-6.8 11.3-18.8 17.4-11.8 6-27.2 6zm113.8-1.6h-55.2v-117.3h50.8q13.4 0 22.6 3.6 9.1 3.6 13.7 10.2 4.7 6.6 4.7 15.5 0 6.4-2.9 11.8-2.8 5.3-7.9 8.9-5 3.6-11.9 4.9v1.3q7.6 0.2 13.7 3.8 6.2 3.4 9.8 9.7 3.8 6.1 3.8 14.4 0 9.6-5 17.1-5 7.5-14.2 11.8-9.2 4.3-22 4.3zm-23.4-50.2v24.8h14.9q8 0 12-3 4.1-3.1 4.1-8.9 0-4.2-1.9-7-1.9-3-5.4-4.4-3.5-1.5-8.3-1.5zm0-42.1v22.4h13.1q4.2 0 7.3-1.3 3.2-1.3 5-3.8 1.9-2.5 1.9-6.1 0-5.4-4-8.3-3.8-2.9-9.7-2.9z"
    />
    <path
      fill="#00d2ff"
      d="m239.1 188.9q-6.9 0-11.6-4.6-4.6-4.5-4.6-11.4 0-6.8 4.6-11.4 4.7-4.6 11.6-4.6 6.9 0 11.6 4.6 4.6 4.6 4.6 11.4 0 6.9-4.6 11.4-4.7 4.6-11.6 4.6z"
    />
  </svg>
);

const App: React.FC<AppProps> = ({ initialRepos }) => {
  const [repos, setRepos] = useState<Repo[]>(initialRepos || []);
  const [loading, setLoading] = useState(!initialRepos);
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    // 1. Initial Hardware Check
    const memory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    const cpuCores = navigator.hardwareConcurrency || 4;

    if (memory < 4 || cpuCores < 4) {
      setIsLowPerf(true);
      return;
    }

    // 2. Real-time FPS Monitoring
    let frameCount = 0;
    let startTime = performance.now();
    let lowFpsCount = 0;
    let animationFrameId: number;

    const checkPerformance = (time: number) => {
      frameCount++;

      if (time - startTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (time - startTime));

        // If FPS is consistently low (< 40) for 3 checks
        if (fps < 40) {
          lowFpsCount++;
          if (lowFpsCount >= 3) {
            setIsLowPerf(true);
            return; // Stop monitoring once triggered
          }
        } else {
          lowFpsCount = 0;
        }

        frameCount = 0;
        startTime = time;
      }
      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    animationFrameId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    // Só faz o fetch se não tivermos repositórios iniciais (SSG)
    if (repos.length > 0) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/gabrielborgesweb/repos?sort=updated&per_page=15",
        );
        const data = await response.json();
        if (isMounted && Array.isArray(data)) {
          const filtered = data
            .filter((repo: Repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
          setRepos(filtered);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, [repos.length]);

  // Performance: Memoize static skills list
  const skills = useMemo(
    () => [
      "TypeScript",
      "Rust",
      "JavaScript",
      "Python",
      "GDScript",
      "Tauri",
      "Godot",
      "Node.js",
      "React",
    ],
    [],
  );

  return (
    <div
      className={`min-h-screen relative selection:bg-accent selection:text-bg ${isLowPerf ? "low-perf" : ""}`}
    >
      {/* 
          Performance Optimization: Static Background
          Removed blurred animating divs which cause heavy layout/paint cycles.
          Using a simpler, high-performance background.
      */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050505]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-glass-border backdrop-blur-md">
        <div className="container flex justify-between items-center py-4">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            href="#"
            className="flex items-center gap-2"
          >
            <Logo />
          </motion.a>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Olá, eu sou <br />
              <span className="highlight leading-tight">Gabriel Borges</span>.
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl text-pretty">
              Desenvolvedor Full-Stack | Desenvolvedor de Games | Entusiasta de
              Tecnologia. Criando experiências digitais rápidas, acessíveis e
              imersivas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-primary flex items-center gap-2"
              >
                Ver Projetos <ChevronRight size={20} />
              </motion.a>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://github.com/gabrielborgesweb"
                  target="_blank"
                  aria-label="GitHub de Gabriel Borges"
                  className="w-12 h-12 flex items-center justify-center glass transition-all rounded-lg"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://www.linkedin.com/in/gabrielborges-sc/"
                  target="_blank"
                  aria-label="LinkedIn de Gabriel Borges"
                  className="w-12 h-12 flex items-center justify-center glass transition-all rounded-lg"
                >
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 md:w-80 md:h-80 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-secondary animate-morph -z-10 opacity-30 blur-lg" />
            <img
              src="https://github.com/gabrielborgesweb.png"
              alt="Gabriel Borges"
              className="w-full h-full object-cover animate-morph border-2 border-glass-border shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </header>

      {/* About */}
      <motion.section {...fadeIn} id="about" className="py-24 container">
        <h2 className="text-4xl font-black mb-12 text-center">Sobre Mim</h2>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-lg text-white/80 space-y-6 text-pretty">
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
          <div className="md:col-span-2 glass p-8">
            <h3 className="text-xl font-bold mb-6">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
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
        <AnimatePresence mode="wait" initial={!initialRepos}>
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
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div {...fadeIn} className="mt-16 text-center">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
        <p className="text-white/70 mb-12 max-w-xl mx-auto text-pretty">
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
            className="glass p-8 flex flex-col items-center gap-4 transition-colors"
          >
            <Linkedin size={32} className="text-accent" />
            <span className="font-bold">LinkedIn</span>
          </motion.a>
        </div>
      </motion.section>

      <footer className="py-12 border-t border-glass-border text-center text-white/40 text-sm">
        <div className="container flex flex-col gap-2">
          <p>&copy; {new Date().getFullYear()} Gabriel Borges</p>
          <p>Criado com React, Tailwind v4 & Lucide.</p>
        </div>
      </footer>
    </div>
  );
};

const RepoCard = React.memo(({ repo }: { repo: Repo }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ y: -5 }}
    className="glass p-8 flex flex-col transition-shadow hover:shadow-accent/5"
  >
    <div className="flex justify-between items-start mb-6">
      <Folder className="text-accent" size={32} />
      <div className="flex gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          aria-label="Código Fonte"
          className="hover:text-accent transition-colors"
        >
          <Github size={20} />
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            aria-label="Demo ao Vivo"
            className="hover:text-accent transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{repo.name}</h3>
    <p className="text-white/60 text-sm mb-6 flex-grow text-pretty">
      {repo.description || "Sem descrição disponível para este projeto."}
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
));
export default App;
