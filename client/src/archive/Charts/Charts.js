import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORY, MONTH } from "../../constants/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({getMonthlyCategoryExpense, view:month}) {

  const data = {
    labels: Object.values(CATEGORY),
    datasets: [
      {
        label: "You Spent ₹",
        data: getMonthlyCategoryExpense(month),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 205, 8)",
          "rgb(52, 16, 215)",
          "rgb(25, 20, 186)",
          "rgb(125, 25, 81)"
        ],
        hoverOffset: 4,
      },
    ],
  };

  console.log(month, data)
  return <div>{ <Doughnut data={data} />}</div>;
}
