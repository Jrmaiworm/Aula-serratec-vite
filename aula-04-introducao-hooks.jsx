import { useState } from "react";

function BotaoStateless({ texto, contador, onClick }) {
  return (
    <button onClick={onClick}>
      {texto}: {contador}
    </button>
  );
}

function ContatoForm({ onAdicionarContato }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const novoContato = {
      id: Date.now(),
      nome,
      email,
      telefone,
    };

    onAdicionarContato(novoContato);
    setNome("");
    setEmail("");
    setTelefone("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo contato</h2>

      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        placeholder="Digite o nome"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Digite o email"
        required
      />

      <label htmlFor="telefone">Telefone</label>
      <input
        id="telefone"
        type="text"
        value={telefone}
        onChange={(event) => setTelefone(event.target.value)}
        placeholder="Digite o telefone"
      />

      <button type="submit">Adicionar contato</button>
    </form>
  );
}

function ContatoCard({ contato, onRemoverContato }) {
  return (
    <article>
      <h3>{contato.nome}</h3>
      <p>{contato.email}</p>
      <p>{contato.telefone}</p>
      <button onClick={() => onRemoverContato(contato.id)}>Remover</button>
    </article>
  );
}

function ContatoList({ contatos, onRemoverContato }) {
  if (contatos.length === 0) {
    return <p>Nenhum contato cadastrado.</p>;
  }

  return (
    <section>
      <h2>Lista de contatos</h2>

      {contatos.map((contato) => (
        <ContatoCard
          key={contato.id}
          contato={contato}
          onRemoverContato={onRemoverContato}
        />
      ))}
    </section>
  );
}

function App() {
  const [contador, setContador] = useState(0);
  const [contatos, setContatos] = useState([
    {
      id: 1,
      nome: "Ana Souza",
      email: "ana@email.com",
      telefone: "(21) 99999-1111",
    },
    {
      id: 2,
      nome: "Bruno Lima",
      email: "bruno@email.com",
      telefone: "(21) 99999-2222",
    },
  ]);

  function incrementarTresVezesErrado() {
    setContador(contador + 1);
    setContador(contador + 1);
    setContador(contador + 1);
  }

  function incrementarTresVezesCerto() {
    setContador((valorAtual) => valorAtual + 1);
    setContador((valorAtual) => valorAtual + 1);
    setContador((valorAtual) => valorAtual + 1);
  }

  function adicionarContato(novoContato) {
    setContatos([...contatos, novoContato]);
  }

  function removerContato(idContato) {
    const contatosAtualizados = contatos.filter(
      (contato) => contato.id !== idContato
    );

    setContatos(contatosAtualizados);
  }

  return (
    <main>
      <h1>Aula 04 - Introducao aos Hooks</h1>

      <section>
        <h2>useState e atualizacao assincrona</h2>
        <p>Contador: {contador}</p>

        <button onClick={() => setContador(contador + 1)}>
          Incrementar uma vez
        </button>
        <button onClick={incrementarTresVezesErrado}>
          Incrementar 3 vezes usando contador + 1
        </button>
        <button onClick={incrementarTresVezesCerto}>
          Incrementar 3 vezes usando forma funcional
        </button>
      </section>

      <section>
        <h2>Lifting state up</h2>
        <BotaoStateless
          texto="Botao A"
          contador={contador}
          onClick={() => setContador((valorAtual) => valorAtual + 1)}
        />
        <BotaoStateless
          texto="Botao B"
          contador={contador}
          onClick={() => setContador((valorAtual) => valorAtual + 1)}
        />
      </section>

      <ContatoForm onAdicionarContato={adicionarContato} />

      <ContatoList contatos={contatos} onRemoverContato={removerContato} />
    </main>
  );
}

export default App;
