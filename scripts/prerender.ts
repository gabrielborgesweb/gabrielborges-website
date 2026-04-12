import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log('🚀 Iniciando Prerender (SSG)...');

  const distPath = path.resolve(__dirname, '../dist');
  const templatePath = path.resolve(distPath, 'index.html');
  
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Erro: dist/index.html não encontrado. Rode "npm run build" primeiro.');
    process.exit(1);
  }

  let template = fs.readFileSync(templatePath, 'utf-8');

  // 1. Buscar dados do GitHub durante a Build
  console.log('📡 Buscando repositórios do GitHub...');
  let initialRepos = [];
  try {
    const response = await fetch('https://api.github.com/users/gabrielborgesweb/repos?sort=updated&per_page=15');
    const data = await response.json();
    if (Array.isArray(data)) {
      initialRepos = data
        .filter((repo: any) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);
    }
  } catch (error) {
    console.error('⚠️ Falha ao buscar repositórios na build, usando lista vazia.', error);
  }

  // 2. Renderizar App para String
  console.log('🎨 Renderizando React para HTML estático...');
  const appHtml = ReactDOMServer.renderToString(
    React.createElement(App, { initialRepos })
  );

  // 3. Injetar no Template
  // Removemos o pre-loader e injetamos o HTML real dentro do #root
  const finalHtml = template.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(templatePath, finalHtml);
  console.log('✅ Prerender concluído com sucesso! dist/index.html agora contém o HTML real.');
}

prerender();
