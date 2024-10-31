import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelList from "./components/HotelList";
import FoodList from "./components/FoodList";
import SearchPage from "./components/SearchPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
