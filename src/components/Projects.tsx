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

interface ProjectsProps {
  repos: Repo[];
  loading: boolean;
  isLowPerf: boolean;
  initialRepos?: Repo[];
}

const fadeIn = (isLowPerf: boolean) => ({
  initial: isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
});

const staggerContainer = (isLowPerf: boolean) => ({
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: isLowPerf ? 0 : 0.05,
      delayChildren: 0.1,
    },
  },
});

const Projects: React.FC<ProjectsProps> = ({
  repos,
  loading,
  initialRepos,
  isLowPerf,
}) => {
  return (
    <section id="projects" className="py-24 container">
      <motion.h2
        initial={isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
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
            variants={staggerContainer(isLowPerf)}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} isLowPerf={isLowPerf} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        {...fadeIn(isLowPerf)}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://github.com/gabrielborgesweb"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-text w-fit m-auto"
        >
          Ver tudo no GitHub
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;
