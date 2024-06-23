
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BreweryCard from './BreweryCard';
import BreweryDetail from './BreweryDetail';

const BreweryPage = () => {
    const [breweries, setBreweries] = useState([]);
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('city');

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const response = await axios.get('https://moengage-two.vercel.app/api/v1/breweries/all');
                setBreweries(response.data.data);
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

    const handleSearch = async () => {
        const user = JSON.parse(localStorage.getItem("user_322"));

        try {
            const response = await axios.get(`https://moengage-two.vercel.app/api/v1/breweries/search?${searchCategory}=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                },
            });
            setBreweries(response.data.data);
        } catch (error) {
            console.error('Error searching breweries:', error);
        }
    };

    return (
        <div className="App" style={{
            backgroundColor: "rgb(33 1 1 / 10%)", paddingTop: '8rem'
        }}>
            <div className="search-filters">
                <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="city">City</option>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                </select>
                <input
                    type="text"
                    style={{ outline: "none" }
                    }
                    placeholder={`Search by ${searchCategory}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {selectedBrewery ? (
                <BreweryDetail breweryId={selectedBrewery.id} onBack={handleBackClick} />
            ) : (
                <div className="card-list">
                    {breweries.map(brewery => (
                        <BreweryCard key={brewery.id} brewery={brewery} onClick={() => handleCardClick(brewery)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BreweryPage;

