import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

function UsuarioCard({ usuario }) {
  return (
    <article>
      <h3>{usuario.name}</h3>
      <p>Email: {usuario.email}</p>
      <p>Cidade: {usuario.address.city}</p>
    </article>
  );
}

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarUsuariosComAxios() {
    try {
      setCarregando(true);
      setErro("");

      const { data } = await api.get("/users");

      setUsuarios(data);
    } catch (error) {
      setErro("Nao foi possivel buscar os usuarios.");
    } finally {
      setCarregando(false);
    }
  }

  function buscarUsuariosComFetchThen() {
    setCarregando(true);
    setErro("");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro na requisicao");
        }

        return resposta.json();
      })
      .then((dados) => {
        setUsuarios(dados);
      })
      .catch(() => {
        setErro("Nao foi possivel buscar os usuarios com fetch.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  useEffect(() => {
    buscarUsuariosComAxios();
  }, []);

  return (
    <main>
      <h1>Aula 06 - Requisicoes HTTP com Axios</h1>

      <section>
        <h2>GET, useEffect, state e map</h2>

        <button onClick={buscarUsuariosComAxios}>
          Buscar novamente com Axios
        </button>
        <button onClick={buscarUsuariosComFetchThen}>
          Buscar com fetch e then
        </button>
      </section>

      {carregando && <p>Carregando usuarios...</p>}
      {erro && <p>{erro}</p>}

      {!carregando && !erro && (
        <section>
          <h2>Usuarios da API</h2>

          {usuarios.map((usuario) => (
            <UsuarioCard key={usuario.id} usuario={usuario} />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
