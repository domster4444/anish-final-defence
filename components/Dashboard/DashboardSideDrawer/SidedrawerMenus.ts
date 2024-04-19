// exam
// expense
// dashboard
import BatchSvg from "public/assets/Batch.svg";
import BranchManagementSvg from "public/assets/Branch_management.svg";
import CanteenManagementSvg from "public/assets/Canteen.svg";
import AllMenuSvg from "public/assets/All_Menu.svg";
import AttendanceManagementSvg from "public/assets/Attendence.svg";
import idCardManagementSvg from "public/assets/idcard.svg";
import profilerSvg from "public/assets/profiler.svg";
import certificateManagementSvg from "public/assets/certificate.svg";
import circularStrippedImg from "public/assets/menu-bullet-icon.png";
import ExamManagementSvg from "public/assets/ExamManagement.svg";
import ExpenseSvg from "public/assets/Expense.svg";
import DashboardSvg from "public/assets/Dashboard.svg";
import ClassesSvg from "public/assets/Classes.svg";
import ParentsSvg from "public/assets/Parents_Management.svg";
import OnlineClassSvg from "public/assets/Online_Class.svg";
import EmployeeSvg from "public/assets/Employee_Management.svg";
import LibrarySvg from "public/assets/Library_Management.svg";
import publicMessage from "public/assets/publicMessage.svg";
import analytics from "public/assets/analytics.svg";
import bill from "public/assets/bill.svg";
import hostel from "public/assets/hostel.svg";
import admitCard from "public/assets/id.svg";
import income from "public/assets/income.svg";
import inventory from "public/assets/inventory.svg";
import meetingManagement from "public/assets/meetingManagement.svg";
import notice from "public/assets/notice.svg";
//new
import subject from "public/assets/subject.svg";
import studentManagement from "public/assets/studentManagement.svg";
import section from "public/assets/section.svg";
import schoolWebsite from "public/assets/schoolWebsite.svg";
import schoolVacancy from "public/assets/schoolVacancy.svg";
import scholarshipManagement from "public/assets/scholarshipManagement.svg";
import helpAndSupport from "public/assets/helpAndSupport.svg";
import generateRoutine from "public/assets/generateRoutine.svg";
import gallery from "public/assets/gallery.svg";
import frontOffice from "public/assets/frontOffice.svg";
import behaviourManagement from "public/assets/behaviourManagement.svg";
import admittedYearManagement from "public/assets/admittedYearManagement.svg";
import accessManagement from "public/assets/accessManagement.svg";

export const menus = [
  {
    label: "Reviews",
    svg: generateRoutine,
    role: ["school-account"],
    subMenus: [
      {
        svg: circularStrippedImg,
        label: "Review Category",
        link: "/dashboard/review/reviewCategory/manage",
      },
      {
        svg: circularStrippedImg,
        label: "Review Products",
        link: "/dashboard/reviewProduct/manage",
      },
    ],
  },
  {
    label: "Add User",
    svg: generateRoutine,
    role: ["school-account"],
    subMenus: [
      {
        svg: circularStrippedImg,
        label: "Add User",
        link: "/dashboard/user/userManagement/add/add",
      },
      {
        svg: circularStrippedImg,
        label: "User List",
        link: "/dashboard/user/userManagement/manage/manage",
      },
    ],
  },
  {
    label: "Review All Products",
    svg: circularStrippedImg,
    role: ["school-account", "librarian"],
    link: "/dashboard/review/reviewProductList/manage/manage",
  },
  {
    label: "Add Product",
    svg: circularStrippedImg,
    role: ["school-account", "librarian"],
    link: "/dashboard/reviewProduct/manage",
  },
];
