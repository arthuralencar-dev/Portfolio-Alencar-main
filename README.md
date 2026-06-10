# 💻 Arthur Alencar - Portfólio Pessoal

Este é o repositório do meu portfólio pessoal. Um projeto web moderno, responsivo e performático, desenvolvido para apresentar minhas habilidades como desenvolvedor front-end em formação, além de exibir projetos práticos como um painel de visualização de tabelas do Campeonato Brasileiro.

🌐 **Acesse o projeto:** [Link do seu deploy aqui (ex: GitHub Pages, Vercel)]

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web fundamentais (Vanilla Web Stack) para consolidar uma base sólida antes da transição para frameworks modernos:

* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Estilização moderna utilizando variáveis CSS, layouts flexíveis (Flexbox/Grid), além de efeitos visuais dinâmicos (efeito neon e fundo pontilhado animado).
* **JavaScript (ES6+):** Manipulação assíncrona do DOM, consumo de APIs/JSON locais, gerenciamento de estado simples e lógica de alternância de temas.
* **Font Awesome:** Iconografia rica para links sociais e elementos de interface.
* **Google Fonts:** Tipografia limpa e moderna utilizando as fontes *Inter* e *JetBrains Mono*.

---

## 🛠️ Funcionalidades Principais

### 1. Sistema de Tema Claro/Escuro (Dark/Light Mode)
* Alternância fluida entre temas através de um botão no menu de navegação.
* **Persistência de Dados:** A preferência do usuário é salva no `localStorage` do navegador, garantindo que o tema escolhido permaneça ativo em acessos futuros ou ao mudar de página.

### 2. Painel Dinâmico do Brasileirão (`/brasileirao`)
* Interface baseada em abas (*Tabs*) para alternar rapidamente entre as Séries A, B e C.
* **Manipulação Assíncrona:** Carregamento de dados de forma assíncrona (`async/await`) a partir de um arquivo estruturado `brasileirao.json`.
* **Cálculos em Tempo Real:** O JavaScript calcula dinamicamente o saldo de gols (SG) e o aproveitamento (APV%) de cada equipe.
* **Histórico Visual:** Renderização de badges coloridas customizadas baseadas nos últimos resultados (Vitória, Empate, Derrota).

### 3. Formulário de Contato Integrado (`/contato`)
* Formulário funcional integrado ao serviço **Formsubmit.io**.
* Envio direto de mensagens para o e-mail institucional do desenvolvedor, validado no front-end com campos obrigatórios.

---

## 📁 Estrutura do Projeto

```text
├── assets/
│   └── img/
│       └── profile.png       # Foto de perfil do desenvolvedor
├── index.html                # Página principal (Home / Sobre / Stack)
├── brasileirao.html          # Página das tabelas do campeonato brasileiro
├── contato.html              # Formulário e informações de contato
├── style.css                 # Estilização global, variáveis e responsividade
├── script.js                 # Lógica do tema, abas e consumo do JSON
└── brasileirao.json          # Arquivo de dados com as informações dos times
```

🔧 Como Executar o Projeto Localmente
Clone o repositório para sua máquina local:
```
Bash
git clone [https://github.com/alencarzinho00/Portfolio-Alencar-main.git](https://github.com/alencarzinho00/Portfolio-Alencar-main.git)
```
Acesse a pasta do projeto:
```
Bash
cd Portfolio-Alencar-main
```
Como a página do Brasileirão realiza uma requisição fetch() para o arquivo local .json, é necessário rodar o projeto através de um servidor local devido às políticas de segurança do navegador (CORS).

Se usar o VS Code, instale a extensão Live Server e clique em "Go Live".

Ou utilize o Python no terminal:
```
Bash
python -m http.server 8080
```
Depois, acesse http://localhost:8080 no navegador.

📄 Exemplo de Estrutura para o brasileirao.json
Para que as tabelas funcionem corretamente, crie um arquivo chamado brasileirao.json na raiz do projeto com a seguinte estrutura:
```text
JSON
{
  "serieA": [
    {
      "pos": 1,
      "time": "Exemplo FC",
      "pts": 3,
      "j": 1,
      "v": 1,
      "e": 0,
      "d": 0,
      "gp": 2,
      "gc": 0,
      "ultimosJgs": ["V", "E", "D"]
    }
  ],
  "serieB": [],
  "serieC": []
}
```
📬 Contato
LinkedIn: Arthur Alencar

GitHub: @alencarzinho00

E-mail: aahm@cesar.school

Developed by Arthur Alencar © 2026
