import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORY } from "../../../constants/constant"
import { getExpensesByMonthForCategory } from '../../../utils/generateExpense.utils'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({view:month, expenses}) {

  const data = {
    labels: Object.values(CATEGORY),
    datasets: [
      {
        label: "You Spent ₹",
        data: getExpensesByMonthForCategory(month,expenses),
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

  return <div>{ <Doughnut data={data} />}</div>;
}
