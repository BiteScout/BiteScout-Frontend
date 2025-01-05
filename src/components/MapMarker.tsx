import React from "react";
import {Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";

interface MapMarkerProps {
    latitude: number;
    longitude: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({latitude, longitude}) => {
    const map = useMap(); // Accessing the map context using useMap

    // You can use `map` here to change view, center, etc.
    React.useEffect(() => {
        if (map) {
            map.setView([latitude, longitude], map.getZoom());
        }
    }, [latitude, longitude, map]);

    const clickedLocationIcon = new L.Icon({
        iconUrl: "./clicked-location.png", // Use your custom PNG or SVG icon
        iconSize: [48, 48], // Adjust the size based on your icon
        iconAnchor: [24, 48], // Anchor point for accurate positioning
        popupAnchor: [0, -48], // Adjust popup position
    });
    

    return (
        <Marker position={[latitude, longitude]}
        icon={clickedLocationIcon}>
            <Popup>
                Location
            </Popup>
        </Marker>
    );
};

export default MapMarker;
