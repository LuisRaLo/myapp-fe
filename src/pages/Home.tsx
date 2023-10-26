import { Fragment } from "react";
import BackgroundComponent from "../components/BackgroundComponent";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Fragment>
      <BackgroundComponent pageTitle="Bienvenido">
          <Typography>
            Bienvenido a la aplicación de itinerarios,
            por favor selecciona una opción del menú.
          </Typography>
      </BackgroundComponent>
    </Fragment>
  );
};

export default HomePage;
