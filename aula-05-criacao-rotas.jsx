import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 80 },
  { id: 3, nome: "Teclado", preco: 150 },
];

function Header() {
  return (
    <header>
      <h1>Aula 05 - Criacao de Rotas</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/sobre" state={{ origem: "Header" }}>
          Sobre
        </NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer>SERRATEC - 2026</footer>;
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Home() {
  const navigate = useNavigate();

  function irParaPrimeiroProduto() {
    navigate("/produtos/1", {
      state: { mensagem: "Navegacao feita pela Home" },
    });
  }

  return (
    <main>
      <h2>Home</h2>
      <p>Esta pagina esta na rota inicial.</p>

      <Link to="/produtos/2" state={{ mensagem: "Navegacao feita por Link" }}>
        Ver produto 2 usando Link
      </Link>

      <button onClick={irParaPrimeiroProduto}>
        Ver produto 1 usando useNavigate
      </button>
    </main>
  );
}

function Sobre() {
  const location = useLocation();
  const origem = location.state?.origem || "nenhuma origem recebida";

  return (
    <main>
      <h2>Sobre</h2>
      <p>Informacao recebida via state: {origem}</p>
    </main>
  );
}

function Produtos() {
  return (
    <main>
      <h2>Produtos</h2>

      {produtos.map((produto) => (
        <article key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>R$ {produto.preco}</p>
          <Link
            to={`/produtos/${produto.id}`}
            state={{ mensagem: `Produto escolhido: ${produto.nome}` }}
          >
            Ver detalhes
          </Link>
        </article>
      ))}
    </main>
  );
}

function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const produto = produtos.find((item) => item.id === Number(id));
  const mensagem = location.state?.mensagem || "nenhum state recebido";

  if (!produto) {
    return (
      <main>
        <h2>Produto nao encontrado</h2>
        <button onClick={() => navigate("/produtos")}>Voltar</button>
      </main>
    );
  }

  return (
    <main>
      <h2>Detalhes do produto</h2>
      <p>Parametro da rota: {id}</p>
      <p>Nome: {produto.nome}</p>
      <p>Preco: R$ {produto.preco}</p>
      <p>State da navegacao: {mensagem}</p>

      <button onClick={() => navigate("/")}>Voltar para Home</button>
    </main>
  );
}

function PageNotFound() {
  return (
    <main>
      <h2>Pagina nao encontrada</h2>
      <Link to="/">Voltar para Home</Link>
    </main>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
