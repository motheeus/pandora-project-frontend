import React, { useEffect, useState } from "react";
import "../styles/EstoqueCards.css";
import placeholder from "../assets/placeholder.jpg";
import { useNavigate } from "react-router";
import { verifyStatus, verifyStatusColor } from "../api/verifiers";
import axios from "../api/axios";
import { toast } from "react-toastify";

const EstoqueCards = (data) => {
  const navigate = useNavigate();
  const [firstImage, setFirstImage] = useState([])

  const fetchFirstImage = async (id) => {
    axios
      .get("/imageRetrieverFirst/" + id)
      .then((res) => {
        setFirstImage(res.data.auto_images_url);
        console.log(res.data.auto_images_url)
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
    fetchFirstImage(data.data.processo_id)
  }, []);

  return (
    <div
      className="estoqueCards-container"
      onClick={() => navigate("/car/" + data.data.processo_id)}
    >
      <div className="estoqueCards-id">#{data.data.processo_id}</div>
      <div className="estoqueCards-imgemarca">
        
        {firstImage == 0 ? (<div>?</div>) : (<img src={`http://localhost:8801/images/${firstImage}`} alt="" />)}
        <div className="estoqueCards-marcamodelo">
          <span>
            {data.data.car_marca} {data.data.car_modelo}{" "}
          </span>
          <span>
            {data.data.car_motor} {data.data.car_versao}
          </span>
        </div>
      </div>

      <div className="estoqueCards-divisao" />

      <div className="estoqueCards-carinfo">
        <div className="info">
          <span>Motor</span>
          <span>{data.data.car_motor}</span>
        </div>

        <div className="info">
          <span>Versao</span>
          <span>{data.data.car_versao}</span>
        </div>

        <div className="info">
          <span>Carroceria</span>
          <span>
            {data.data.car_carroceria} - {data.data.car_portas_qtd} Portas
          </span>
        </div>

        <div className="info">
          <span>Ano (M/F)</span>
          <span>
            {data.data.car_ano_modelo}/{data.data.car_ano_fabricacao}
          </span>
        </div>
      </div>

      <div className="estoqueCards-divisao" />

      <div className="estoqueCards-processoinfo">
        <div className="info">
          <span>Criado em:</span>
          <span>{data.data.processo_created_date}</span>
        </div>

        <div className="info">
          <span>Criado por:</span>
          <span>Matheus Zenker</span>
        </div>

        <div className="info">
          <span>Placa </span>
          <span>{data.data.car_placa}</span>
        </div>
      </div>

      <div className="estoqueCards-divisao" />

      <div className="estoqueCards-statuspreco">
        <div className="status">
          <span
            style={{
              backgroundColor: verifyStatusColor(data.data.processo_status),
            }}
          >
            {verifyStatus(data.data.processo_status)}
          </span>
        </div>

        <div className="preço">
          <span>{data.data.processo_preco}</span>
        </div>
      </div>
    </div>
  );
};

export default EstoqueCards;
