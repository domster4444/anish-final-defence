//@ts-nocheck
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ hostelStats }) {
  // if labels is not passed, then use below label
  // labels: ["male", "female", "other"],
  // data: [male, female, other],
  // color: ["rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)"],

  let labels = hostelStats?.pieChart?.labels ? hostelStats.pieChart.labels : ["male", "female", "other"];
  let data = hostelStats?.pieChart?.data ? hostelStats.pieChart.data : [1, 2, 3];
  let color = hostelStats?.pieChart?.color ? hostelStats.pieChart.color : ["rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)"];

  const piedata = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: color,
        borderColor: color,

        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={piedata} />;
}

export default PieChart;
