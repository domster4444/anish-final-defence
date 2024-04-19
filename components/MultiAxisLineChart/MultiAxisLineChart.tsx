//@ts-nocheck

import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MultiAxisLineChart = ({ name }: { name: String }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        // custom gridLine
        grid: {
          drawOnChartArea: false,
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        grid: {
          drawOnChartArea: false,
        },
        type: "linear" as const,
        display: false,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [200, 500, 300, 1000, 400, 700, 900],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.4, // Adjust the tension value as needed
      },
      {
        label: "Dataset 2",
        data: [300, 1000, 400, 700, 900, 500, 500],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
        tension: 0.4, // Adjust the tension value as needed
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default MultiAxisLineChart;
