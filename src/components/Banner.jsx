import rating from "./../assets/rating.png";
import rating_half from "./../assets/rating-half.png";
import play_button from "./../assets/play.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = ({ upcomingFilm }) => {
  return (
    <div className="my-container p-0">
      <Carousel
        responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1600}
      >
        {upcomingFilm.length > 0 &&
          upcomingFilm.slice(0, 5).map((data) => {
            return (
              <div
                className="relative min-h-150 overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${data.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="absolute top-0 left-0 flex h-full w-full flex-col-reverse justify-start sm:flex-row sm:items-center">
                  <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-8 py-2 sm:w-1/2 sm:items-start sm:justify-center">
                    <p className="hidden bg-linear-to-r from-red-600 to-white px-5 py-2 sm:block">
                      Film Upcoming
                    </p>{" "}
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                      {data.title}
                    </h2>
                    <div className="flex gap-2">
                      <img src={rating} alt="full-star" className="size-6" />
                      <img src={rating} alt="full-star" className="size-6" />
                      <img src={rating} alt="full-star" className="size-6" />
                      <img src={rating} alt="full-star" className="size-6" />
                      <img
                        src={rating_half}
                        alt="half-star"
                        className="size-6"
                      />
                    </div>
                    <p className="line-clamp-4 hidden  sm:block">
                      {data.overview}
                    </p>
                    <div className="flex gap-4">
                      <button className="min-w-25 cursor-pointer bg-white/20 px-6 py-2 font-medium backdrop-blur-md 
                      transition-all hover:bg-white hover:text-black">
                        Chi tiết
                      </button>
                      <button className="min-w-25 cursor-pointer bg-red-500 px-6 py-2 font-medium transition-opacity 
                      delay-50 duration-300 ease-in hover:opacity-50">
                        Xem phim
                      </button>
                    </div>
                  </div>

                  <div className="flex h-full w-full items-center justify-center px-8 py-5 sm:w-1/2">
                    <div className="group relative h-90 w-62.5 sm:h-100">
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}${data.poster_path}`}
                        alt="poster-film"
                        className="h-full w-full"
                      />
                      <div className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center 
                      opacity-0 backdrop-blur-sm transition-opacity delay-100 duration-1000 ease-in-out group-hover:opacity-100">
                        <img
                          src={play_button}
                          alt="play_button"
                          className="size-45"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};

export default Banner;
