import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/telemetrixLogo.png";
import logoCli from "../../imgs/logoCli.png";
import "./index.css";

function Login2() {
  return (
    <div className="login">
      <div className="left" />
      <div className="right">
        <div className="divLogin">
          <img src={logo} alt="imgError" />
          <img src={logoCli} alt="imgError" className="logoCli" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Digite Sua Senha" />
          <Link to={"/cadastros/usuarios"}>Entrar</Link>
        </div>
      </div>
    </div>
  );
}

export default Login2;
