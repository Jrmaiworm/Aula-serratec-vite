import axios from "axios";
import { useEffect, useState } from "react";
import FormAlien from "../components/FormAlien";

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

      <FormAlien
        cadastrarAlien={cadastrarAlien}
        formAlien={formAlien}
        setFormAlien={setFormAlien}
      />
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
