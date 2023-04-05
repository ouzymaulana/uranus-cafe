import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const dataSoldMenu = JSON.parse(localStorage.getItem("soldMenu"));
  const { menu } = useDataMenu();
  // const totalSold =
  //   dataSoldMenu !== null
  //     ? dataSoldMenu.reduce((total, order) => total + order.quantity, 0)
  //     : 0;
  const data = {
    labels: ["Total Sold Menu", "Total Menu"],
    datasets: [
      {
        label: "My First Dataset",
        data: [dataSoldMenu.length, menu.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  return (
    <Doughnut data={data} height={300} width={300} options={options}></Doughnut>
  );
};

export default DoughnutChart;
