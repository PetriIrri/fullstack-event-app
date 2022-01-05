import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function EventDetails(props) {
  const { id } = useParams();
  const [event = {}, setEvent] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      axios.get(`http://localhost:8080/events/${id}`).then((response) => {
        let data = response.data[0];
        console.log(data);
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
        });
        setIsLoaded(true);
      });
    };
    getEvent();
  }, [id]);

  return (
    <div className="col-md-10 ">
      <h1>{event.name ? event.name : "Ladataan"}</h1>
      <h3>{event.shortDescription ? event.shortDescription : ""}</h3>
      <p>{event.fullDescription ? event.fullDescription : ""}</p>
      <p>
        {event.city ? event.city : ""} {event.address ? event.address : ""}
      </p>
      <p>
        {event.startDate && event.endDate
          ? `${event.startDate.getDate()}.${
              event.startDate.getMonth() + 1
            }.${event.startDate.getFullYear()}-
          ${event.endDate.getDate()}.${
              event.endDate.getMonth() + 1
            }.${event.endDate.getFullYear()}`
          : ""}
      </p>
      <p>{event.organizer ? event.organizer : ""}</p>
      <a href={event.url} className="btn btn-primary text-light" role="button">
        Tapahtuman järjestäjän sivut
      </a>
      <br />
      <a href="/" className="btn btn-success text-light" role="button">
        Takaisin etusivulle
      </a>
      {isLoaded ? (
        <MapContainer
          center={[
            event.latitude ? event.latitude : 61.498145583592105,
            event.longitude ? event.longitude : 23.765849800508377,
          ]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              event.latitude ? event.latitude : 1,
              event.longitude ? event.longitude : 1,
            ]}
          ></Marker>
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default EventDetails;
