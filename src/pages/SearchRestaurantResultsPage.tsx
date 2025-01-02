import {useEffect, useState} from "react";
import {restaurant} from "../services/RestaurantFunctions.tsx";
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useNavigate, useParams} from "react-router-dom";


const SearchRestaurantResultsPage = () => {
    const [restaurants, setRestaurants] = useState<restaurant[]>([]);
    const {handleSearchRestaurants} = useRestaurantActions();
    const {restaurantNameQuery} = useParams<{restaurantNameQuery:string}>();
    const navigate = useNavigate();
    useEffect(() => {
        const response = handleSearchRestaurants(restaurantNameQuery === undefined ? "" : restaurantNameQuery);
        response.then((data) => {
            if (data !== undefined){
                setRestaurants(data);
            }
        })
    }, [restaurantNameQuery]);

    return (
    <div>
        {restaurants.map((restaurant, index) => (
            <a key={index} onClick={() => navigate("/restaurantPage/"+restaurant.id)}>
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
    )

}

export default SearchRestaurantResultsPage;