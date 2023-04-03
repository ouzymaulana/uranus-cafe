import React, { useState, useEffect } from "react";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useTotalPayValue } from "../../config/Context/TotalPayContextProvider";

const OrderSummary = () => {
  const { totalPay, setTotalPay } = useTotalPayValue();
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const { orderMenu } = useOrderMenu();

  function calculateTotal(orderMenu) {
    if (orderMenu !== null) {
      let total = 0;
      orderMenu.forEach((item) => {
        total += item.quantity * item.value.price;
      });
      return total;
    }
  }

  useEffect(() => {
    const newTotal = calculateTotal(orderMenu);
    setTotal(newTotal);
    setTax(newTotal == undefined ? 0 : newTotal * 0.1);
    const resultTotalPay = newTotal == undefined ? 0 : newTotal + tax;
    setTotalPay(resultTotalPay);
  }, [orderMenu, total]);

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
