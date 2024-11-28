import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const FixedStarRating = ({ rating, totalStars = 5 }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Icon
          key={index}
          as={FaStar}
          color={index < rating ? "#fac913" : "#000000"}
          boxSize={4}
        />
      ))}
    </Box>
  );
};

export default FixedStarRating;
