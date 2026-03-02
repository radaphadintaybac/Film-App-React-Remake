import { useEffect, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ListFilm from "./components/ListFilm";

function App() {
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const fetchApiData = async () => {
    try {
      const url = [
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        "https://api.themoviedb.org/3/movie/popular",

      ];

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchPromises = url.map((url) =>
        fetch(url, options).then((response) => {
          if (!response.ok) {
            console.log("Error: ", response.status);
            return;
          }
          return response.json();
        }),
      );

      const responses = await Promise.all(fetchPromises);

      const [data1, data2] = responses;
      // const response = await fetch(url1, options);
      // if (!response.ok) {
      //   console.log("Error: ", response.status);
      //   return;
      // }

      // const data = await response.json();
      setUpcoming(data1.results);
      setPopular(data2.results);
      console.log(data2.results)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <div className="text-white">
      <Header></Header>
      <Banner upcomingFilm={upcoming}></Banner>
      <ListFilm title={"Popular"} dataFilm={popular}></ListFilm>
      {/* <ListFilm title={"Top Rate"}></ListFilm> */}
    </div>
  );
}

export default App;
