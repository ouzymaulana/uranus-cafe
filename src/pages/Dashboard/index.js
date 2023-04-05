import React from "react";
import Layout from "../../layout";
import BarChart from "../../components/Dashboard/BarChart";
import DoughnutChart from "../../components/Dashboard/DoughnutChart";

const Dashboard = ({ handleLogin }) => {
  const totalTransaction = localStorage.getItem("TransactionTotal");
  return (
    <Layout handleLogin={handleLogin}>
      <div className="dashboard-page">
        <div className="product-percategory">
          <BarChart />
        </div>
        <div className="product-sold">
          <DoughnutChart />
        </div>
        <div className="transaction-total">
          <div>Transaction Total</div>
          <div>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalTransaction)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
