//@ts-nocheck

import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LineChart() {
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

  const labels = ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6", "Class7", "Class8", "Class9", "Class10", "Class11", "Class12"];

  const data = {
    labels,
    datasets: [
      {
        label: "Girls",
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 55, 40, 55, 40, 55, 40, 55, 40, 55, 40],
        backgroundColor: "#C182E0",
        barPercentage: 0.6, // Adjust this value to change the width of the bars
        categoryPercentage: 1, // Ensures bars are evenly spaced
        borderRadius: 4, // Sets the border radius for the bars
      },
      {
        label: "Boys",
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 27, 90, 27, 90, 27, 90, 27, 90, 27, 90],
        backgroundColor: "#6C9BCF",
        barPercentage: 0.6, // Adjust this value to change the width of the bars
        categoryPercentage: 1, // Ensures bars are evenly spaced
        borderRadius: 4, // Sets the border radius for the bars
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default LineChart;
