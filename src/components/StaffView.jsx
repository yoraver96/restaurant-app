import React from "react";
import "../styles/style.css";

const StaffView = ({ orders = [], updateOrderStatus }) => {
  return (
    <div className="card">
      <h2>Staff Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id}>
              <span>{order.name} → {order.dish} x {order.quantity}</span>
              <div>
                <button onClick={() => updateOrderStatus(order.id, "Completed")}>✅ Complete</button>
                <button onClick={() => updateOrderStatus(order.id, "Pending")}>⏳ Pending</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffView;
