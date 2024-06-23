import React from 'react';
import PigionMap from './PigionMap'
const BreweryDetail = ({ brewery, onBack }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div className="detail">
                <button onClick={onBack}>Back</button>
                <h1>{brewery.name}</h1>
                <p>Type: {brewery.brewery_type}</p>
                <p>Address: {brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}</p>
                <p>Country: {brewery.country}</p>
                <p>Phone: {brewery.phone}</p>
                {brewery.website_url && <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>}
            </div>
            <PigionMap data={brewery} />
        </div>
    );
};

export default BreweryDetail;
