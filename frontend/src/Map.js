import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function Map(props) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios.get("http://localhost:8080/events/").then((response) => {
        console.log(response.data);
        let newMarkers = [];
        for (let i = 0; i < response.data.length; i++) {
          newMarkers.push(
            <Marker
              position={[response.data[i].latitude, response.data[i].longitude]}
              key={response.data[i].id}
            >
              <Popup>event id: {response.data[i].id}</Popup>
            </Marker>
          );
        }
        setMarkers(newMarkers);
      });
    };
    getData();
  }, []);

  return (
    <div className="col-md-8 leaflet-container">
      <MapContainer
        center={[61.498145583592105, 23.765849800508377]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
}

export default Map;
