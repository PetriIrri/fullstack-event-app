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
          const startDate = new Date(response.data[i].start_date);
          const endDate = new Date(response.data[i].end_date);
          // Format dates for the popup
          let dates = `${startDate.getDate()}.${
            startDate.getMonth() + 1
          }.${startDate.getFullYear()}-
          ${endDate.getDate()}.${
            endDate.getMonth() + 1
          }.${endDate.getFullYear()}`;
          // Create markers for the events.
          newMarkers.push(
            <Marker
              position={[response.data[i].latitude, response.data[i].longitude]}
              key={response.data[i].id}
            >
              <Popup>
                <h4>{response.data[i].event_name}</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {response.data[i].short_description}
                  </li>
                  <li className="list-group-item">{dates}</li>
                  <li className="list-group-item">
                    <a
                      href={"/event/" + response.data[i].id}
                      className="btn btn-primary text-light"
                      role="button"
                    >
                      Lisätietoa
                    </a>
                  </li>
                </ul>
              </Popup>
            </Marker>
          );
        }
        setMarkers(newMarkers);
      });
    };
    getData();
  }, []);

  return (
    <div className="col-md-10 leaflet-container">
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
