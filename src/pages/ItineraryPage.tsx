import { useParams } from "react-router-dom";
import BackgroundComponent from "../components/BackgroundComponent";
import { Button, Divider, Typography } from "@mui/material";
import ListItineraryComponent from "../components/ListItineraryComponent";
import useItinerary from "../hooks/useItinerary";
import { Fragment, useState } from "react";
import ModalUpdateItinerary from "../components/ModalUpdateItinerary";
import ModalAddItinerary from "../components/ModalAddItinerary";
import IItinerary from "../utils/interfaces/IItinerary";

export default function ItineraryPage() {
  const params = useParams();
  const { itineraryType, itinerary } = useItinerary(parseInt(params.id));
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [itinerarySelected, setItinerarySelected] = useState<IItinerary>({
    id: -1,
    name: "",
    description: "",
    location: { lat: -12.054084888416659, lng: 77.14628445568849 },
    pathImage: "",
  });

  return (
    <Fragment>
      <BackgroundComponent pageTitle="Itinerary">
        <Typography variant="h6" noWrap component="div">
          Itinerary {itineraryType}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
          sx={{ mb: 3 }}
        >
          <Typography variant="inherit" noWrap component="div">
            Add Itinerary
          </Typography>
        </Button>

        <ListItineraryComponent
          type={parseInt(params.id)}
          handleOpenUpdate={() => setOpenUpdate(true)}
          handleOpenDelete={() => setOpenDelete(true)}
          handleSetItinerarySelected={(itineraryId: IItinerary) =>
            setItinerarySelected(itineraryId)
          }
        />

        <Divider sx={{ my: 3 }} />
      </BackgroundComponent>

      {itinerarySelected !== undefined && (
        <ModalUpdateItinerary
          type={itineraryType}
          open={openUpdate}
          itinerarySelected={itinerarySelected}
          handleClose={() => setOpenUpdate(false)}
        />
      )}

      <ModalAddItinerary
        open={openAdd}
        type={itineraryType}
        handleClose={() => setOpenAdd(false)}
        itinerarySelected={itinerarySelected}
        itineraryData={itinerary}
      />
    </Fragment>
  );
}
