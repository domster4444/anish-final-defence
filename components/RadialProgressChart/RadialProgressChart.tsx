//@ts-nocheck

import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";

const RadialProgressChart = ({ percentage, color, detailText }: any) => {
  return (
    <>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round",
          // Text size
          textSize: "16px",
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
          // Stroke width
          // Colors
          pathColor: color,
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      >
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <div
          style={{
            color: "#677483",
            fontSize: 13,
            marginTop: "-2rem",
            marginLeft: "1.5rem",
          }}
        >
          <strong>{percentage}%</strong> {detailText}
        </div>
      </CircularProgressbarWithChildren>
    </>
  );
};

export default RadialProgressChart;
