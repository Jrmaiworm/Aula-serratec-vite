import { Link } from "react-router";
import AppRouter from "./router";

function App() {
  return (
    <main className="app">
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/aliens">Aliens</Link>
      </nav>
      <AppRouter />
    </main>
  );
}

export default App;
