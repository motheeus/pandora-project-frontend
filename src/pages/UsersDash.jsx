import React, { useEffect, useState } from "react";
import "../styles/UsersDash.css";
import { FaPlus } from "react-icons/fa6";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import { HiRefresh } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from "../components/Modal";

const UsersCard = (data) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState();

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        height={modalState == "edit" ? "640px" : "200px"}
        width={modalState == "edit" ? "900px" : "500px"}
      >
        {modalState == "edit" ? (
          <div className="userscard-modal-container">
            <div className="userscard-modal-title">Editar Usuário</div>

            <div className="userscard-modal-edit-container">

              <div className="userscard-modal-edit-field">
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" value={data.data.nome}/>
              </div>

              <div className="userscard-modal-edit-field">
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input type="text" name="sobrenome" value={data.data.sobrenome}/>
              </div>

              <div className="userscard-modal-edit-field">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={data.data.username}/>
              </div>


              <div className="userscard-modal-edit-field">
                <label htmlFor="email">E-mail:</label>
                <input type="text" name="email" value={data.data.email}/>
              </div>

              <div className="userscard-modal-edit-field">
                <label htmlFor="cargo">Cargo</label>
                <select name="cargo" id="">
                  <option selected={data.data.cargo == "admin" ? "selected" : ""}>Administrador</option>
                  <option selected={data.data.cargo == "normal" ? "selected" : ""}>Editor</option>
                  <option selected={data.data.cargo == "normal" ? "selected" : ""}>Regular</option>
                </select>
              </div>

              <div style={{height: "50px"}} />

              <div className="userscard-modal-buttons">
              <button className="userscard-modal-button-edit">EDITAR</button>
              <button
                onClick={() => setOpenModal(false)}
                className="userscard-modal-button-secondary"
              >
                CANCELAR
              </button>
            </div>

            </div>
          </div>
        ) : (
          <div className="userscard-modal-container">
            <div className="userscard-modal-title">Deletar usuário?</div>
            <div className="userscard-modal-description">
              Excluir usuário (
              <span style={{ fontWeight: "700" }}>
                {data.data.username + " - " + data.data.id_user}
              </span>
              ) permanentemente? (Essa ação não pode ser desfeita)
            </div>
            <div style={{height: "50px"}} />
            <div className="userscard-modal-buttons">
              <button className="userscard-modal-button-delete">DELETAR</button>
              <button
                onClick={() => setOpenModal(false)}
                className="userscard-modal-button-secondary"
              >
                CANCELAR
              </button>
            </div>
          </div>
        )}
      </Modal>
      <tr>
        <td style={{ textAlign: "center" }}>{data.data.id_user}</td>
        <td>{data.data.nome + " " + data.data.sobrenome}</td>
        <td>{data.data.username}</td>
        <td style={{ textAlign: "center" }}>{data.data.cargo}</td>
        <td>
          <div className="userscard-buttons">
            <button
              onClick={() => {
                setModalState("edit");
                setOpenModal(!openModal);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              onClick={() => {
                setModalState("delete");
                setOpenModal(!openModal);
              }}
              className="userscard-buttons-delete"
            >
              <MdDelete />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

const UsersDash = (state) => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    axios
      .get("/users")
      .then((res) => setData(res.data))
      .catch((e) => {
        try {
          toast.error(e.response.data);
        } catch (e) {
          toast.error(
            "Ocorreu um erro de conexão. Tente novamente mais tarde."
          );
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (state.state == 1) {
    return (
      <div className="usersdash-wrapper">
        <div className="usersdash-header">
          <button className="usersdash-create-user">
            <FaPlus />
            CRIAR NOVO USUÁRIO
          </button>
          <button onClick={fetchUsers} className="usersdash-button">
            <HiRefresh />
            ATUALIZAR
          </button>
        </div>

        <div className="usersdash-users">
          {data == 0 ? (
            <p>Carregando...</p>
          ) : (
            <table>
              <tr>
                <th>ID</th>
                <th style={{ textAlign: "left" }}>Nome</th>
                <th style={{ textAlign: "left" }}>Username</th>
                <th>Cargo</th>
              </tr>
              {data.map((data) => (
                <UsersCard key={data.id_user} data={data} />
              ))}
            </table>
          )}
        </div>
      </div>
    );
  }
};

export default UsersDash;
