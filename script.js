document.addEventListener("DOMContentLoaded", () => {
  // Atualizar Ano no Rodapé
  document.getElementById("year").textContent = new Date().getFullYear();

  // Efeito de Scroll na Barra de Navegação
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "0.8rem 0";
      navbar.style.background = "rgba(5, 5, 5, 0.8)";
    } else {
      navbar.style.padding = "1.5rem 0";
      navbar.style.background = "transparent";
    }
  });

  // Carregar Projetos do GitHub
  const projectsGrid = document.getElementById("projects-grid");
  const username = "gabrielborgesweb";

  async function fetchProjects() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      );
      const repos = await response.json();

      if (!Array.isArray(repos)) {
        throw new Error("Não foi possível carregar os repositórios");
      }

      // Filtrar forks e selecionar os principais
      const filteredRepos = repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      projectsGrid.innerHTML = "";

      filteredRepos.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "project-card glass fade-in";

        card.innerHTML = `
                    <div class="project-header">
                        <i class="fas fa-folder"></i>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" title="Ver Código Fonte"><i class="fab fa-github"></i></a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" title="Demonstração ao Vivo"><i class="fas fa-external-link-alt"></i></a>` : ""}
                        </div>
                    </div>
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Sem descrição disponível para este projeto."}</p>
                    <div class="project-tags">
                        ${repo.language ? `<span>${repo.language}</span>` : ""}
                        <span>★ ${repo.stargazers_count}</span>
                    </div>
                `;
        projectsGrid.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar repositórios do GitHub:", error);
      projectsGrid.innerHTML =
        '<p class="loader">Erro ao carregar projetos. Por favor, verifique meu perfil do GitHub diretamente.</p>';
    }
  }

  fetchProjects();

  // Observador de Interseção para animações de scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
});
