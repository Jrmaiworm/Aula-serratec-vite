import { Route, Routes } from "react-router";
import Aliens from "./pages/Aliens";
import Home from "./pages/Home";


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aliens" element={<Aliens />} />
    </Routes>
  );
}

export default AppRouter;
