import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://api.serratec.mwmsoftware.com/aliens";

function Aliens() {
  const [aliens, setAliens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [formAlien, setFormAlien] = useState({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: "",
  });

  async function buscarAliensComAxios() {
    try {
      const resposta = await axios.get(url);
      setAliens(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar aliens com axios:", error);
    }
  }

  async function cadastrarAlien(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await axios.post(url, formAlien);
      setAliens((listaAtual) => [...listaAtual, resposta.data]);
      setFormAlien({
        nome: "",
        especie: "",
        planeta: "",
        periculosidade: 1,
        descricao: "",
      });
      setMensagem("Alien cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar alien:", error);
      setMensagem("Erro ao cadastrar alien.");
    }
  }

  useEffect(() => {
    buscarAliensComAxios();
  }, []);

  useEffect(() => {
    console.log("Estado aliens atualizado:", aliens);
  }, [aliens]);

  return (
    <section>
      <h1>Aliens</h1>

      <form className="alien-form" onSubmit={cadastrarAlien}>
        <h2>Cadastrar alien</h2>

        <label>
          Nome
          <input
            name="nome"
            minLength="2"
            onChange={(event) =>
              setFormAlien({ ...formAlien, nome: event.target.value })
            }
            required
            type="text"
            value={formAlien.nome}
          />
        </label>

        <label>
          Espécie
          <input
            name="especie"
            minLength="2"
            onChange={(event) =>
              setFormAlien({ ...formAlien, especie: event.target.value })
            }
            required
            type="text"
            value={formAlien.especie}
          />
        </label>

        <label>
          Planeta
          <input
            name="planeta"
            minLength="2"
            onChange={(event) =>
              setFormAlien({ ...formAlien, planeta: event.target.value })
            }
            required
            type="text"
            value={formAlien.planeta}
          />
        </label>

        <label>
          Periculosidade
          <input
            max="10"
            min="1"
            name="periculosidade"
            onChange={(event) =>
              setFormAlien({
                ...formAlien,
                periculosidade: Number(event.target.value),
              })
            }
            required
            type="number"
            value={formAlien.periculosidade}
          />
        </label>

        <label>
          Descrição
          <input
            name="descricao"
            minLength="3"
            onChange={(event) =>
              setFormAlien({ ...formAlien, descricao: event.target.value })
            }
            required
            type="text"
            value={formAlien.descricao}
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <div className="alien-list">
        {aliens.map((alien) => (
          <article className="alien-card" key={alien.id}>
            <h3>
              {alien?.nome === "string" ? "Nome não disponível" : alien?.nome}
            </h3>
            <p>
              <strong>Espécie:</strong> {alien?.especie}
            </p>
            <p>
              <strong>Planeta:</strong> {alien?.planeta}
            </p>
            <p>
              <strong>Periculosidade:</strong> {alien?.periculosidade}
            </p>
            <p>
              <strong>Descrição:</strong> {alien?.descricao}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Aliens;
