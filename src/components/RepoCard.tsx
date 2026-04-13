import React from "react";
import { m } from "framer-motion";
import { Github, ExternalLink, Folder, Star } from "lucide-react";

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

const fadeIn = (isLowPerf: boolean) => ({
  initial: isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
});

const RepoCard = React.memo(
  ({ repo, isLowPerf }: { repo: Repo; isLowPerf: boolean }) => (
    <m.div
      variants={fadeIn(isLowPerf)}
      whileHover={isLowPerf ? {} : { y: -5, transition: { duration: 0.2 } }}
      className="glass p-8 flex flex-col hover:shadow-xl dark:hover:shadow-accent/5"
    >
      <div className="flex justify-between items-start mb-6">
        <Folder className="text-accent" size={20} />
        <div className="flex gap-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Código Fonte"
            className="hover:text-accent transition-colors"
          >
            <Github size={20} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Demo ao Vivo"
              className="hover:text-accent transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{repo.name}</h3>
      <p className="text-text/60 text-sm mb-6 flex-grow text-pretty">
        {repo.description || "Sem descrição disponível para este projeto."}
      </p>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-text/40">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-accent" />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} /> {repo.stargazers_count}
        </span>
      </div>
    </m.div>
  ),
);

export default RepoCard;
