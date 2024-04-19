import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
import SingleLineChart from "@/components/SingleLineChart";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";

import Analytics from "../components/Analytics";

const reportAndAnalytics = () => {
  return (
    <DashboardOutline pageTitle={"Report & Analytics"} isShowRightSection={true}>
      <Analytics />
    </DashboardOutline>
  );
};

export default reportAndAnalytics;
