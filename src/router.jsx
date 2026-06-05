import { Route, Routes } from "react-router";
import Aliens from "./pages/Aliens";
import Home from "./pages/Home";



function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aliens" element={<Aliens />} />
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
