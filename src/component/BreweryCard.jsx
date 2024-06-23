
import React from 'react';

const BreweryCard = ({ brewery, onClick }) => {
    const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=ce6ef24e4775484783594df812af1615&wait_until=page_loaded&url=${brewery.website_url}`;
    const placeholderImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLQ65XRg3nHrl6W85XHCaGdI22w1KrTMTCg&s';

    const handleImageError = (event) => {
        event.target.src = placeholderImageUrl;
    };
    return (
        <div className="card" onClick={() => onClick(brewery)}>
            <h2>{brewery.name}</h2>

            <img
                src={screenshotUrl}
                alt={`${brewery.name} website screenshot`}
                style={{ width: '100%', height: 'auto' }}
                onError={handleImageError}
            />

            <p>{brewery.city}</p>
            <p>{brewery.brewery_type} brewery</p>
            <p>phone:{brewery.phone}</p>
        </div>
    );
};

export default BreweryCard;
