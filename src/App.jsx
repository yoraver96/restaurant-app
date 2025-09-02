// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import ClientView from "./components/ClientView.jsx";
import StaffView from "./components/StaffView.jsx";
import SalesView from "./components/SalesView.jsx";
import Footer from "./components/Footer.jsx";

// Mini menu items
const MINI_MENU = [
  { id: 1, name: "Burger", price: 100 },
  { id: 2, name: "Pizza", price: 200 },
  { id: 3, name: "Pasta", price: 150 },
  { id: 4, name: "Fries", price: 80 },
];

const App = () => {
  const [activeSection, setActiveSection] = useState("client");
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState("");

  // Add Order from Client
  const addOrder = (order) => {
    setOrders((prev) => [
      ...prev,
      { ...order, id: Date.now(), status: "Pending" },
    ]);
    setToast(`${order.dish} added to your orders!`);
  };

  // Update Order Status from Staff
 const updateOrderStatus = (id, status) => {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id === id) {
        setToast(`${order.dish} status changed to ${status}`);
        return { ...order, status };
      }
      return order;
    })
  );
};


  // Auto-hide toast after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      <Navbar onSectionChange={setActiveSection} />

      <main className="flex-grow p-6 mt-6 mb-6">
        {activeSection === "client" && (
          <ClientView
            orders={orders}
            addOrder={addOrder}
            menuItems={MINI_MENU}
          />
        )}
        {activeSection === "staff" && (
          <StaffView
            orders={orders}
            updateOrderStatus={updateOrderStatus}
          />
        )}
        {activeSection === "sales" && <SalesView orders={orders} />}
      </main>

      <Footer />

      {/* Toast Message */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#2ecc71",
            color: "white",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default App;
