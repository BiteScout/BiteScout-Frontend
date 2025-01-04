import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useRestaurantActions } from '../services/RestaurantFunctions';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/NearMe.css"; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

// You can replace this with the actual path to your SVG icon
const restaurantIcon = new L.Icon({
    iconUrl: "../src/assets/restaurant.png", // Replace with your SVG icon URL or path
    iconSize: [48, 48], // Adjust size if needed
    iconAnchor: [16, 32], // Adjust anchor point if needed
    popupAnchor: [0, -32], // Adjust popup position if needed
});

const NearMePage = () => {
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [radius, setRadius] = useState<number>(5); // Default radius in km
    const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]); // Update with your restaurant type

    const { handleFetchNearbyRestaurants } = useRestaurantActions();
    const navigate = useNavigate(); // For navigation

    // Handle location selection on map
    const LocationMarker = () => {
        useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setSelectedLocation({ latitude: lat, longitude: lng });
            },
        });

        return selectedLocation ? (
            <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
                <Popup>Selected Location</Popup>
            </Marker>
        ) : null;
    };

    // Fetch nearby restaurants when location and radius are set
    const handleSearchNearbyRestaurants = async () => {
        if (selectedLocation) {
            const { latitude, longitude } = selectedLocation;
            const data = await handleFetchNearbyRestaurants(latitude, longitude, radius);
            setNearbyRestaurants(data || []);
        }
    };

    // Navigate to Restaurant Page
    const handleNavigateToRestaurant = (restaurantId: string) => {
        navigate(`/restaurantPage/${restaurantId}`);
    };

    return (
        <div className="nearme-page">
            <h2 className="nearme-title">Find Nearby Restaurants</h2>

            {/* Leaflet Map */}
            <div className="map-container">
                <MapContainer center={[40.9906, 29.0274]} zoom={13} className='map'>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />

                    {/* Markers for Nearby Restaurants */}
                    {nearbyRestaurants.map((restaurant: any) => (
                        <Marker
                            key={restaurant.id}
                            position={[restaurant.location.latitude, restaurant.location.longitude]}
                            icon={restaurantIcon} // Using custom restaurant icon
                        >
                            <Popup>
                                <p className='resto-name'>{restaurant.name}</p>
                            <button
                                    className="go-to-restaurant-btn"
                                    onClick={() => handleNavigateToRestaurant(restaurant.id)}
                                >
                                    Go to Restaurant Page
                            </button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Location Information and Radius */}
            <div className="location-info">
                <h3>Selected Location</h3>
                {selectedLocation ? (
                    <p>
                        Latitude: {selectedLocation.latitude}, Longitude: {selectedLocation.longitude}
                    </p>
                ) : (
                    <p>No location selected</p>
                )}

                {/* Radius Selection */}
                <div className="radius-selection">
                    <label htmlFor="radius">Radius (km):</label>
                    <select
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value={50}>50 km</option>
                    </select>
                </div>

                {/* Search Button */}
                <button className="search-btn" onClick={handleSearchNearbyRestaurants}>Find Nearby Restaurants</button>
            </div>

            {/* Display Nearby Restaurants */}
            {nearbyRestaurants.length > 0 && (
                <div className="nearby-restaurants">
                    <h3>Nearby Restaurants</h3>
                    <ul>
                        {nearbyRestaurants.map((restaurant: any) => (
                            <li key={restaurant.id} onClick={() => handleNavigateToRestaurant(restaurant.id)}>
                                {restaurant.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NearMePage;
