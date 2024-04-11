import PageTitle from "../components/PageTitle";
import "../styles/Dashboard.css";
import { FaUsers } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { useState } from "react";
import UsersDash from "./UsersDash";

const Dashboard = () => {
  const [toggleState, setToggleState] = useState(1);

  return (
    <>
      <PageTitle page={`Painel de Controle`} />
      <div className="dashboard-content">
        <div className="dashboard-left-panel">
          <span
            onClick={() => setToggleState(1)}
            className={toggleState === 1 ? "dashboard-destaque" : ""}
          >
            <FaUsers /> USUÁRIOS
          </span>
          <span
            onClick={() => setToggleState(2)}
            className={toggleState === 2 ? "dashboard-destaque" : ""}
          >
            <BiBuildings /> FILIAIS
          </span>
        </div>
        <div className="dashboard-right-panel">

          <div className="dashboard-panel-content">
            <UsersDash state={toggleState}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
