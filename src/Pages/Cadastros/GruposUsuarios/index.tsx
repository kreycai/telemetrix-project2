import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaRegPlusSquare, FaSistrix } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";
import trash from "../../../imgs/trash-alt-light@2x.png";
import edit from "../../../imgs/file-alt-light@2x.png";
import "./index.css";

function GruposUsuarios() {
  const [search, setSearch] = useState<any>({});
  const [values, setValues] = useState<any>({});
  const [usersGroup, setUsersGroup] = useState<any[]>([]);
  const [newUserGroup, setNewUserGroup] = useState<any[]>([]);
  const [isOpenModalCreUpd, setIsOpenModalCreUpd] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [idDel, setIdDel] = useState("");
  const [idUpd, setIdUpd] = useState("");
  console.log(search);

  useEffect(() => {
    const minhaLista: any = localStorage.getItem("@usersGroupReg");
    setUsersGroup(JSON.parse(minhaLista) || []);
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
    setNewUserGroup([]);
  };

  const filterAll = () => {
    const data = usersGroup.filter((e: any) =>
      Object.keys(e).some(
        (key) =>
          e[key] &&
          search[key] &&
          e[key].toString().toLowerCase() == search[key].toLowerCase()
        // .includes(search[key].toLowerCase())
      )
    );
    console.log(data);

    if (data.length) {
      setNewUserGroup(data);
    } else {
      setNewUserGroup(usersGroup);
      toast.info("Usuário não encontrado, vise os existentes...");
    }
  };

  const registerGroupUser = () => {
    if (typeModal === "create") {
      const minhaLista: any = localStorage.getItem("@usersGroupReg");

      let gruposUsuariosRegistrados = JSON.parse(minhaLista) || [];
      const hasFilme = gruposUsuariosRegistrados.some(
        (usersReg: any) => usersReg.nome === values.nome
      );

      if (hasFilme) {
        toast.warn("Grupo de usuário ja existe!");
        return;
      }

      gruposUsuariosRegistrados.push(values);
      localStorage.setItem(
        "@usersGroupReg",
        JSON.stringify(gruposUsuariosRegistrados)
      );
      setNewUserGroup(gruposUsuariosRegistrados);
      setUsersGroup(gruposUsuariosRegistrados);
      closeModalCreUpd();
      toast.success("Grupo de usuario cadastrado com sucesso!");
    } else {
      let filtroUsersGroupkill = usersGroup.filter((item: any) => {
        return item.nome !== idUpd;
      });
      let filtroUsersGroupUpd = [...filtroUsersGroupkill, values];
      setIdUpd("");
      setNewUserGroup(filtroUsersGroupUpd);
      setUsersGroup(filtroUsersGroupUpd);
      localStorage.setItem(
        "@usersGroupReg",
        JSON.stringify(filtroUsersGroupUpd)
      );
      toast.success("Grupo de usuário atualizado com sucesso");
      setIsOpenModalCreUpd(false);
    }
  };

  const deleteGroupUser = (id: string) => {
    let filtroUsersGroup = usersGroup.filter((item: any) => {
      return item.nome !== id;
    });
    setUsersGroup(filtroUsersGroup);
    setNewUserGroup(filtroUsersGroup);
    localStorage.setItem("@usersGroupReg", JSON.stringify(filtroUsersGroup));
    toast.success("Grupo de usuário desabilitado com sucesso");
    setIdDel("");
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
  const openModalDel = (nome: string) => {
    setIdDel(nome);
    setIsOpenModalDel(true);
  };
  const closeModalDel = () => {
    setIsOpenModalDel(false);
  };

  return (
    <div className="gruposUsuarios">
      <div>
        <div className="inputsDiv">
          <div>
            <label htmlFor="">Nome do Grupo</label>
            <input
              type="text"
              className="inputCad"
              name="nome"
              onChange={handleChangeValues}
            />
          </div>
          <div className="divRadio">
            <input
              type="radio"
              id="Ativo"
              className="inputCadRadio"
              name="situac"
              value="Ativo"
              onChange={handleChangeValues}
            />
            <label htmlFor="Ativo">Ativo</label>
          </div>
          <div className="divRadio">
            <input
              type="radio"
              id="Inativo"
              className="inputCadRadio"
              name="situac"
              value="Inativo"
              onChange={handleChangeValues}
            />
            <label htmlFor="Inativo">Inativo</label>
          </div>
          <FaSistrix className="icon" onClick={filterAll} />
          <FaRegPlusSquare
            className="icon"
            onClick={() => openModalCreUpd("create")}
          />
        </div>
      </div>
      <div className="tabela">
        <h2>Grupos de Usuários</h2>
        <table>
          <tr>
            <th>Nome do Grupo</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
          {newUserGroup[0]
            ? newUserGroup.map((u) => {
                return (
                  <tr key={u.nome}>
                    <td>{u.nome}</td>
                    <td>{u.situac}</td>
                    <td className="imgTd">
                      <img
                        src={edit}
                        alt="errorImg"
                        onClick={() => openModalCreUpd("update", u.nome)}
                      />
                      <img
                        src={trash}
                        alt="errorImg"
                        onClick={() => openModalDel(u.nome)}
                      />
                    </td>
                  </tr>
                );
              })
            : usersGroup.map((u) => {
                return (
                  <tr key={u.nome}>
                    <td>{u.nome}</td>
                    <td>{u.situac}</td>
                    <td className="imgTd">
                      <img
                        src={edit}
                        alt="errorImg"
                        onClick={() => openModalCreUpd("update", u.nome)}
                      />
                      <img
                        src={trash}
                        alt="errorImg"
                        onClick={() => openModalDel(u.nome)}
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
          className="modal-content contentGroup"
        >
          <div className="titModal">
            <h2>
              {typeModal == "create"
                ? "Cadastro de Grupos de Usuário"
                : "Edição de Grupos de Usuário"}
            </h2>
            <VscChromeClose className="iconModal" onClick={closeModalCreUpd} />
          </div>
          <hr />
          <div className="modalQuebra">
            <div className="inputsDivModal">
              <div>
                <label htmlFor="">Nome do Grupo</label>
                <input
                  type="text"
                  className="inputCad"
                  name="nome"
                  onChange={handleChangeValuesModalCre}
                />
              </div>
              <div className="divRadio">
                <input
                  type="radio"
                  id="Ativo"
                  className="inputCadRadio"
                  name="situac"
                  value="Ativo"
                  onChange={handleChangeValuesModalCre}
                />
                <label htmlFor="Ativo">Ativo</label>
              </div>
              <div className="divRadio">
                <input
                  type="radio"
                  id="Inativo"
                  className="inputCadRadio"
                  name="situac"
                  value="Inativo"
                  onChange={handleChangeValuesModalCre}
                />
                <label htmlFor="Inativo">Inativo</label>
              </div>
            </div>
            <div className="buttonsModal">
              <button onClick={closeModalCreUpd}>Cancelar</button>
              <button onClick={registerGroupUser}>Cadastrar</button>
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
              <button onClick={() => deleteGroupUser(idDel)}>
                Desabilitar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default GruposUsuarios;
