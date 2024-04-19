//* Refactored
import Calendar from "components/Calendar";

const BasicCalendar: React.FC<{ fetchRecordAndSetTable: any; calendarEvents: any }> = ({ fetchRecordAndSetTable, calendarEvents }) => {
  return (
    <>
      <Calendar events={calendarEvents} fetchRecordAndSetTable={fetchRecordAndSetTable} />
    </>
  );
};

export default BasicCalendar;
