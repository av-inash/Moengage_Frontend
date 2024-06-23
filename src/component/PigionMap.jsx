import React from "react";
import { Map, Marker } from "pigeon-maps";

export default function MyMap({ data }) {
    const add = [Math.abs(data.longitude), Math.abs(data.latitude)];
    console.log(add);
    return (
        <Map height={350} defaultCenter={add} defaultZoom={5}>
            <Marker width={30} anchor={add} />
        </Map>
    );
}