import React, { useRef, useState } from "react";
import Header from "components/Header";

import { Map, Tilelayer } from "react-leaflet";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css"

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 14.454756, lng: 75.325459 })
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            <Header title="React Leaflet Map Example" />
            <div className="row">
                <div className="col text-center">
                    <h2> React-Leaflet - basic</h2>
                    <p>Loading map</p>
                    <div className="col">
                        <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <Tilelayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                         </Map>
                    </div>
                </div>
            </div>
        </>
    );
};