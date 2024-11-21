import PageTitle from "../components/PageTitle";
import EstoqueCards from "../components/EstoqueCards";
import "../styles/Estoque.css";
import "../styles/addProcess.css";
import Modal from "../components/Modal";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const Estoque = () => {
  const initialState = {
    form_processo: {
      processo_author_id: 1,
      processo_tipo_auto: 0,
      processo_preco: "",
      processo_status: 0,
    },
    form_auto: {
      car_marca: "",
      car_modelo: "",
      car_versao: "",
      car_ano_modelo: "",
      car_ano_fabricacao: "",
      car_cor: "",
      car_placa: "",
      car_transmissao: "",
      car_km: 0,
      car_combustivel: "",
      car_carroceria: "",
      car_direcao: "",
      car_portas_qtd: "",
      car_motor: "",
    },
    form_opcionais: {},
  };

  const [openModal, setOpenModal] = useState(false);
  const [processData, setProcessData] = useState("");
  const [opcionaisData, setOpcionais] = useState([]);
  const [optionalValue, setoptionalValue] = useState("");
  const [values, setValues] = useState(initialState);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const handleChangesAuto = (e) => {
    values["form_auto"][e.target.name] = e.target.value;
  };

  const handleChangesProcess = (e) => {
    values["form_processo"][e.target.name] = e.target.value;
  };

  const OpcionaisCard = (data) => {
    return (
      <>
        <div className="modal-addoptional-optionalcontainer">
          <div>{data.data.opcional_nome}</div>
          <button
            className="modal-addoptional-removeoptional"
            onClick={(e) => {
              e.preventDefault();

              setOpcionais((oldValues) =>
                oldValues.filter((i) => i !== data.data)
              );
              console.log(opcionaisData);
            }}
          >
            X
          </button>
        </div>
      </>
    );
  };

  const submitProcess = (values) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .post("/insert", values, config)
      .then((res) => {
        toast.success("Processo #" + res.data[0] + " criado com sucesso!");
        setOpenModal(false);
        setValues(initialState);
        navigate("/car/" + res.data[0]);
        uploadImages(res.data[0]);
      })
      .catch((e) => {
        try {
          console.log(e.response.data);
          toast.error(e.response.data);
        } catch (e) {
          console.log(e.response.data);
          toast.error(
            "Ocorreu um erro de conexão. Tente novamente mais tarde."
          );
        }
      });
  };

  const uploadImages = (id) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    console.log(formData);
    axios.post("/imageUpload/" + id, formData, config).catch(() => {
      console.log(files);
      console.log(formData);
      toast.error("Houve um erro no upload das imagens!");
    });
  };

  const fetchProcess = () => {
    axios
      .get("/processService")
      .then((res) => {
        setProcessData(res.data);
        console.log(res.data);
      })
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
    fetchProcess();
  }, []);

  return (
    <>
      <PageTitle page="Estoque" />

      <div className="estoque-container">
        <div className="estoque-grid-wrapper">
          <div className="estoque-filter-container">
          <button
              className="estoque-addprocess-button"
              onClick={() => {
                setOpenModal(!openModal);
                setValues(initialState);
                setOpcionais([]);
              }}
            >
              <FaPlus />
              NOVA POSTAGEM
            </button>
          </div>
          <div className="estoque-processos-container">
            
            {processData == 0 ? (
              <p>Carregando...</p>
            ) : (
              processData.map((processData) => (
                <EstoqueCards
                  key={processData.processo_id}
                  data={processData}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        height="600px"
        width="600px"
      >
        <div className="modal-addprocess-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="modal-addprocess-container-form">
              <div className="modal-addprocess-titles">Informacoes Gerais</div>

              <div className="modal-addprocess-container-infogeral">
                <div className="modal-addprocess-container-left">
                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Marca: </label>
                    <input
                      placeholder="Ex: Chevrolet, Fiat..."
                      onChange={(e) => handleChangesAuto(e)}
                      type="text"
                      name="car_marca"
                      className="modal-addprocess-input-default"
                    />
                  </div>

                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Modelo: </label>
                    <input
                      placeholder="Ex: Astra, Palio..."
                      onChange={(e) => handleChangesAuto(e)}
                      type="text"
                      name="car_modelo"
                      className="modal-addprocess-input-default"
                    />
                  </div>

                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Versao: </label>
                    <input
                      placeholder="Ex: GLS, EX..."
                      type="text"
                      onChange={(e) => handleChangesAuto(e)}
                      name="car_versao"
                      className="modal-addprocess-input-default"
                    />
                  </div>

                  <div>
                    Ano:
                    <div className="modal-addprocess-anocontainer">
                      <div className="modal-addprocess-inputcontainer-ano">
                        <label htmlFor="text">Modelo: </label>
                        <input
                          type="text"
                          onChange={(e) => handleChangesAuto(e)}
                          name="car_ano_modelo"
                          className="modal-addprocess-input-default"
                          style={{ width: "50px" }}
                        />
                      </div>
                      <div className="modal-addprocess-inputcontainer-ano">
                        <label htmlFor="text">Fabricacao: </label>
                        <input
                          type="text"
                          onChange={(e) => handleChangesAuto(e)}
                          name="car_ano_fabricacao"
                          className="modal-addprocess-input-default"
                          style={{ width: "50px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-addprocess-container-right">
                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Cor: </label>
                    <input
                      type="text"
                      onChange={(e) => handleChangesAuto(e)}
                      name="car_cor"
                      className="modal-addprocess-input-default"
                      style={{ width: "100px" }}
                    />
                  </div>

                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Placa: </label>
                    <input
                      placeholder="XXX0000"
                      onChange={(e) => handleChangesAuto(e)}
                      type="text"
                      name="car_placa"
                      className="modal-addprocess-input-default"
                      style={{ width: "100px" }}
                    />
                  </div>

                  <div className="modal-addprocess-inputcontainer">
                    <label htmlFor="text">Preco: </label>
                    <input
                      placeholder="R$"
                      onChange={(e) => handleChangesProcess(e)}
                      type="text"
                      name="processo_preco"
                      className="modal-addprocess-input-default"
                      style={{ width: "100px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-addprocess-titles">Caracteristicas</div>

              <div className="modal-addprocess-caracteristicas-container">
                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Cambio: </label>
                  <input
                    placeholder="Ex: Automatico"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_transmissao"
                    className="modal-addprocess-input-default"
                    style={{ width: "100px" }}
                  />
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Quilometragem: </label>
                  <input
                    placeholder="km"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_km"
                    className="modal-addprocess-input-default"
                    style={{ width: "100px" }}
                  />
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Combustivel: </label>
                  <select
                    placeholder="Gasolina"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_combustivel"
                    className="modal-addprocess-input-default"
                    style={{ width: "120px" }}
                  >
                    <option>-</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Flex">Flex</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Carroceria: </label>
                  <select
                    placeholder="Ex: Hatch"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_carroceria"
                    className="modal-addprocess-input-default"
                    style={{ width: "100px" }}
                  >
                    <option>-</option>
                    <option value="Hatch">Hatch</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Direcao: </label>
                  <select
                    placeholder="Ex: Hidraulica"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_direcao"
                    className="modal-addprocess-input-default"
                    style={{ width: "150px" }}
                  >
                    <option>-</option>
                    <option value="Hidraulica">Hidraulica</option>
                    <option value="Eletrica">Eletrica</option>
                    <option value="Mecanica">Mecanica</option>
                  </select>
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Portas: </label>
                  <input
                    placeholder="Ex: 4"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_portas_qtd"
                    className="modal-addprocess-input-default"
                    style={{ width: "50px" }}
                  />
                </div>

                <div className="modal-addprocess-inputcontainer">
                  <label htmlFor="text">Motor: </label>
                  <input
                    placeholder="Ex: 2.0 ECOPOWER"
                    type="text"
                    onChange={(e) => handleChangesAuto(e)}
                    name="car_motor"
                    className="modal-addprocess-input-default"
                    style={{ width: "150px" }}
                  />
                </div>
              </div>
              {/*               <div>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setFiles(e.target.files[0]);
                  }}
                  multiple
                />
              </div> */}
              <input
                type="file"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                multiple
                accept=".jpeg,.jpg,.png"
              />

              <div className="modal-addprocess-titles">Opcionais</div>

              <div className="">
                <input
                  type="text"
                  name="opcional_nome"
                  className="modal-addprocess-input-default"
                  onChange={(e) => setoptionalValue(e.target.value)}
                  style={{ width: "150px" }}
                />
                <button
                  className="modal-addprocess-addopcionais"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpcionais((oldArray) => [
                      ...oldArray,
                      { id: oldArray.length, opcional_nome: optionalValue },
                    ]);

                    values.form_opcionais = opcionaisData;

                    console.log(values);
                  }}
                >
                  Adicionar
                </button>
              </div>

              <div className="modal-addprocess-opcionais-container">
                {opcionaisData.map((opcionaisData) => (
                  <OpcionaisCard key={opcionaisData.id} data={opcionaisData} />
                ))}
              </div>
            </div>
          </form>

          <div className="modal-addprocess-footer">
            <div className="modal-addprocess-footercontainer">
              <button
                type="submit"
                className="modal-addprocess-addbutton"
                onClick={(e) => {
                  submitProcess(values);
                  e.preventDefault();
                }}
              >
                {" "}
                Criar Processo <FaArrowRight />{" "}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Estoque;
