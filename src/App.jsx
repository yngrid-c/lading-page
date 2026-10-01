import { useEffect, useRef, useState } from "react";
import "./App.css";

const menu = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "aprender", label: "Aprender" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "mercado", label: "Mercado" },
  { id: "projetos", label: "Projetos" },
  { id: "duvidas", label: "Dúvidas" },
];

const palavras = ["sistemas", "aplicativos", "APIs", "dashboards", "lojas virtuais"];

const camadas = [
  { titulo: "Frontend", largura: "92%" },
  { titulo: "Backend", largura: "78%" },
  { titulo: "Banco de dados", largura: "64%" },
];

const indicadores = [
  { valor: 8, sufixo: "+", rotulo: "tecnologias para dominar" },
  { valor: 6, sufixo: "", rotulo: "áreas de atuação" },
  { valor: 6, sufixo: "", rotulo: "tipos de projetos para construir" },
];

const abas = [
  {
    id: "oque",
    icone: "💡",
    rotulo: "O que é",
    titulo: "O que é Desenvolvimento de Sistemas",
    texto:
      "É a área da tecnologia responsável por criar programas, sites, aplicativos e plataformas que resolvem problemas reais de pessoas e empresas.",
    pontos: [
      "Planejamento e análise de necessidades",
      "Programação de interfaces e regras de negócio",
      "Organização e consulta de dados",
      "Testes e manutenção contínua",
    ],
  },
  {
    id: "objetivo",
    icone: "🎯",
    rotulo: "Objetivo",
    titulo: "Qual é o objetivo do curso",
    texto:
      "Preparar o aluno para entrar no mercado de TI com base sólida em lógica, programação e boas práticas, aprendendo na prática a construir sistemas completos.",
    pontos: [
      "Dominar a lógica de programação",
      "Construir sistemas web de ponta a ponta",
      "Trabalhar com banco de dados e APIs",
      "Usar Git e GitHub no dia a dia",
    ],
  },
  {
    id: "profissional",
    icone: "👩‍💻",
    rotulo: "O profissional",
    titulo: "O que faz um desenvolvedor de sistemas",
    texto:
      "O desenvolvedor transforma uma necessidade em um sistema funcionando: escreve código, cria telas, conecta dados e corrige falhas até a solução ficar pronta.",
    pontos: [
      "Escreve e revisa código",
      "Cria interfaces responsivas",
      "Integra sistemas e serviços",
      "Documenta e versiona o trabalho",
    ],
  },
];

const filtros = ["Todos", "Base", "Frontend", "Backend", "Dados", "Ferramentas"];

const aprendizados = [
  { icone: "🧠", categoria: "Base", titulo: "Lógica de programação", texto: "A base de tudo: aprender a pensar em passos para resolver problemas.", topicos: ["Variáveis", "Condições", "Laços"] },
  { icone: "🌐", categoria: "Frontend", titulo: "Desenvolvimento web", texto: "Como páginas e sistemas funcionam e são entregues no navegador.", topicos: ["HTML", "CSS", "JavaScript"] },
  { icone: "🎨", categoria: "Frontend", titulo: "Frontend", texto: "Interfaces organizadas, bonitas, responsivas e fáceis de usar.", topicos: ["React", "JSX", "Responsividade"] },
  { icone: "⚙️", categoria: "Backend", titulo: "Backend", texto: "A parte invisível que processa regras de negócio e protege os dados.", topicos: ["Node.js", "Regras", "Segurança"] },
  { icone: "🗄️", categoria: "Dados", titulo: "Banco de dados", texto: "Guardar, organizar e consultar informações com eficiência.", topicos: ["SQL", "Tabelas", "Consultas"] },
  { icone: "🔌", categoria: "Backend", titulo: "Desenvolvimento de APIs", texto: "Conectar sistemas e serviços trocando dados de forma padronizada.", topicos: ["Rotas", "JSON", "Requisições"] },
  { icone: "📱", categoria: "Frontend", titulo: "Aplicativos", texto: "Levar as ideias para telas de celulares e outros dispositivos.", topicos: ["Mobile", "Telas", "Usabilidade"] },
  { icone: "🔀", categoria: "Ferramentas", titulo: "Versionamento de código", texto: "Registrar a evolução do projeto e trabalhar em equipe sem perder nada.", topicos: ["Git", "GitHub", "Commits"] },
];

