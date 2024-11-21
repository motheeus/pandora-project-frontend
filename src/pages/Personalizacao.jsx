import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import "../styles/personalizacao.css";
import { toast } from "react-toastify";
import axios from "../api/axios";

const Personalizacao = () => {
  const initialState = {
    nome_revenda: "",
    cor_detalhe: "",
    lp_frase_efeito: "",
    lp_frase_secundaria: "",
    revenda_endereco: "",
  };

  const [getData, setgetData] = useState({});
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState([]);

  const getInfo = () => {
    axios
      .get("/revendaData")
      .then((res) => {
        setgetData(res.data[0]);
        console.log(res.data[0]);
        setValues(res.data[0])
      })
      .catch((e) => {
        try {
          console.log(e);
          toast.error(e);
        } catch (e) {
          console.log(e);
          toast.error(
            "Ocorreu um erro de conexão. Tente novamente mais tarde."
          );
        }
      });
  };

  const updateInfo = () => {
    axios
      .put("/revendaData", values)
      .then((res) => {
        toast.success("Dados da revenda atualizados com sucesso!");
        getInfo()
      })
      .catch((e) => {
        try {
          console.log(e);
          toast.error(e);
        } catch (e) {
          console.log(e);
          toast.error(
            "Ocorreu um erro de conexão. Tente novamente mais tarde."
          );
        }
      });
  };

  const logoUpdater = () => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();

    formData.append("files", file[0]);

    console.log(file[0]);
    console.log(formData);
    axios.put("/revendaDataLogoUpload", formData, config).catch(() => {
      console.log(file);
      console.log(formData);
      toast.error("Houve um erro no upload das imagens!");
    });
  }

  const handleChangesForm = (e) => {
    values[e.target.name] = e.target.value;
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <PageTitle page="Personalização" />

      <div className="personalizacao-container">
        <div className="personalizacao-definicoes">
          <div className="personalizacao-definicoes-gerais">
            <div className="personalizacao-definicoes-gerais-titulo">Geral</div>

            <label htmlFor="nomeloja">Nome da Loja: </label>
            <input
              type="text"
              name="nome_revenda"
              onChange={(e) => handleChangesForm(e)}
              defaultValue={getData.nome_revenda}
            />

            <label htmlFor="cordetalhe">Cor de Detalhe</label>
            <input
              type="color"
              name="cor_detalhe"
              onChange={(e) => handleChangesForm(e)}
              defaultValue={getData.cor_detalhe}
            />

            <label htmlFor="logo">Logo</label>
            <input type="file" name="logo" onChange={(e) => setFile(e.target.files)} />

            <label htmlFor="endereco">Endereco: </label>
            <input
              type="text"
              name="revenda_endereco"
              onChange={(e) => handleChangesForm(e)}
              defaultValue={getData.revenda_endereco}
            />
          </div>

          <div className="personalizacao-landingpageoptions">
            <div className="personalizacao-landingpageoptions-titulo">
              Landing Page
            </div>

            <label htmlFor="fraseefeito">Frase de Efeito: </label>
            <input
              type="text"
              name="lp_frase_efeito"
              onChange={(e) => handleChangesForm(e)}
              defaultValue={getData.lp_frase_efeito}
            />

            <label htmlFor="frasesecundaria">Frase secundária: </label>
            <input
              type="text"
              name="lp_frase_secundaria"
              onChange={(e) => handleChangesForm(e)}
              defaultValue={getData.lp_frase_secundaria}
            />
          </div>

          <button
            onClick={(e) => {
              updateInfo();
              logoUpdater();
            }}
            className="personalizacao-botaoenviar"
          >
            Salvar
          </button>
        </div>
      </div>
    </>
  );
};

export default Personalizacao;
