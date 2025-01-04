import { ChangeEvent, useEffect, useState } from "react";
import { restaurant } from "../services/RestaurantFunctions.tsx";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/SearchRestaurantResultPage.css";
import defaultImage from "../assets/restaurant-icon.png";

const SearchRestaurantResultsPage = () => {
    const [restaurants, setRestaurants] = useState<restaurant[]>([]);
    const [restaurantImages, setRestaurantImages] = useState<{ [key: string]: string }>({});
    const { handleSearchRestaurants, handleGetAllCuisineTypes, handleSearchRestaurantsByPriceRange, handleSearchRestaurantsByCuisine, handleGetRestaurantPictures } = useRestaurantActions();
    const { restaurantNameQuery } = useParams<{ restaurantNameQuery: string }>();
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [cuisineSelected, setCuisineSelected] = useState<number>(0);
    const [cuisineValue, setCuisineValue] = useState<string>("");
    const [priceRange, setPriceRange] = useState<string>("");
    const [priceRangeSelected, setPriceRangeSelected] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const response = handleSearchRestaurants(restaurantNameQuery === undefined ? "" : restaurantNameQuery);
        response.then((data) => {
            if (data !== undefined) {
                setRestaurants(data);
            }
        });
        const cuisineResponse = handleGetAllCuisineTypes();
        cuisineResponse.then((data) => {
            if (data !== undefined) {
                setCuisines(data);
            }
        });
    }, []);

    useEffect(() => {
        const fetchCuisine = async () => {
            const response = await handleSearchRestaurantsByCuisine(cuisineValue);
            if (response !== undefined) {
                setRestaurants(response);
            }
        };
        if (cuisineSelected !== 0) {
            fetchCuisine();
        }
    }, [cuisineSelected]);

    useEffect(() => {
        const fetchPriceRange = async () => {
            const response = await handleSearchRestaurantsByPriceRange(priceRange);
            if (response !== undefined) {
                setRestaurants(response);
            }
        };
        if (priceRangeSelected !== 0) {
            fetchPriceRange();
        }
    }, [priceRangeSelected]);

    // New useEffect to fetch and set restaurant images
    useEffect(() => {
        const fetchRestaurantImages = async () => {
            const images: { [key: string]: string } = {};

            await Promise.all(
                restaurants.map(async (restaurant) => {
                    const pictures = await handleGetRestaurantPictures(restaurant.id);
                    if (pictures && pictures.length > 0) {
                        images[restaurant.id] = pictures[0];
                    }
                })
            );

            setRestaurantImages(images);
        };

        if (restaurants.length > 0) {
            fetchRestaurantImages();
        }
    }, [restaurants]);

    return (
        <div>
            <div className="input-group">
                <label htmlFor="cuisine">
                    Select Cuisine Type:
                    <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setCuisineValue(e.target.value);
                            setCuisineSelected(cuisineSelected + 1);
                        }}
                    >
                        <option value="">Select Cuisines</option>
                        {cuisines.map((cuisine, index) => (
                            <option value={cuisine} key={index}>
                                {cuisine}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="priceRange">
                    Select Price Range:
                    <select
                        onChange={(e) => {
                            setPriceRange(e.target.value);
                            setPriceRangeSelected(priceRangeSelected + 1);
                        }}
                    >
                        <option value="">Select Price Range</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </label>
            </div>
            <div className="restaurant-list2">
                {restaurants.map((restaurant, index) => (
                    <a key={index} onClick={() => navigate("/restaurantPage/" + restaurant.id)}>
                        <div className="restaurant-card2" key={index}>
                            <img
                                src={restaurantImages[restaurant.id] || defaultImage}
                                alt={restaurant.name}
                                className="restaurant-image2"
                            />
                            <div className="restaurant-name2">{restaurant.name}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SearchRestaurantResultsPage;
