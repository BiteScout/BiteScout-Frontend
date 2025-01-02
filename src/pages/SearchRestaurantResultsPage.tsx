import {ChangeEvent, useEffect, useState} from "react";
import {restaurant} from "../services/RestaurantFunctions.tsx";
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useNavigate, useParams} from "react-router-dom";


const SearchRestaurantResultsPage = () => {
    const [restaurants, setRestaurants] = useState<restaurant[]>([]);
    const {handleSearchRestaurants, handleGetAllCuisineTypes, handleSearchRestaurantsByPriceRange, handleSearchRestaurantsByCuisine} = useRestaurantActions();
    const {restaurantNameQuery} = useParams<{restaurantNameQuery:string}>();
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [cuisineSelected, setCuisineSelected] = useState<number>(0);
    const [cuisineValue, setCuisineValue] = useState<string>("");
    const[priceRange, setPriceRange] = useState<string>("");
    const [priceRangeSelected, setPriceRangeSelected] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        const response = handleSearchRestaurants(restaurantNameQuery === undefined ? "" : restaurantNameQuery);
        response.then((data) => {
            if (data !== undefined){
                setRestaurants(data);
            }
        })
        const cuisineResponse = handleGetAllCuisineTypes();
        cuisineResponse.then((data) => {
            if (data !== undefined) {
                setCuisines(data);
            }
        })
    }, [restaurantNameQuery])

    useEffect(() => {
        const fetchCuisine = async () => {
            const response = await handleSearchRestaurantsByCuisine(cuisineValue);
            if (response !== undefined){
                setRestaurants(response);
            }
        }
        if( cuisineSelected !== 0){
            fetchCuisine();
        }
    }, [cuisineSelected]);

    useEffect(() => {
        const fetchPriceRange = async () => {
            const response = await handleSearchRestaurantsByPriceRange(priceRange);
            if (response !== undefined){
                setRestaurants(response);
            }
        }
        if( priceRangeSelected !== 0){
            fetchPriceRange();
        }
    }, [priceRangeSelected]);

    return (
        <div>
            <div className="input-group">
                <label htmlFor={"cuisine"}> Select Cuisine Type:
                    <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setCuisineValue(e.target.value);
                        setCuisineSelected(cuisineSelected + 1);
                    }}>
                        <option value="">Select Cuisines</option>
                        {cuisines.map((cuisine, index) => (
                            <option value={cuisine} key={index}>{cuisine}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor={"priceRange"}>Select Price Range:
                    <select onChange={(e) => {
                        setPriceRange(e.target.value);
                        setPriceRangeSelected(priceRangeSelected + 1);
                    }}>
                        <option value="">Select Price Range</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </label>
            </div>
            <div className="restaurant-list">
                {restaurants.map((restaurant, index) => (
                    <a key={index} onClick={() => navigate("/restaurantPage/" + restaurant.id)}>
                        <div className="restaurant-card" key={index}>
                            <img
                                /*src={restaurant.image}*/
                                alt={restaurant.name}
                                className="restaurant-image"
                            />
                            <div className="restaurant-name">{restaurant.name}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )

}

export default SearchRestaurantResultsPage;