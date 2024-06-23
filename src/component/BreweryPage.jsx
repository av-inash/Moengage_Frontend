import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BreweryCard from './BreweryCard';
import BreweryDetail from './BreweryDetail';

const BreweryPage = () => {
    const [breweries, setBreweries] = useState([]);
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const response = await axios.get('https://api.openbrewerydb.org/v1/breweries?per_page=10');
                setBreweries(response.data);
            } catch (error) {
                console.error('Error fetching breweries:', error);
            }
        };

        fetchBreweries();
    }, []);

    const handleCardClick = (brewery) => {
        setSelectedBrewery(brewery);
    };

    const handleBackClick = () => {
        setSelectedBrewery(null);
    };

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Search breweries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {selectedBrewery ? (
                <BreweryDetail brewery={selectedBrewery} onBack={handleBackClick} />
            ) : (
                <div className="card-list">
                    {breweries.map(brewery => (
                        <BreweryCard key={brewery.id} brewery={brewery} onClick={handleCardClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BreweryPage;
