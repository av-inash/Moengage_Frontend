
import React, { useEffect, useState } from 'react';
import PigionMap from './PigionMap';
import './Login.css';

const BreweryDetail = ({ breweryId, onBack }) => {
    const [brewery, setBrewery] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 0, description: '' });

    useEffect(() => {
        const fetchBreweryDetail = async () => {

            const user = JSON.parse(localStorage.getItem("user_322"));

            try {
                const response = await fetch(`https://moengage-two.vercel.app/api/v1/breweries/find-by-id?id=${breweryId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch brewery details');
                }

                const data = await response.json();
                setBrewery(data.data.brewery);
                setReviews(data.data.reviews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBreweryDetail();
    }, [breweryId]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user_322"));

        try {
            const response = await fetch(`https://moengage-two.vercel.app/api/v1/review/addreview?breweryId=${breweryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify({
                    name: user.user.name,
                    rating: reviewData.rating,
                    description: reviewData.description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            const newReview = await response.json();


            const formattedReview = {
                name: user.user.name,
                rating: reviewData.rating,
                description: reviewData.description,
                createdAt: new Date().toISOString(),
            };

            setReviews([...reviews, formattedReview]);
            setReviewData({ rating: 0, description: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=ce6ef24e4775484783594df812af1615&wait_until=page_loaded&url=${brewery.website_url}`;
    const placeholderImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLQ65XRg3nHrl6W85XHCaGdI22w1KrTMTCg&s';
    const handleImageError = (event) => {
        event.target.src = placeholderImageUrl;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="detail">
                <button onClick={onBack}>Back</button>
                <h1>{brewery.name}</h1>
                <img
                    src={screenshotUrl}
                    alt={`${brewery.name} website screenshot`}
                    style={{ width: '100%', height: 'auto' }}
                    onError={handleImageError}
                />
                <p>Type: {brewery.brewery_type}</p>
                <p>Address: {brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}</p>
                <p>Country: {brewery.country}</p>
                <p>Phone: {brewery.phone}</p>
                {brewery.website_url && <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>}
            </div>
            <PigionMap data={brewery} />
            <div className="reviews">
                <h2>Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p><strong>{review.name}</strong> ({review.rating}/5)</p>
                        <p>{review.description}</p>
                        <p><em>{formatDate(review.createdAt)}</em></p>
                    </div>
                ))}
                <h3>Post a Review</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleReviewSubmit}>
                    <div>
                        <label>Rating</label>
                        <input type="number" name="rating" value={reviewData.rating} onChange={handleReviewChange} min="1" max="5" required />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" value={reviewData.description} onChange={handleReviewChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BreweryDetail;

