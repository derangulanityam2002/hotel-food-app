import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("/api/hotels") // Fetch both hotels and foods
      .then((response) => setHotels(response.data))
      .catch((error) => console.error("Error fetching hotels", error));

    axios
      .get("/api/foods")
      .then((response) => setFoods(response.data))
      .catch((error) => console.error("Error fetching foods", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <h1>Search Hotels and Foods</h1>
      <input type="text" placeholder="Search..." onChange={handleSearch} />

      <h2>Hotels</h2>
      <ul>
        {filteredHotels.map((hotel) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>

      <h2>Foods</h2>
      <ul>
        {filteredFoods.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
