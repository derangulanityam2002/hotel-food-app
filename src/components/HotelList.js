import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelList.css"; // For custom CSS styling

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch hotel data from a mock API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        ); // Use a mock API
        setHotels(response.data.slice(0, 10)); // Take only the first 10 results for simplicity
      } catch (error) {
        console.error("Error fetching hotels", error);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedHotels = [...hotels].sort((a, b) => {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setHotels(sortedHotels);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (hotel) => {
    alert(`Address: Not available\nRating: Not available`); // Mock address and rating
  };

  return (
    <div className="hotel-list">
      <h1>Hotel List</h1>
      <input
        type="text"
        placeholder="Search hotels..."
        onChange={handleSearch}
        className="search-input"
      />
      <div className="sort-buttons">
        <button onClick={() => handleSort("asc")}>Sort Asc</button>
        <button onClick={() => handleSort("desc")}>Sort Desc</button>
      </div>

      <div className="card-container">
        {filteredHotels.map((hotel) => (
          <div
            className="hotel-card"
            key={hotel.id}
            onClick={() => handleImageClick(hotel)}
          >
            <img
              src={hotel.url} // Mock image URL
              alt={hotel.title}
              className="hotel-image"
            />
            <h3>{hotel.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
