import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EventDetails(props) {
  const { id } = useParams();
  const [event = {}, setEvent] = useState([]);

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
          startDate: data.start_date,
          endDate: data.end_date,
          address: data.address,
          city: data.city,
          tags: data.tags,
        });
      });
    };
    getEvent();
  }, [id]);

  return (
    <div className="col-md-10 ">
      <h1>{event.name ? event.name : "Ladataan"}</h1>
      <p>{event.shortDescription ? event.shortDescription : ""}</p>
      <p>{event.fullDescription ? event.fullDescription : ""}</p>
      <p>{event.city ? event.city : ""}</p>
      <p>{event.address ? event.address : ""}</p>
      <p>{event.startDate ? event.startDate : ""}</p>
      <p>{event.endDate ? event.endDate : ""}</p>
      <p>{event.organizer ? event.organizer : ""}</p>
      <a href={event.url} className="btn btn-primary text-light" role="button">
        Järjestäjän sivut
      </a>
    </div>
  );
}

export default EventDetails;
