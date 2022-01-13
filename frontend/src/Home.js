/**
 * Module for frontend to show home page.
 * @module src/Home
 * @author Petri Irri
 * @requires react
 * @requires react-leaflet
 * @requires module:src/api/EventApi
 * @requires src/components/Map
 */

import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import Map from "./components/Map";
import { fetchAll } from "./api/EventApi";

/**
 * Component for creating a page with a leaflet Map
 * and markers with popups.
 * @namespace Home
 * @property {Array} markers - UseState array for markers to populate map with.
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
function Home(props) {
  const [markers, setMarkers] = useState([]);

  /**
   * Function to be run when EventDetails has been mounted.
   * Uses module:src/api/EventApi function fetchAll to fetch data of all events
   * @function useEffect
   * @memberof module:src/Home~Home
   */
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
      <Map
        markers={markers}
        center={[62.99519982629759, 27.01100005601157]}
        zoom="6"
      />
    </div>
  );
}

export default Home;