const tecnologias = [
  { sigla: "H5", nome: "HTML", tipo: "Frontend", texto: "Estrutura e conteúdo de todas as páginas." },
  { sigla: "C3", nome: "CSS", tipo: "Frontend", texto: "Cores, layout, animações e responsividade." },
  { sigla: "JS", nome: "JavaScript", tipo: "Linguagem", texto: "Lógica e interatividade no navegador e fora dele." },
  { sigla: "Re", nome: "React", tipo: "Frontend", texto: "Interfaces montadas com componentes reutilizáveis." },
  { sigla: "No", nome: "Node.js", tipo: "Backend", texto: "JavaScript rodando no servidor para criar APIs." },
  { sigla: "SQ", nome: "SQL", tipo: "Dados", texto: "A linguagem para consultar e organizar bancos de dados." },
  { sigla: "Gi", nome: "Git", tipo: "Ferramenta", texto: "Controle de versões e histórico do projeto." },
  { sigla: "Gh", nome: "GitHub", tipo: "Ferramenta", texto: "Repositórios online, portfólio e trabalho em equipe." },
];

const areas = [
  { titulo: "Desenvolvimento Frontend", texto: "Cria tudo o que o usuário enxerga e toca: telas, menus, formulários e animações.", tags: ["React", "CSS", "Acessibilidade"] },
  { titulo: "Desenvolvimento Backend", texto: "Cuida da lógica, da segurança e da comunicação entre o sistema e os dados.", tags: ["Node.js", "APIs", "Autenticação"] },
  { titulo: "Desenvolvimento Full Stack", texto: "Atua nas duas pontas do projeto, da interface até o servidor e o banco de dados.", tags: ["Frontend", "Backend", "Banco de dados"] },
  { titulo: "Desenvolvimento de aplicações", texto: "Constrói sistemas sob medida para empresas, de painéis internos a aplicativos.", tags: ["Web", "Mobile", "Sistemas internos"] },
  { titulo: "Banco de dados", texto: "Modela, organiza e mantém as informações que movem o negócio.", tags: ["SQL", "Modelagem", "Consultas"] },
  { titulo: "Suporte e manutenção de sistemas", texto: "Corrige falhas, atualiza funcionalidades e garante que tudo continue funcionando.", tags: ["Correção de erros", "Atualizações", "Suporte"] },
];

const projetos = [
  { icone: "👥", titulo: "Sistema de cadastro de clientes", tipo: "Web", texto: "Cadastre, edite, busque e exclua clientes em uma única tela.", recursos: ["Formulários", "Listagem", "Busca"], layout: "tabela" },
  { icone: "📦", titulo: "Sistema de estoque", tipo: "Web", texto: "Controle entradas, saídas e quantidades de cada produto.", recursos: ["Produtos", "Movimentações", "Alertas"], layout: "barras" },
  { icone: "📅", titulo: "Aplicação de agendamentos", tipo: "Web e mobile", texto: "Organize horários para clínicas, salões e escritórios.", recursos: ["Calendário", "Horários", "Clientes"], layout: "calendario" },
  { icone: "🛒", titulo: "Loja virtual", tipo: "Web", texto: "Monte um catálogo com carrinho de compras e pedidos.", recursos: ["Catálogo", "Carrinho", "Pedidos"], layout: "grade" },
  { icone: "📊", titulo: "Dashboard administrativo", tipo: "Web", texto: "Visualize indicadores e gráficos para apoiar decisões.", recursos: ["Gráficos", "Indicadores", "Filtros"], layout: "grafico" },
  { icone: "✅", titulo: "Aplicativo de tarefas", tipo: "Mobile", texto: "Crie listas, defina prioridades e acompanhe seu dia.", recursos: ["Listas", "Prioridades", "Status"], layout: "lista" },
];

const jornada = [
  { titulo: "Base de lógica", texto: "Você aprende a pensar em algoritmos e resolve seus primeiros problemas com código." },
  { titulo: "Páginas e interfaces", texto: "Constrói sites com HTML, CSS, JavaScript e React, sempre pensando em responsividade." },
  { titulo: "Dados e servidor", texto: "Conecta o sistema a bancos de dados e cria APIs para trocar informações." },
  { titulo: "Projeto completo", texto: "Reúne tudo em um sistema funcional e publica o resultado no seu GitHub." },
];

