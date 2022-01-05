import { MapContainer, TileLayer } from "react-leaflet";

function Map(props) {
  return (
    <div className="col-md-10 leaflet-container">
      <MapContainer
        center={props.center}
        zoom={props.zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.markers}
      </MapContainer>
    </div>
  );
}

export default Map;
