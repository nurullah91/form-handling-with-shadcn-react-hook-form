import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import React from "react";

interface RatingViewerProps {
  rating: number;
}

const RatingViewer: React.FC<RatingViewerProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); // Get the number of fully filled stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if we need a half-filled star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining stars will be empty

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar className="text-[#FF9D00] text-2xl" key={`full-${i}`} />
    );
  }

  // Add half star
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt className="text-[#FF9D00] text-2xl" key="half" />
    );
  }

  // Add empty stars (using a filled star with lower opacity to simulate empty)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        className="text-[#FF9D00] text-2xl"
        key={`empty-${i}`}
        style={{ opacity: 0.3 }}
      />
    );
  }

  return <div className="flex items-center gap-2">{stars}</div>;
};

export default RatingViewer;
