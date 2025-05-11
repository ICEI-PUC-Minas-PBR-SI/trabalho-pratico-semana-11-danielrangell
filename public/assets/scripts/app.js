 document.addEventListener('DOMContentLoaded', async () => {
      const API_URL = 'https://cautious-space-rotary-phone-rv6qp75j4w4fppq9-3000.app.github.dev/noticias';
      const carrosselContainer = document.getElementById('carrossel-inner');
      const noticiasContainer = document.getElementById('noticias-container');

      try {
        const response = await fetch(API_URL);
        const noticias = await response.json();

        const destaques = noticias.filter(n => n.destaque);
        destaques.forEach((noticia, index) => {
          const item = document.createElement('div');
          item.classList.add('carousel-item');
          if (index === 0) item.classList.add('active');

          item.innerHTML = `
            <img src="${noticia.imagem_pincipal}" class="d-block w-100" alt="${noticia.titulo}">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>${noticia.titulo}</h5>
              <p>${noticia.descricao}</p>
              <a href="noticia.html?id=${noticia.id}" class="btn btn-light btn-sm">Leia mais</a>
            </div>
          `;

          carrosselContainer.appendChild(item);
        });

        noticias.forEach(noticia => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.innerHTML = `
            <div class="card h-100">
              <img src="${noticia.imagem_pincipal}" class="card-img-top" alt="${noticia.titulo}">
              <div class="card-body">
                <h5 class="card-title">${noticia.titulo}</h5>
                <p class="card-text">${noticia.descricao}</p>
                <a href="noticia.html?id=${noticia.id}" class="btn btn-primary">Ler mais</a>
              </div>
            </div>
          `;
          noticiasContainer.appendChild(card);
        });

      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        noticiasContainer.innerHTML = `<p class="text-danger">Erro ao carregar as notícias.</p>`;
      }
    });
   document.addEventListener('DOMContentLoaded', async () => {
      const params = new URLSearchParams(window.location.search);
      const noticiaId = parseInt(params.get('id'));
      const container = document.getElementById('noticia');

      try {
        const response = await fetch(`https://cautious-space-rotary-phone-rv6qp75j4w4fppq9-3000.app.github.dev/noticias/${noticiaId}`);
        if (!response.ok) throw new Error('Notícia não encontrada.');

        const noticia = await response.json();

        container.innerHTML = `
          <h2>${noticia.titulo}</h2>
          <p><strong>Categoria:</strong> ${noticia.categoria || 'N/A'} | 
             <strong>Autor:</strong> ${noticia.autor || 'N/A'} | 
             <strong>Data:</strong> ${noticia.data || 'N/A'}</p>
          <img src="${noticia.imagem_pincipal}" class="img-fluid mb-4" alt="${noticia.titulo}">
          <p>${noticia.conteudo || ''}</p>
          <div class="row mt-4">
            ${(noticia.imagens_complementares || []).map(img => `
              <div class="col-md-4">
                <img src="${img.src}" class="img-fluid" alt="${img.descricao}">
                <small class="d-block text-muted">${img.descricao}</small>
              </div>
            `).join('')}
          </div>
        `;
      } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="text-danger">Erro ao carregar a notícia.</p>';
      }
    });