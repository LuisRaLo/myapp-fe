import { useParams } from "react-router-dom";
import BackgroundComponent from "../components/BackgroundComponent";
import { Divider, Typography } from "@mui/material";
import ListItineraryComponent from "../components/ListItineraryComponent";
import useItinerary from "../hooks/useItinerary";

export default function ItineraryPage() {
  const params = useParams();
  const { itineraryType } = useItinerary(parseInt(params.id));

  return (
    <BackgroundComponent pageTitle="Itinerary">
      <Typography variant="h6" noWrap component="div">
        Itinerary {itineraryType}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <ListItineraryComponent type={parseInt(params.id)} />
    </BackgroundComponent>
  );
}
