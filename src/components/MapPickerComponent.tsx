import { useState } from "react";

import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: -12.0257733, lng: -77.3174537 };
const DefaultZoom = 7;

const MapPickerComponent = () => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  return (
    <>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />

      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: "400px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        /* apiKey= "AIzaSyBT2as0dBo-sz4iK1C9ppXoFiTevAPWrdQ------" */
      />
    </>
  );
};

export default MapPickerComponent;
