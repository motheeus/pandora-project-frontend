import PageTitle from "../components/PageTitle";
import EstoqueCards from "../components/EstoqueCards";
import "../styles/Estoque.css";
import Modal from "../components/Modal";
import { useState } from "react";

const Estoque = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <PageTitle page="Estoque" />

      <div className="estoque-container">
        <div className="estoque-grid-wrapper">
          <div className="estoque-filter-container">
            <button onClick={() => setOpenModal(!openModal)}>
              NOVO PROCESSO
            </button>
          </div>
          <div className="estoque-processos-container">
            <EstoqueCards />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        height="600px"
        width="900px"
      >

      </Modal>
    </>
  );
};

export default Estoque;