const duvidas = [
  { titulo: "Preciso saber programar antes de começar?", texto: "Não. O curso parte da lógica de programação e evolui aos poucos, então quem está começando também acompanha." },
  { titulo: "O curso é só teoria?", texto: "A proposta é aprender fazendo: você pratica construindo páginas, sistemas e projetos que podem entrar no seu portfólio." },
  { titulo: "O que posso construir ao longo do curso?", texto: "Cadastros, controle de estoque, agendamentos, lojas virtuais, dashboards e aplicativos de tarefas são bons exemplos." },
  { titulo: "Para onde posso seguir depois?", texto: "É possível atuar em frontend, backend, full stack, banco de dados ou suporte, e continuar estudando em qualquer uma dessas áreas." },
];

function Aparecer({ children, atraso = 0, className = "" }) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aparecer ${visivel ? "visivel" : ""} ${className}`}
      style={{ transitionDelay: `${atraso}ms` }}
    >
      {children}
    </div>
  );
}

function Contador({ valor, sufixo = "" }) {
  const ref = useRef(null);
  const [numero, setNumero] = useState(0);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const duracao = 1400;
        const passo = (agora) => {
          const progresso = Math.min((agora - inicio) / duracao, 1);
          setNumero(Math.round(valor * (1 - Math.pow(1 - progresso, 3))));
          if (progresso < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
      },
      { threshold: 0.6 }
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [valor]);

  return (
    <span ref={ref}>
      {numero}
      {sufixo}
    </span>
  );
}

function Brilho({ children, className = "" }) {
  const mover = (evento) => {
    const caixa = evento.currentTarget.getBoundingClientRect();
    evento.currentTarget.style.setProperty("--x", `${evento.clientX - caixa.left}px`);
    evento.currentTarget.style.setProperty("--y", `${evento.clientY - caixa.top}px`);
  };

  return (
    <div className={`brilho ${className}`} onMouseMove={mover}>
      {children}
    </div>
  );
}

function TituloSecao({ titulo, texto, centro = false }) {
  return (
    <div className={centro ? "titulo-secao centro" : "titulo-secao"}>
      <span className="traco"></span>
      <h2>{titulo}</h2>
      <p>{texto}</p>
    </div>
  );
}

function MiniTela({ layout }) {
  if (layout === "tabela") {
    return (
      <div className="mini-corpo mini-tabela">
        <b></b>
        <b></b>
        <b></b>
        <b></b>
      </div>
    );
  }
  if (layout === "barras") {
    return (
      <div className="mini-corpo mini-barras">
        <b style={{ height: "45%" }}></b>
        <b style={{ height: "80%" }}></b>
        <b style={{ height: "60%" }}></b>
        <b style={{ height: "95%" }}></b>
        <b style={{ height: "35%" }}></b>
      </div>
    );
  }
  if (layout === "calendario") {
    return (
      <div className="mini-corpo mini-calendario">
        {Array.from({ length: 14 }).map((_, i) => (
          <b key={i} className={i === 5 || i === 9 ? "marcado" : ""}></b>
        ))}
      </div>
    );
  }
  if (layout === "grade") {
    return (
      <div className="mini-corpo mini-grade">
        <b></b>
        <b></b>
        <b></b>
        <b></b>
      </div>
    );
  }
  if (layout === "grafico") {
    return (
      <div className="mini-corpo mini-grafico">
        <svg viewBox="0 0 120 50" preserveAspectRatio="none">
          <polyline points="0,40 20,30 40,34 60,18 80,24 100,8 120,14" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="mini-corpo mini-lista">
      <b className="feito"></b>
      <b className="feito"></b>
      <b></b>
      <b></b>
    </div>
  );
}

function Acordeao({ itens }) {
  const [aberto, setAberto] = useState(0);

  return (
    <div className="acordeao">
      {itens.map((item, indice) => {
        const estaAberto = aberto === indice;
        return (
          <div key={item.titulo} className={estaAberto ? "acordeao-item aberto" : "acordeao-item"}>
            <button
              className="acordeao-botao"
              aria-expanded={estaAberto}
              onClick={() => setAberto(estaAberto ? -1 : indice)}
            >
              <span>{item.titulo}</span>
              <span className="acordeao-sinal" aria-hidden="true">+</span>
            </button>
            <div className="acordeao-painel">
              <div className="acordeao-conteudo">
                <p>{item.texto}</p>
                {item.tags && (
                  <ul className="tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [progresso, setProgresso] = useState(0);
  const [mostrarTopo, setMostrarTopo] = useState(false);
  const [indicePalavra, setIndicePalavra] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState("oque");
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    const aoRolar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(total > 0 ? (window.scrollY / total) * 100 : 0);
      setMostrarTopo(window.scrollY > 600);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setSecaoAtiva(entrada.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    menu.forEach((item) => {
      const elemento = document.getElementById(item.id);
      if (elemento) observador.observe(elemento);
    });
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndicePalavra((atual) => (atual + 1) % palavras.length);
    }, 2200);
    return () => clearInterval(intervalo);
  }, []);

  const abaAtual = abas.find((aba) => aba.id === abaAtiva);
  const aprendizadosVisiveis =
    filtro === "Todos" ? aprendizados : aprendizados.filter((item) => item.categoria === filtro);
  const faixa = [...tecnologias, ...tecnologias];

  return (
    <div className="pagina">
      <header className="topo-site">
        <div className="barra">
          <a href="#inicio" className="marca">
            <span className="marca-icone">{"</>"}</span>
            <span className="marca-texto">
              Desenvolvimento de Sistemas
              <small>SENAI</small>
            </span>
          </a>

          <button
            className="barra-botao"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={menuAberto ? "navegacao aberta" : "navegacao"}>
            {menu.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={secaoAtiva === item.id ? "ativo" : ""}
                onClick={() => setMenuAberto(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="progresso" style={{ width: `${progresso}%` }}></div>
        </div>
      </header>

      <main>
        <section id="inicio" className="heroi">
          <div className="heroi-fundo" aria-hidden="true">
            <span className="aurora aurora-um"></span>
            <span className="aurora aurora-dois"></span>
            <span className="aurora aurora-tres"></span>
            <span className="heroi-grade-fundo"></span>
          </div>

          <div className="conteudo heroi-grade">
            <div className="heroi-texto">
              <p className="heroi-curso">
                <span className="ponto"></span>
                Técnico em Desenvolvimento de Sistemas
              </p>
              <h1>Transforme ideias em sistemas.</h1>
              <p className="heroi-descricao">
                Desenvolva soluções, aprenda novas tecnologias e construa seu futuro na área de TI.
              </p>

              <p className="heroi-criar">
                Você vai criar
                <span className="palavra" key={indicePalavra}>
                  {palavras[indicePalavra]}
                </span>
              </p>

              <div className="heroi-acoes">
                <a href="#sobre" className="btn btn-brilho">Conheça o curso</a>
                <a href="#projetos" className="btn btn-vidro">Ver o que você constrói</a>
              </div>
            </div>

            <div className="heroi-visual" aria-hidden="true">
              <span className="orbe"></span>
              <svg className="anel" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="190" fill="none" strokeWidth="1.5" strokeDasharray="3 12" />
                <circle cx="200" cy="200" r="140" fill="none" strokeWidth="1" strokeDasharray="2 8" />
                <circle cx="200" cy="10" r="6" />
                <circle cx="340" cy="200" r="5" />
              </svg>

              <div className="janela">
                <div className="janela-barra">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span>Sistema.jsx</span>
                </div>
                <div className="codigo">
                  <p><span className="n">1</span><i className="k">function</i> <i className="f">Sistema</i>() {"{"}</p>
                  <p className="r1"><span className="n">2</span><i className="k">const</i> futuro = <i className="s">"TI"</i>;</p>
                  <p><span className="n">3</span></p>
                  <p className="r1"><span className="n">4</span><i className="k">return</i> (</p>
                  <p className="r2"><span className="n">5</span>{"<"}<i className="f">Curso</i> aluno={"{"}<i className="s">voce</i>{"}"} {"/>"}</p>
                  <p className="r1"><span className="n">6</span>);</p>
                  <p><span className="n">7</span>{"}"}</p>
                </div>
                <div className="janela-status">
                  <span className="ponto"></span>
                  build concluído em 1,2s
                </div>
              </div>

              <div className="chip chip-um"><span>⚛️</span> React</div>
              <div className="chip chip-dois"><span>🗄️</span> SQL</div>
              <div className="chip chip-tres"><span>🔀</span> Git</div>

              <div className="cartao-camadas">
                <strong>Camadas do sistema</strong>
                {camadas.map((camada) => (
                  <div key={camada.titulo} className="camada-linha">
                    <span>{camada.titulo}</span>
                    <div className="camada-barra">
                      <i style={{ width: camada.largura }}></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="faixa" aria-hidden="true">
            <div className="faixa-trilho">
              {faixa.map((tec, indice) => (
                <span key={`${tec.nome}-${indice}`} className="faixa-item">
                  <b>{tec.sigla}</b>
                  {tec.nome}
                </span>
              ))}
            </div>
          </div>

          <div className="conteudo">
            <div className="indicadores">
              {indicadores.map((item) => (
                <div key={item.rotulo} className="indicador">
                  <strong>
                    <Contador valor={item.valor} sufixo={item.sufixo} />
                  </strong>
                  <span>{item.rotulo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="bloco-secao fundo-pontos">
          <div className="conteudo sobre-grade">
            <Aparecer>
              <TituloSecao
                titulo="Sobre o curso"
                texto="Entenda a área, o objetivo da formação e o que faz o profissional que sai dela."
              />
              <div className="abas" role="tablist" aria-label="Sobre o curso">
                {abas.map((aba) => (
                  <button
                    key={aba.id}
                    role="tab"
                    aria-selected={abaAtiva === aba.id}
                    className={abaAtiva === aba.id ? "aba ativa" : "aba"}
                    onClick={() => setAbaAtiva(aba.id)}
                  >
                    <span className="aba-icone">{aba.icone}</span>
                    {aba.rotulo}
                  </button>
                ))}
              </div>
            </Aparecer>

            <Aparecer atraso={120}>
              <article className="painel" role="tabpanel" key={abaAtual.id}>
                <span className="painel-brilho"></span>
                <h3>{abaAtual.titulo}</h3>
                <p>{abaAtual.texto}</p>
                <ul className="checklist">
                  {abaAtual.pontos.map((ponto) => (
                    <li key={ponto}>{ponto}</li>
                  ))}
                </ul>
              </article>
            </Aparecer>
          </div>
        </section>

        <section id="aprender" className="bloco-secao fundo-gelo">
          <div className="conteudo">
            <Aparecer>
              <TituloSecao
                titulo="O que você aprende"
                texto="Os conhecimentos que formam um desenvolvedor completo. Filtre por área para explorar."
              />
              <div className="filtros" role="group" aria-label="Filtrar conhecimentos">
                {filtros.map((nome) => (
                  <button
                    key={nome}
                    className={filtro === nome ? "filtro ativo" : "filtro"}
                    aria-pressed={filtro === nome}
                    onClick={() => setFiltro(nome)}
                  >
                    {nome}
                  </button>
                ))}
              </div>
            </Aparecer>

            <div className="aprender-grade">
              {aprendizadosVisiveis.map((item, indice) => (
                <Aparecer key={item.titulo} atraso={indice * 60} className="cheio">
                  <Brilho className="cartao-saber">
                    <div className="cartao-saber-topo">
                      <span className="cartao-saber-icone">{item.icone}</span>
                      <span className="cartao-saber-tipo">{item.categoria}</span>
                    </div>
                    <h3>{item.titulo}</h3>
                    <p>{item.texto}</p>
                    <ul className="tags">
                      {item.topicos.map((topico) => (
                        <li key={topico}>{topico}</li>
                      ))}
                    </ul>
                  </Brilho>
                </Aparecer>
              ))}
            </div>
          </div>
        </section>

        <section id="tecnologias" className="bloco-secao fundo-noite">
          <div className="aurora-secao" aria-hidden="true">
            <span className="aurora aurora-um"></span>
            <span className="aurora aurora-dois"></span>
          </div>
          <div className="conteudo">
            <Aparecer>
              <TituloSecao
                centro
                titulo="Tecnologias"
                texto="As ferramentas que você vai conhecer e usar nos projetos, e para que cada uma serve."
              />
            </Aparecer>
            <div className="tec-grade">
              {tecnologias.map((tec, indice) => (
                <Aparecer key={tec.nome} atraso={indice * 60} className="cheio">
                  <Brilho className="tec-cartao">
                    <span className="tec-sigla">{tec.sigla}</span>
                    <strong>{tec.nome}</strong>
                    <p>{tec.texto}</p>
                    <span className="tec-tipo">{tec.tipo}</span>
                  </Brilho>
                </Aparecer>
              ))}
            </div>
          </div>
        </section>

        <section id="mercado" className="bloco-secao fundo-pontos">
          <div className="conteudo mercado-grade">
            <Aparecer className="mercado-intro">
              <TituloSecao
                titulo="Áreas de atuação"
                texto="O mercado de tecnologia tem espaço para vários perfis. Veja caminhos possíveis depois do curso."
              />
              <div className="destaque-azul">
                <span className="destaque-brilho"></span>
                <strong>6 caminhos</strong>
                <span>para começar a carreira em TI</span>
              </div>
            </Aparecer>
            <Aparecer atraso={120}>
              <Acordeao itens={areas} />
            </Aparecer>
          </div>
        </section>

        <section id="projetos" className="bloco-secao fundo-gelo">
          <div className="conteudo">
            <Aparecer>
              <TituloSecao
                centro
                titulo="Exemplos de projetos"
                texto="Sistemas reais que um desenvolvedor pode construir e colocar no portfólio."
              />
            </Aparecer>
            <div className="projetos-grade">
              {projetos.map((projeto, indice) => (
                <Aparecer key={projeto.titulo} atraso={(indice % 3) * 90} className="cheio">
                  <article className="projeto">
                    <div className="projeto-previa" aria-hidden="true">
                      <div className="mini-janela">
                        <div className="mini-topo">
                          <i></i>
                          <i></i>
                          <i></i>
                        </div>
                        <MiniTela layout={projeto.layout} />
                      </div>
                      <span className="projeto-icone">{projeto.icone}</span>
                    </div>
                    <div className="projeto-info">
                      <span className="projeto-tipo">{projeto.tipo}</span>
                      <h3>{projeto.titulo}</h3>
                      <p>{projeto.texto}</p>
                      <ul className="tags">
                        {projeto.recursos.map((recurso) => (
                          <li key={recurso}>{recurso}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Aparecer>
              ))}
            </div>
          </div>
        </section>

        <section id="jornada" className="bloco-secao fundo-pontos">
          <div className="conteudo">
            <Aparecer>
              <TituloSecao
                centro
                titulo="Sua jornada de aprendizagem"
                texto="Um caminho em etapas, da primeira linha de código até um projeto completo."
              />
            </Aparecer>
            <ol className="jornada">
              {jornada.map((etapa, indice) => (
                <Aparecer key={etapa.titulo} atraso={indice * 120} className="cheio">
                  <li className="etapa">
                    <span className="etapa-numero">{indice + 1}</span>
                    <h3>{etapa.titulo}</h3>
                    <p>{etapa.texto}</p>
                  </li>
                </Aparecer>
              ))}
            </ol>
          </div>
        </section>

        <section id="duvidas" className="bloco-secao fundo-gelo">
          <div className="conteudo duvidas-grade">
            <Aparecer>
              <TituloSecao
                titulo="Perguntas frequentes"
                texto="Respostas rápidas para as dúvidas mais comuns de quem está pensando em entrar na área."
              />
            </Aparecer>
            <Aparecer atraso={120}>
              <Acordeao itens={duvidas} />
            </Aparecer>
          </div>
        </section>

        <section className="chamada-secao">
          <div className="conteudo">
            <Aparecer>
              <div className="chamada-cartao">
                <span className="aurora aurora-um" aria-hidden="true"></span>
                <span className="aurora aurora-dois" aria-hidden="true"></span>
                <div className="chamada-texto">
                  <h2>Seu futuro na tecnologia pode começar aqui.</h2>
                  <p>Conheça o curso Técnico em Desenvolvimento de Sistemas.</p>
                </div>
                <div className="chamada-lado">
                  <ul className="checklist checklist-claro">
                    <li>Aprenda fazendo, com projetos reais</li>
                    <li>Construa um portfólio no GitHub</li>
                    <li>Prepare-se para o mercado de TI</li>
                  </ul>
                  <a href="#inicio" className="btn btn-branco">Quero conhecer o curso</a>
                </div>
              </div>
            </Aparecer>
          </div>
        </section>
      </main>

      <footer className="rodape-site">
        <div className="conteudo rodape-grade">
          <div className="rodape-marca">
            <strong>Técnico em Desenvolvimento de Sistemas</strong>
            <span>SENAI</span>
            <p>Uma página de divulgação para quem quer começar na área de tecnologia.</p>
          </div>

          <nav className="rodape-links" aria-label="Links do rodapé">
            <strong>Navegação</strong>
            {menu.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </nav>

          <div className="rodape-creditos">
            <strong>Créditos</strong>
            <span>Desenvolvido por: Yngrid Cristina</span>
            <span>Projeto em React</span>
          </div>
        </div>
        <div className="conteudo rodape-base">
          <span>© {new Date().getFullYear()} Técnico em Desenvolvimento de Sistemas • SENAI</span>
        </div>
      </footer>

      {mostrarTopo && (
        <a href="#inicio" className="voltar-topo" aria-label="Voltar ao topo">↑</a>
      )}
    </div>
  );
}

export default App;