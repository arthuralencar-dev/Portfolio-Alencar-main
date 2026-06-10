document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // Tema Light/Dark com localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Tabs Brasileirão
    const tabButtons = document.querySelectorAll('.tab-button');
    const tables = document.querySelectorAll('.tabela-brasileirao');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tables.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const series = btn.dataset.series;
            const tableDiv = document.getElementById(`tabela-serie-${series}`);
            if (tableDiv) tableDiv.classList.add('active');
        });
    });

    /* ========================================
       CONTACT FORM — SUBMISSÃO SIMPLES
       (deixa o FormSubmit cuidar do envio)
    ======================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validação básica do lado do cliente
            if (!name || !email || !subject || !message) {
                // Se a validação falhar, o navegador já impede o envio
                // e mostra a mensagem de campo obrigatório.
                // Não precisamos de e.preventDefault() aqui, pois o navegador já faz isso.
                return;
            }

            // Validação de e-mail mais robusta (opcional, o navegador já faz um básico)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.preventDefault(); // Impede o envio se o e-mail for inválido
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            // Mostra loading no botão, mas permite que o formulário submeta
            if (submitBtn && btnText && btnLoading) {
                submitBtn.disabled = true; // Desabilita o botão para evitar múltiplos cliques
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline-flex'; // Mostra o spinner
            }
            // Não chamamos e.preventDefault() aqui se a validação passar,
            // pois queremos que o formulário seja enviado para o Formsubmit.io
        });
    }


    // ---------------- BRASILEIRÃO ----------------
    const brasileiraoSection = document.querySelector('.brasileirao-section');
    if (!brasileiraoSection) return;

    const loader = document.getElementById('table-loader');

    async function fetchLocalBrasileirao() {
        try {
            const response = await fetch('brasileirao.json');
            if (!response.ok) throw new Error('Erro ao carregar brasileirao.json');
            return await response.json();
        } catch (error) {
            console.error(error);
            if (loader) loader.textContent = 'Erro ao carregar dados. Verifique o arquivo brasileirao.json.';
            return null;
        }
    }

    function preencherTabelaSeries(series, lista) {
        const tbody = document.querySelector(`#tabela-serie-${series} tbody`);
        if (!tbody) return;
        tbody.innerHTML = '';

        lista.forEach(entry => {
            const gd = entry.gp - entry.gc;
            const apv = entry.j > 0 ? ((entry.pts / (entry.j * 3)) * 100).toFixed(1) : '0.0';

            const lastGamesHtml = (entry.ultimosJgs || [])
                .map(result => {
                    let badgeClass = '';
                    if (result === 'V') badgeClass = 'badge-win';
                    else if (result === 'E') badgeClass = 'badge-draw';
                    else if (result === 'D') badgeClass = 'badge-lose';
                    return `<span class="badge-result ${badgeClass}">${result}</span>`;
                })
                .join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${entry.pos}</td>
                <td class="team-name-only">${entry.time}</td> <!-- Apenas o nome do time -->
                <td>${entry.pts}</td>
                <td>${entry.j}</td>
                <td>${entry.v}</td>
                <td>${entry.e}</td>
                <td>${entry.d}</td>
                <td>${entry.gp}</td>
                <td>${entry.gc}</td>
                <td>${gd}</td>
                <td class="apv-cell">${apv}%</td>
                <td class="last-games-cell">${lastGamesHtml}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    async function carregarBrasileiraoLocal() {
        if (loader) loader.textContent = 'Carregando dados do arquivo...';

        const data = await fetchLocalBrasileirao();
        if (!data) return;

        preencherTabelaSeries('A', data.serieA || []);
        preencherTabelaSeries('B', data.serieB || []);
        preencherTabelaSeries('C', data.serieC || []);

        // Ativa a primeira aba por padrão se houver dados
        if (tabButtons.length > 0 && tables.length > 0) {
            tabButtons[0].click();
        }

        if (loader) loader.textContent = 'Dados atualizados (arquivo local).';
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
        }, 1500);
    }

    carregarBrasileiraoLocal();
});
