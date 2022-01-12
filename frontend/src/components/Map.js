import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
require("react-leaflet-markercluster/dist/styles.min.css");

function Map(props) {
  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>{props.markers}</MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
