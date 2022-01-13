import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
require("react-leaflet-markercluster/dist/styles.min.css");

/**
 * Component for creating leaflet map with markers.
 * @author Petri Irri
 * @requires react-leaflet
 * @requires react-leaflet-markercluster
 * @param {number} props.center - Center location of the map.
 * @param {number} props.zoom - Zoom level of the map.
 * @param {Array} props.markers - Array that has marker elements inside.
 * @component
 * @example
 * <Map
 * markers={<Marker
 * position=[62.1, 25.1]
 * key={1}>
 * </Marker>}
 * center={[62.99519982629759, 27.01100005601157]}
 * zoom="6"
 * />
 */
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
