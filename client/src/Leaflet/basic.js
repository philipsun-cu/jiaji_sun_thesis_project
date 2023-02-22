import React, { useRef, useState } from 'react';
//import Header from "components/Header";
import L from "leaflet";

import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
//import { useRef } from "react";
import "leaflet/dist/leaflet.css";
//import ExternalInfo from "components/ExternalInfo";
import locations from "./locations.json";
import userGeoLocation from "./userGeoLocation";

<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />


const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/marker.png"),
    iconSize: [40, 40],
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
        if ( location.loaded && !location.error){
            console.log(mapRef.current)
            mapRef.current.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM_LEVEL,
                {animate: true}
            );
        }else{
            alert(location.error.message)
        }
    }


    return (
        <>
            {/* <Header title="React Leaflet Map Example" />

            <ExternalInfo page="leafletBasic" /> */}

            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Basic Openstreet Maps</h2>
                    <p>Loading basic map using layer from maptiler</p>
                    <div className="col">
                        <MapContainer style={mapStyle} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                            {location.loaded && !location.error && (
                                <Marker 
                                   icon={mylocation}
                                   position={[
                                        location.coordinates.lat, 
                                        location.coordinates.lng
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
                                        <b>
                                            {location.Building}
                                        </b>
                                    </Popup>
                                </Marker>
                            ))}
                            <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js">
                            L.Routing.control(
                                waypoints: [
                                    L.latLng(50.74, -110.94),
                                    L.latLng(70.6792, -100.949)
                                ]
                                ).addTo(map);
                            </script>
                            {/* L.Routing.control(
                                waypoints: [
                                    L.latLng(50.74, -110.94),
                                    L.latLng(70.6792, -100.949)
                                ]
                                ).addTo(map); */}
                        </MapContainer>
                    </div>
                </div>
            </div>

            <div className='mylocation'>
                <button onClick={showmyLocation}>
                    My location
                </button>
            </div>

        </>
    );
};

const mapStyle = {
    height: 690

}

export default BasicMap;
