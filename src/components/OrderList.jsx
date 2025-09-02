import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderArray = Object.entries(data).map(([id, order]) => ({
          id,
          ...order
        }));
        setOrders(orderArray);
      } else setOrders([]);
    });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.customerName} - {order.dish} x {order.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
