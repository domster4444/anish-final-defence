//@ts-nocheck

import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Present", "Absent", "Late", "Sick", "Permit", "Day Off"],
  datasets: [
    {
      label: "# of Votes",
      data: [80, 30, 5, 10, 40],
      backgroundColor: ["#1B9C85", "#e35959", "#e3ad59", " #aaaaaa", "#39a2d9"],
      borderColor: ["#1B9C85", "#e35959", "#e3ad59", " #aaaaaa", "#39a2d9"],
      borderWidth: 1,
      circumference: 180,
      rotation: 270,
    },
  ],
};

function Gauge() {
  return <Doughnut data={data} />;
}

export default Gauge;
