import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import RepoCard from "./RepoCard";

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
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.05 } },
};

interface ProjectsProps {
  repos: Repo[];
  loading: boolean;
  initialRepos?: Repo[];
}

const Projects: React.FC<ProjectsProps> = ({ repos, loading, initialRepos }) => {
  return (
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
            className="text-center py-20 text-text/50 italic"
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
          rel="noopener noreferrer"
          className="btn-secondary text-text"
        >
          Ver tudo no GitHub
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;
