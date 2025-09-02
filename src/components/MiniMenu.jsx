import React from "react";
import "./MiniMenu.css";

const dishes = [
  { code: "#1", name: "Pizza" },
  { code: "#2", name: "Burger" },
  { code: "#3", name: "Pasta" },
  { code: "#4", name: "Salad" },
  { code: "#5", name: "Tacos" },
  { code: "#6", name: "Sushi" },
];

function MiniMenu({ onSelect }) {
  return (
    <div className="mini-menu">
      <h3>Quick Menu</h3>
      <div className="menu-grid">
        {dishes.map((dish) => (
          <div
            key={dish.code}
            className="menu-card"
            onClick={() => onSelect(dish)}
          >
            <span className="dish-code">{dish.code}</span>
            <p>{dish.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniMenu;
