// *Refactored
import { FC } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useRouter } from "next/router";

const CalendlyInvite: FC = () => {
  const router = useRouter();

  useCalendlyEventListener({
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventScheduled: (e) => {
      router.push("/meetingScheduleSuccess");
      console.log(e.data.payload);
    },
  });

  return (
    <div>
      <InlineWidget url='https://calendly.com/yourschoolsoftware/30min' />
    </div>
  );
};

export default CalendlyInvite;
