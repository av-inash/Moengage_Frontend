
import React from 'react';

const BreweryCard = ({ brewery, onClick }) => {
    const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=ce6ef24e4775484783594df812af1615&wait_until=page_loaded&url=${brewery.website_url}`;

    return (
        <div className="card" onClick={() => onClick(brewery)}>
            <h2>{brewery.name}</h2>
            <img src={screenshotUrl} alt={`${brewery.name} website screenshot`} style={{ width: '100%', height: 'auto' }} />
            <p>Longitude: {brewery.longitude}, Latitude: {brewery.latitude}</p>
            <p>{brewery.brewery_type} brewery</p>
        </div>
    );
};

export default BreweryCard;
