// src/components/ReviewList.js
import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h3>Reviews</h3>
            {reviews.map((review, index) => (
                <div key={index}>
                    <p>Rating: {review.rating}</p>
                    <p>{review.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
