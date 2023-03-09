import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/telemetrixLogo.png";
import "./index.css";

function Login() {
  return (
    <div className="login">
      <div className="left" />
      <div className="right">
        <div className="divLogin">
          <img src={logo} alt="imgError" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Digite Sua Senha" />
          <Link to={"/cadastros/usuarios"}>Entrar</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
