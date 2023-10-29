import { Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";

type Props = {
  location: { lat: number; lng: number };
  handleChangeLocation: (lat: number, lng: number) => void;
};

const MapPickerComponent = (props: Props) => {
  const DefaultZoom = 7;

  const { location, handleChangeLocation } = props;
  const [isShowMap, setIsShowMap] = useState(false);
  const [zoom, setZoom] = useState(DefaultZoom);

  useEffect(() => {
    if (location.lat !== 0 && location.lng !== 0) {
      setIsShowMap(true);
    }
  }, [location]);

  if (!isShowMap) return <div></div>;

  return (
    <Fragment>
      <Typography variant="subtitle2" noWrap component="div">
        Map Picker {JSON.stringify(location)}
      </Typography>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />

      <MapPicker
        defaultLocation={location}
        zoom={zoom}
        style={{ height: "400px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={setZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        /* apiKey= "AIzaSyBT2as0dBo-sz4iK1C9ppXoFiTevAPWrdQ------" */
      />
    </Fragment>
  );
};

export default MapPickerComponent;
