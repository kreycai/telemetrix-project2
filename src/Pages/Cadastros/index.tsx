import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import openBar from "../../imgs/caret-left-solid@2x.png";
import logo from "../../imgs/telemetrixLogo.png";
import config from "../../imgs/cog-light@2x.png";
import { FaAngleDown } from "react-icons/fa";
import "./index.css";

function Cadastros() {
  return (
    <div className="cadastros">
      <div className="CadastrosLeft">
        <input type="checkbox" id="check" className="check" />
        <div className="bar">
          <div className="navbars">
            <div className="divImgLogo">
              <img src={logo} alt="errorImg" className="logo" />
            </div>
            <h2>Cadastros</h2>
            <div className="divCadUsu">
              <div className="LabelCadUsu">
                <Link to={"/cadastros/usuarios"} className="etc">
                  Usuários
                </Link>
                <label htmlFor="checkGru" className="checkGru">
                  <FaAngleDown />
                </label>
              </div>
              <div>
                <input type="checkbox" id="checkGru" />
                <Link className="grupos" to={"/cadastros/gruposUsuarios"}>
                  Grupos
                </Link>
              </div>
            </div>
            <Link to={""} className="link">
              Clientes
            </Link>
            <Link to={""} className="link">
              Fornecedores
            </Link>
          </div>
        </div>
        <div className="ContentRight">
          <div className="labels">
            <label htmlFor="check" className="arrowInv">
              <img src={openBar} alt="errorImg" />
            </label>
            <label htmlFor="check" className="arrow">
              <img src={openBar} alt="errorImg" />
            </label>
            <label htmlFor="" className="config">
              <img src={config} alt="errorImg" />
            </label>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastros;
