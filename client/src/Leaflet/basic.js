import React, { useRef, useState } from "react";
//import Header from "components/Header";
import L from "leaflet";

import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
//import { useRef } from "react";
import "leaflet/dist/leaflet.css";
//import ExternalInfo from "components/ExternalInfo";
//import locations from "./locations.json";
import userGeoLocation from "./userGeoLocation";
// import reports from "./reports.json";
// import { Button, ButtonToolbar } from "react-bootstrap";
// import { AddModal } from "./AddModal";
import AddModal from "./AddModal";
// import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let reports = [];
let locations = [];

fetch("http://localhost:3001/api/reports")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    reports = data;
  })
  .catch((error) => {
    console.error(error);
  });

fetch("http://localhost:3001/api/locations")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    locations = data;
  })
  .catch((error) => {
    console.error(error);
  });

const setNewreports = (data) => {
  reports = data;
  window.location.reload();
};

const markerIcon = new L.Icon({
  iconUrl: require("../resources/images/marker.png"),
  iconSize: [35, 35],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const reportIcon = new L.Icon({
  iconUrl: require("../resources/images/reports.png"),
  iconSize: [20, 20],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const mylocation = new L.Icon({
  iconUrl: require("../resources/images/mylocation.png"),
  iconSize: [20, 20],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const BasicMap = () => {
  const [center, setCenter] = useState({ lat: 40.0077811, lng: -105.2699333 });
  const ZOOM_LEVEL = 17;
  const mapRef = useRef();

  const location = userGeoLocation();

  const showmyLocation = () => {
    if (location.loaded && !location.error) {
      console.log(mapRef.current);
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  return (
    <>
      {/* <Header title="React Leaflet Map Example" />

            <ExternalInfo page="leafletBasic" /> */}

      <div className="row">
        <div className="col text-center">
          <h2>Interact Map for CUB members</h2>
          <p>Their safey, your safety, my safety </p>
          <div className="col">
            <MapContainer
              style={mapStyle}
              center={center}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
            >
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              {location.loaded && !location.error && (
                <Marker
                  icon={mylocation}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}
              {locations.map((location, idx) => (
                <Marker
                  position={[location.lat, location.lng]}
                  icon={markerIcon}
                  key={idx}
                >
                  <Popup>
                    <b>{location.Building}</b>
                  </Popup>
                </Marker>
              ))}
              {reports.map((r_location, r_idx) => (
                <Marker
                  position={[r_location.lat, r_location.lng]}
                  icon={reportIcon}
                  key={r_idx}
                >
                  <Popup>
                    <b>{r_location.Road}</b>
                    <br></br>
                    {r_location.report}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="btn_r_form">
        <AddModal
          report={""}
          setNewreports={setNewreports}
          locations={locations}
        />
      </div>

      <div className="mylocation">
        <button onClick={showmyLocation}>My location</button>
      </div>
    </>
  );
};

const mapStyle = {
  height: 690,
};

export default BasicMap;
