import React, { useRef, useState } from 'react';
//import Header from "components/Header";

import { Map, MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
//import { useRef } from "react";
import "leaflet/dist/leaflet.css";
//import ExternalInfo from "components/ExternalInfo";

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 40.0150, lng: -105.2705 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

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
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStyle = {
    height: 700

}

export default BasicMap;
