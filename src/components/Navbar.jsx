import React, { useState } from "react";
import "../styles/style.css";

const Navbar = ({ onSectionChange }) => {
  const [activeTab, setActiveTab] = useState("client");

  const handleSectionChange = (section) => {
    setActiveTab(section);
    onSectionChange(section);
  };

  return (
    <div className="navbar">
      <h1 onClick={() => handleSectionChange("client")}>Restaurant POS</h1>
      <div>
        <button
          className={activeTab === "client" ? "active" : ""}
          onClick={() => handleSectionChange("client")}
        >
          Client
        </button>
        <button
          className={activeTab === "staff" ? "active" : ""}
          onClick={() => handleSectionChange("staff")}
        >
          Staff
        </button>
        <button
          className={activeTab === "sales" ? "active" : ""}
          onClick={() => handleSectionChange("sales")}
        >
          Sales
        </button>
      </div>
    </div>
  );
};

export default Navbar;
