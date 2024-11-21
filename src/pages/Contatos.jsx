import PageTitle from "../components/PageTitle";
import "../styles/contatos.css";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Contatos = () => {
  const [data, setData] = useState([]);

  const getContatos = async () => {
    axios
      .get("/getContatos")
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
    getContatos();
  }, []);

  return (
    <>
      <PageTitle page="Solicitações de Contato" />
      <div className="contatos-container">
        {data == 0 ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <tr>
              <th>ID</th>
              <th style={{ textAlign: "left" }}>Nome</th>
              <th style={{ textAlign: "left" }}>E-mail</th>
              <th style={{ textAlign: "left" }}>Telefone</th>
              <th style={{ textAlign: "left" }}>Descricao</th>
              <th style={{ textAlign: "left" }}>Processo ID</th>
            </tr>
            {data.map((data) => (
              <tr>
                <td>{data.id_contato}</td>
                <td>{data.contato_nome}</td>
                <td>{data.contato_email}</td>
                <td>{data.contato_telefone}</td>
                <td>{data.contato_descricao}</td>
                <td>{data.contato_processo_id}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default Contatos;
