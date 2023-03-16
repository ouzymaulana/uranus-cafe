import React, { useState, useEffect } from "react";

const OrderSummary = ({ subTotal, orderMenu }) => {
  const [total, setTotal] = useState([]);
  const [tax, setTax] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  function dataTotal() {
    const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
    let newTotal = 0;
    if (getOrderMenu != null) {
      getOrderMenu.forEach((item) => {
        // newTotal += subTotal(item);
        newTotal += item.quantity * item.value.price;
      });
    }
    setTotal(newTotal);
    setTax(newTotal * 0.1);
    const resultTotalPay = newTotal + tax;
    setTotalPay(resultTotalPay);
  }

  useEffect(() => {
    dataTotal();
  }, [total]);

  return (
    <div className="subtotal-tax-total">
      <div className="subtotal">
        <p>Subtotal</p>
        <p>{total}</p>
      </div>
      <div className="tax">
        <p>10% Tax</p>
        <p>{tax.toLocaleString()}</p>
      </div>
      <div className="total">
        <p>Total</p>
        <p>{totalPay.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
