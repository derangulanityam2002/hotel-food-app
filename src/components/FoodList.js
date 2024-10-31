import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FoodList.css"; // Custom CSS styling

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);

  // Fetch food data from TheMealDB API
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        const foodsWithPrice = response.data.meals.map((food) => ({
          ...food,
          price: (Math.random() * 20 + 5).toFixed(2), // Random price between $5 and $25
        }));
        setFoods(foodsWithPrice);
      })
      .catch((error) => console.error("Error fetching foods", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedFoods = [...foods].sort((a, b) => {
      return order === "asc"
        ? a.strMeal.localeCompare(b.strMeal)
        : b.strMeal.localeCompare(a.strMeal);
    });
    setFoods(sortedFoods);
  };

  const handleAddToCart = (food) => {
    setCart([...cart, food]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Filtered and sorted foods
  const filteredFoods = foods.filter((food) =>
    food.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total bill
  const totalBill = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <div className="food-list-container">
      {/* Food List */}
      <div className="food-list">
        <h1>Food List</h1>
        <input
          type="text"
          placeholder="Search foods..."
          onChange={handleSearch}
          className="search-input"
        />
        <div className="sort-buttons">
          <button onClick={() => handleSort("asc")}>
            Sort Asc {sortOrder === "asc" && "(Current)"}
          </button>
          <button onClick={() => handleSort("desc")}>
            Sort Desc {sortOrder === "desc" && "(Current)"}
          </button>
        </div>

        <div className="card-container">
          {filteredFoods.map((food) => (
            <div className="food-card" key={food.idMeal}>
              <img
                src={food.strMealThumb}
                alt={food.strMeal}
                className="food-image"
              />
              <h3>{food.strMeal}</h3>
              <p>Category: {food.strCategory}</p>
              <p>Area: {food.strArea}</p>
              <p>Price: ${food.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(food)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart-container">
        <h2>Cart</h2>
        <ul className="cart-list">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.strMeal}</span>
                <span>${item.price}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
        {/* Total Bill */}
        <div className="total-bill">
          <h3>Total Bill: ${totalBill.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default FoodList;
