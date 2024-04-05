import PageTitle from "../components/PageTitle"
import EstoqueCards from "../components/EstoqueCards"
import "../styles/Estoque.css"

const Estoque = () => {

  return (
    <>
      <PageTitle page="Estoque"/>
      
      <div className="estoque-container">
        <div className="estoque-grid-wrapper">
          <div className="estoque-filter-container">
            <button>NOVO PROCESSOSa</button>
          </div>
          <div className="estoque-processos-container">
            <EstoqueCards/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Estoque