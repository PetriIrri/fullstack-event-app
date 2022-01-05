import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import Map from "./components/Map";

import { fetchAll } from "./api/EventApi";

function Home(props) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      let newMarkers = [];
      let response = await fetchAll();
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
    };
    getEvents();
  }, []);

  return (
    <div className="col-md-10 leaflet-container">
      <h2>EventFin - Tapahtumat suomen kartalla</h2>
      <Map markers={markers} />
    </div>
  );
}

export default Home;
