import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaRegPlusSquare, FaSistrix, FaRegEdit } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";
import trash from "../../../imgs/trash-alt-light@2x.png";
import edit from "../../../imgs/file-alt-light@2x.png";
import "./index.css";
import "../../components/modal.css";

function Usuarios() {
  const [search, setSearch] = useState<any>({});
  const [values, setValues] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState<any[]>([]);
  const [isOpenModalCreUpd, setIsOpenModalCreUpd] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [idDel, setIdDel] = useState("");
  const [idUpd, setIdUpd] = useState("");

  useEffect(() => {
    const minhaLista: any = localStorage.getItem("@usersReg");
    setUsers(JSON.parse(minhaLista) || []);
  }, []);

  const handleChangeValues = (value: any) => {
    setSearch((PrevValue: any) => ({
      ...PrevValue,
      [value.target.name]: value.target.value,
    }));
  };
  const handleChangeValuesModalCre = (value: any) => {
    setValues((PrevValue: any) => ({
      ...PrevValue,
      [value.target.name]: value.target.value,
    }));
    setNewUser([]);
  };

  const filterAll = () => {
    const data = users.filter((e: any) =>
      Object.keys(e).some(
        (key) =>
          e[key] &&
          search[key] &&
          e[key].toString().toLowerCase().includes(search[key].toLowerCase())
      )
    );
    console.log(data);

    if (data.length) {
      setNewUser(data);
    } else {
      console.log("semdata");
      setNewUser(users);
      toast.info("Usuário não encontrado, vise os existentes...");
    }
  };
  const RegisterUser = () => {
    if (typeModal === "create") {
      const minhaLista: any = localStorage.getItem("@usersReg");

      let usuariosRegistrados = JSON.parse(minhaLista) || [];
      const hasFilme = usuariosRegistrados.some(
        (usersReg: any) => usersReg.email === values.email
      );

      if (hasFilme) {
        toast.warn("Usuário ja existe!");
        return;
      }
      usuariosRegistrados.push(values);
      localStorage.setItem("@usersReg", JSON.stringify(usuariosRegistrados));
      setUsers([...users, values]);
      closeModalCreUpd();
      toast.success("Usuario cadastrado com sucesso!");
    } else {
      let filtroUserskill = users.filter((item: any) => {
        return item.nome !== idUpd;
      });
      let filtroUserspUpd = [...filtroUserskill, values];
      setIdUpd("");
      setNewUser(filtroUserspUpd);
      setUsers(filtroUserspUpd);
      localStorage.setItem("@usersReg", JSON.stringify(filtroUserspUpd));
      toast.success("Usuário desabilitado com sucesso");
      setIsOpenModalCreUpd(false);
    }
  };

  const deleteUser = (id: string) => {
    let filtroUsers = users.filter((item: any) => {
      return item.email !== id;
    });
    setIdDel("");
    setNewUser([]);
    setUsers(filtroUsers);
    localStorage.setItem("@usersReg", JSON.stringify(filtroUsers));
    toast.success("Usuário desabilitado com sucesso");
    setIsOpenModalDel(false);
  };

  const openModalCreUpd = (prop: string, id?: string) => {
    setTypeModal(prop);
    if (id) {
      setIdUpd(id);
    }
    setIsOpenModalCreUpd(true);
  };
  const closeModalCreUpd = () => {
    setIsOpenModalCreUpd(false);
  };
  const openModalDel = (email: string) => {
    setIdDel(email);
    setIsOpenModalDel(true);
  };
  const closeModalDel = () => {
    setIsOpenModalDel(false);
  };

  return (
    <div className="usuarios">
      <div className="teste">
        <div className="inputsDiv">
          <div>
            <label htmlFor="">Nome</label>
            <input
              type="text"
              className="inputCad"
              name="nome"
              onChange={handleChangeValues}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="inputCad"
              name="email"
              onChange={handleChangeValues}
            />
          </div>
          <div>
            <label htmlFor="">Tipo Usuário</label>
            <select
              className="inputCad"
              name="tipo"
              onChange={handleChangeValues}
            >
              <option value="Selecione">Selecione</option>
              <option value="Usuário">Usuário</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <FaSistrix className="icon" onClick={filterAll} />
          <FaRegPlusSquare
            className="icon"
            onClick={() => openModalCreUpd("create")}
          />
        </div>
      </div>
      <div className="tabela">
        <h2>Usuarios</h2>
        <table>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo Usuario</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
          {newUser[0]
            ? newUser.map((u) => {
                return (
                  <tr key={u.email}>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>{u.tipo}</td>
                    <td>Sim</td>
                    <td className="imgTd">
                      <img
                        src={edit}
                        alt="errorImg"
                        onClick={() => openModalCreUpd("update", u.nome)}
                      />
                      <img
                        src={trash}
                        alt="errorImg"
                        onClick={() => openModalDel(u.email)}
                      />
                    </td>
                  </tr>
                );
              })
            : users.map((u) => {
                return (
                  <tr key={u.email}>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>{u.tipo}</td>
                    <td>Sim</td>
                    <td className="imgTd">
                      <img
                        src={edit}
                        alt="errorImg"
                        onClick={() => openModalCreUpd("update", u.nome)}
                      />
                      <img
                        src={trash}
                        alt="errorImg"
                        onClick={() => openModalDel(u.email)}
                      />
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
      <div className="container">
        <Modal
          isOpen={isOpenModalCreUpd}
          onRequestClose={closeModalCreUpd}
          contentLabel="Modal"
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <div className="titModal">
            <h2>
              {" "}
              {typeModal == "create"
                ? "Cadastro de Usuário"
                : "Edição de Usuário"}{" "}
            </h2>
            <VscChromeClose className="iconModal" onClick={closeModalCreUpd} />
          </div>
          <hr />
          <div className="modalQuebra">
            <div className="inputsDivModal">
              <div>
                <label htmlFor="">Nome</label>
                <input
                  type="text"
                  className="inputCad"
                  name="nome"
                  onChange={handleChangeValuesModalCre}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="inputCad"
                  name="email"
                  onChange={handleChangeValuesModalCre}
                />
              </div>
              <div>
                <label htmlFor="">Senha</label>
                <input
                  type="text"
                  className="inputCad"
                  name="senha"
                  onChange={handleChangeValuesModalCre}
                />
              </div>
              <div>
                <label htmlFor="">Tipo Usuário</label>
                <select
                  className="inputCad"
                  name="tipo"
                  onChange={handleChangeValuesModalCre}
                >
                  <option value="Selecione">Selecione</option>
                  <option value="Usuário">Usuário</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>
            <div className="buttonsModal">
              <button onClick={closeModalCreUpd}>Cancelar</button>
              <button onClick={RegisterUser}>Cadastrar</button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="container">
        <Modal
          isOpen={isOpenModalDel}
          onRequestClose={closeModalDel}
          contentLabel="ModalDel"
          overlayClassName="modal-overlay-del"
          className="modal-content-del"
        >
          <div className="titModalDel">
            <h2 className="titDel">Deseja Desabilitar Registro?</h2>
          </div>
          <div className="modalQuebra">
            <div className="buttonsModal">
              <button onClick={closeModalDel}>Cancelar</button>
              <button onClick={() => deleteUser(idDel)}>Desabilitar</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Usuarios;
