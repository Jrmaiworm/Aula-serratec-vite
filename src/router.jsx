import { Route, Routes } from "react-router";
import Aliens from "./pages/Aliens";
import Home from "./pages/Home";
import Planetas from "./pages/Planetas";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aliens" element={<Aliens />} />
    </Routes>
  );
}

export default AppRouter;
