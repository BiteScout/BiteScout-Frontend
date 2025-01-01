import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapMarker from "./MapMarker.tsx";

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({latitude, longitude}) => {
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}
                      style={{height: '400px', width: '400px'}}>
            <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker latitude={latitude} longitude={longitude}/>
        </MapContainer>
    );
};

export default MapComponent;
