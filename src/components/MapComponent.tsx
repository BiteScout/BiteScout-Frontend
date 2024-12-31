import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({latitude, longitude}) => {
    return (
        <MapContainer center={[latitude, longitude]} zoom={2} scrollWheelZoom={false}
                      style={{height: "440px", width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
