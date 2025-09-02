// ClientView.jsx
import React, { useState } from "react";

// Sample menu with prices
const MENU = [
  { name: "Burger", price: 100 },
  { name: "Pizza", price: 250 },
  { name: "Pasta", price: 200 },
  { name: "Fries", price: 80 },
];

const ClientView = ({ addOrder, orders = [] }) => {
  const [name, setName] = useState("");
  const [dish, setDish] = useState(MENU[0].name);
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState("All");

  const selectedDish = MENU.find((d) => d.name === dish);
  const totalPrice = selectedDish ? selectedDish.price * quantity : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dish) return;
    addOrder({
      name,
      dish,
      quantity,
      price: totalPrice,
      id: Date.now(),
      status: "Pending",
    });
    setQuantity(1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Place Your Order</h2>

      {/* Mini Menu Filter */}
      <div className="mb-4 flex gap-3 justify-center">
        {["All", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              filter === status
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-orange-200 hover:text-orange-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />

        {/* Dish Dropdown */}
        <select
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          {MENU.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} - ₹{item.price}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />

        {/* Total Price */}
        <p className="text-gray-700 font-semibold">Total: ₹{totalPrice}</p>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition font-bold"
        >
          Submit Order
        </button>
      </form>

      {/* Real-Time Order Status */}
      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Your Orders</h3>
      <ul className="space-y-3">
        {orders
          ?.filter((o) => o.name === name || name === "")
          .filter((o) => (filter === "All" ? true : o.status === filter))
          .map((order) => (
            <li
              key={order.id}
              className="p-3 border rounded-lg flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="font-medium">
                  #{order.id} - {order.dish} x {order.quantity} (₹{order.price})
                </p>
                <p className="text-sm text-gray-500">By: {order.name}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ClientView;
