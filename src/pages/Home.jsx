import { useContext } from "react";
import PageTitle from "../components/PageTitle";
import { AuthContext } from "../Context/AuthContext.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);

  const setWelcomeMessage = () => {
    const currentdate = new Date();

    if ((currentdate.getHours() >= 6) & (currentdate.getHours() <= 12)) {
      return "Bom dia, ";
    } else if (
      (currentdate.getHours() >= 13) &
      (currentdate.getHours() <= 18)
    ) {
      return "Boa Tarde, ";
    } else {
      return "Boa Noite, ";
    }
  };

  return (
    <PageTitle
      page={`${setWelcomeMessage()} ${user.name} ${user.sobrenome}!`}
    />
  );
};

export default Home;
