export const readableDateConverter = (timestamp: any) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  //@ts-ignore
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // Add ordinal suffix to the day
  const day = date.getDate();
  let dayWithSuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      dayWithSuffix = day + "st";
      break;
    case 2:
    case 22:
      dayWithSuffix = day + "nd";
      break;
    case 3:
    case 23:
      dayWithSuffix = day + "rd";
      break;
    default:
      dayWithSuffix = day + "th";
  }

  return formattedDate.replace(/\d+/, dayWithSuffix);
};
