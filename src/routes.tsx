import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Login2 from "./Pages/Login2";
import Cadastros from "./Pages/Cadastros";
import Usuarios from "./Pages/Cadastros/Usuarios";
import GruposUsuarios from "./Pages/Cadastros/GruposUsuarios";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/cadastros" element={<Cadastros />}>
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="gruposUsuarios" element={<GruposUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
