import React, { useState } from 'react';
import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
    setPosition:  React.Dispatch<React.SetStateAction<{ lat: number;  lng: number}>>
    position : { lat: number; lng: number };
}

const LocationPicker:React.FC<LocationPickerProps> = ({setPosition, position}) => {



    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng); // Set latitude and longitude when the map is clicked
            },
        });
        const map = useMap(); // Accessing the map context using useMap

        // You can use `map` here to change view, center, etc.
        React.useEffect(() => {
            if (map) {
                map.setView([position.lat, position.lng], map.getZoom());
            }
        }, [position.lat, position.lng, map]);


        return position ? <Marker position={position} /> : null;
    };

    return (
        <div>
            <div style={{ height: '400px', marginBottom: '10px' }}>
                <MapContainer
                    center={[position.lat, position.lng]} // Default center
                    zoom={8}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
            <form>
                <label>
                    Latitude:
                    <input
                        type="text"
                        value={position ? position.lat : ''}
                        readOnly
                    />
                </label>
                <br />
                <label>
                    Longitude:
                    <input
                        type="text"
                        value={position ? position.lng : ''}
                        readOnly
                    />
                </label>
            </form>
        </div>
    );
};

export default LocationPicker;
