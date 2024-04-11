import React, { useEffect, useState } from "react";
import "../styles/UsersDash.css";
import { FaPlus } from "react-icons/fa6";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import { HiRefresh } from "react-icons/hi";

const UsersCard = (data) => {
  return (
    <tr>
      <td>{data.data.id_user}</td>
      <td>{data.data.nome + " " + data.data.sobrenome}</td>
      <td>{data.data.username}</td>
      <td>{data.data.cargo}</td>
      <td>
        <button>EDITAR</button>
      </td>
      <td>
        <button>EXCLUIR</button>
      </td>
    </tr>
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
                <th>Nome</th>
                <th>Username</th>
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
