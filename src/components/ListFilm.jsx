import React, { useState } from "react";
import temp_1 from "./../assets/temp-1.jpeg";
import Carousel from "react-multi-carousel";
import Modal from "react-modal";
import YouTube from "react-youtube";

const responsive = {
  desktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 5,
  },
  landscape: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 537 },
    items: 2,
  },

  mobile_small: {
    breakpoint: { max: 537, min: 320 },
    items: 1,
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const ListFilm = ({ title, dataFilm }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [keyVideo, setKeyVideo] = useState("");

  const handlePosterClick = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setKeyVideo(data.results[0].key);
    setIsOpen(true);
  };
  return (
    <div className="my-container bg-black pt-5 text-white">
      <h2 className="font-bold uppercase">{title}</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        className="flex items-center"
      >
        {dataFilm.length > 0 &&
          dataFilm.map((data) => {
            return (
              <>
                <div
                  key={data.id}
                  className="relative mt-5 mr-2 flex h-87 w-58 cursor-pointer justify-center transition-all duration-300 ease-out hover:-translate-y-3"
                  onClick={() => handlePosterClick(data.id)}
                >
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${data.poster_path}`}
                    alt="pic-film"
                    className="absolute top-0 h-full w-full"
                  />
                  <div className="absolute top-0 left-0 h-full w-full bg-black opacity-30"></div>
                  <p className="text-md absolute bottom-4 font-medium uppercase">
                    {data.title}
                  </p>
                </div>

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => {
                    setIsOpen(false);
                  }}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <YouTube videoId={keyVideo} opts={opts} />
                </Modal>
              </>
            );
          })}
      </Carousel>
    </div>
  );
};

export default ListFilm;
