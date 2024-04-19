//@ts-nocheck

import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SingleLineChart({ stats }) {
  let labels = stats?.lineChartData?.labels ? stats.lineChartData.labels : ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6", "Class7", "Class8", "Class9", "Class10", "Class11", "Class12"];
  let dataObj = stats?.lineChartData?.data
    ? stats.lineChartData.data
    : {
        label: "Class",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235)",
        barPercentage: 0.6, // Adjust this value to change the width of the bars
        categoryPercentage: 1, // Ensures bars are evenly spaced
        borderRadius: 10, // Sets the border radius for the bars
      };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [dataObj],
  };
  return <Bar options={options} data={data} />;
}

export default SingleLineChart;
