/**
 * Module for frontend to show an events details.
 * @module src/EventDetails
 * @author Petri Irri
 * @requires react
 * @requires react-router-dom
 * @requires react-leaflet
 * @requires module:src/api/EventApi
 * @requires src/components/Map
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Marker } from "react-leaflet";
import { fetchById } from "./api/EventApi";
import Map from "./components/Map";

/**
 * Component for creating a page with events details
 * and a link to organizers website.
 * @author Petri Irri
 * @namespace EventDetails
 * @property {number} id - Id of the event. Received from url params.
 * @property {object} event - UseState object that has the event data.
 * @property {boolean} isLoaded - UseState boolean that is used to check if page has loaded.
 * @component
 * @example
 * return (<EventDetails />)
 */
function EventDetails(props) {
  const { id } = useParams();
  const [event = {}, setEvent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Function to be run when EventDetails has been mounted
   * and when const id is updated. Uses module:src/api/EventApi function
   * fetchById to fetch events data by id.
   * @function useEffect
   * @memberof module:src/EventDetails~EventDetails
   */
  useEffect(() => {
    const getEvent = async () => {
      let response = await fetchById(id);
      let data = response.data[0];
      setEvent({
        name: data.event_name,
        organizer: data.event_organizer,
        url: data.event_url,
        shortDescription: data.short_description,
        fullDescription: data.full_description,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        address: data.address,
        city: data.city,
        tags: data.tags,
        latitude: data.latitude,
        longitude: data.longitude,
        marker: <Marker position={[data.latitude, data.longitude]}></Marker>,
        center: [data.latitude, data.longitude],
      });
      setIsLoaded(true);
    };
    getEvent();
  }, [id]);

  return (
    <div className="col-md-10 ">
      <h1>{event.name ? event.name : "Ladataan"}</h1>
      <h3>{event.shortDescription ? event.shortDescription : ""}</h3>
      <p>{event.fullDescription ? event.fullDescription : ""}</p>
      <p>
        Missä: {event.city ? event.city : ""},{" "}
        {event.address ? event.address : ""}
      </p>
      <p>
        Milloin:
        {event.startDate && event.endDate
          ? ` ${event.startDate.getDate()}.${
              event.startDate.getMonth() + 1
            }.${event.startDate.getFullYear()}-
          ${event.endDate.getDate()}.${
              event.endDate.getMonth() + 1
            }.${event.endDate.getFullYear()}`
          : ""}
      </p>
      <p>Järjestäjä: {event.organizer ? event.organizer : ""}</p>
      <a
        href={event.url ? event.url : "/error"}
        className="btn btn-primary text-light details-button"
        role="button"
      >
        Tapahtumanjärjestäjän sivut
      </a>
      <br />
      <a
        href="/"
        className="btn btn-success text-light details-button"
        role="button"
      >
        Takaisin etusivulle
      </a>
      {isLoaded ? (
        <Map markers={event.marker} center={event.center} zoom="15" />
      ) : (
        ""
      )}
    </div>
  );
}

export default EventDetails;
