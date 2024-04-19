//@ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RadialProgressChart from "@/components/RadialProgressChart/RadialProgressChart";

const Analytics = () => {
  return (
    <div className='analyse'>
      <div className='red'>
        <div className='status'>
          <div className='info'>
            <h3>Total:</h3>
            <strong>
              <h1>3 Branches</h1>
            </strong>
          </div>
          <div className='progresss'>
            <RadialProgressChart detailText='Increase' percentage={72} color='#e84c3d' />
          </div>
        </div>
      </div>
      <div className='pink'>
        <div className='status'>
          <div className='info'>
            <h3>Limit:</h3>
            <strong>
              <h1>3/4 Branch</h1>
            </strong>
          </div>
          <div className='progresss'>
            <RadialProgressChart detailText='Increase' percentage={72} color='#ff69b3' />
          </div>
        </div>
      </div>

      <div className='green'>
        <div className='status'>
          <div className='info'>
            <h3>Active : </h3>
            <strong>
              <h1>3 Branch</h1>
            </strong>
          </div>
          <div className='progresss'>
            <RadialProgressChart detailText='Loss' percentage={66} color='#1b9c85' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
