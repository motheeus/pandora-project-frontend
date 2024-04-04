import React from 'react'
import "../styles/EstoqueCards.css"
import placeholder from "../assets/placeholder.jpg"

const EstoqueCards = () => {
  return (
    <div className='estoqueCards-container'>
        <div className="estoqueCards-id">
            #0010
        </div>
        <div className="estoqueCards-imgemarca">
            <img src={placeholder} alt="" />
            <div className="estoqueCards-marcamodelo">
                <span>HONDA CIVIC</span>
                <span>2.0 16v FLEXONE EXL</span>
            </div>
        </div>

        <div className="estoqueCards-divisao"/>

        <div className="estoqueCards-carinfo">
            
                    <div className="info">
                        <span>Motor</span>
                        <span>2.0 16v FLEXONE</span>
                    </div>
            
                    <div className="info">
                        <span>Versao</span>
                        <span>EXL</span>
                    </div>
            
                    <div className="info">
                        <span>Carroceria</span>
                        <span>Sedã - 4 Portas</span>
                    </div>
            
                    <div className="info">
                        <span>Ano (M/F)</span>
                        <span>2021/2020</span>
                    </div>
        </div>

        <div className="estoqueCards-divisao"/>

        <div className="estoqueCards-processoinfo">

            <div className="info">
                <span>Criado em:</span>
                <span>24/03/2024 10:54</span>
            </div>

            <div className="info">
                <span>Criado por:</span>
                <span>Matheus Zenker</span>
            </div>

            <div className="info">
                <span>Placa </span>
                <span>IBG-8281</span>
            </div>

        </div>

        <div className="estoqueCards-divisao"/>

        <div className="estoqueCards-statuspreco">
            <div className="status">
                    <span>EM VENDA</span>
                </div>

                <div className="preço">
                    <span>R$121.000</span>
                </div>
        </div>

    </div>
  )
}

export default EstoqueCards