import React, {useEffect, useState} from "react";
import {offer} from "../services/RestaurantFunctions.tsx";
import "../styles/OffersPage.css"
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";

interface OfferListProps {
    restaurantId:string;
}

const OfferList:React.FC<OfferListProps> = ({restaurantId}) => {
    const [offers, setOffers] = useState<offer[]>([]);
    const {handleFetchOffersForRestaurant} = useRestaurantActions();

    useEffect(() => {
        const offers = handleFetchOffersForRestaurant(restaurantId);
        offers.then((data) => {
            if (data !==undefined)
                setOffers(data);
        })
    }, []);

    return (
        <div className="restaurant-details">
            <h1>Offers: </h1>
            <div className="offer-list">
                {offers.slice(0,offers.length >= 5? 5: offers.length).map((offer) => (
                    <div key={offer.id} className="offer-card">
                        <>
                            <h2>{offer.title}</h2>
                            <p>{offer.description}</p>
                        </>
                    </div>
                ))}
            </div>
        </div>
            )
            }
            export default OfferList