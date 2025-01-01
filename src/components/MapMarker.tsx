import React from "react";
import {Marker, Popup, useMap} from "react-leaflet";

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


    return (
        <Marker position={[latitude, longitude]}>
            <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
        </Marker>
    );
};

export default MapMarker;
