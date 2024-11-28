import { Flex, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoUrl, name }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  const handleVideoLoaded = () => {
    setLoading(false); // Hide spinner when the video is loaded
  };

  return (
    <Flex
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={{ md: "20px", lg: "30px" }}
      id={name}
    >
      <Text
        border={"2px solid #fac913"}
        px={"2vw"}
        py={"1vh"}
        my={"2vh"}
        rounded={"full"}
        fontFamily={"montserrat"}
      >
        {name}
      </Text>

      {/* Spinner or Video */}
      {loading && (
        <Spinner
          size="xl"
          mt={"2vh"}
          thickness="4px"
          color="#fac913"
          emptyColor="gray.200"
          speed="0.65s"
        />
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        onCanPlayThrough={handleVideoLoaded} // Triggered when video can play
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          display: loading ? "none" : "block", // Hide video while loading
        }}
      />
    </Flex>
  );
};

export default VideoPlayer;
