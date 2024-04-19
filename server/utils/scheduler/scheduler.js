const schedule = require("node-schedule");

// HOW TO USE THIS FOR LIBRARY SCHEDULED EMAIL ?
// => when you assign a book to student, you assign returnDate as well right?
// => so, before updating the book with assigned student & returnDate, you can schedule a job to run at returnDate
//! AT PARTICULAR TIME (server should not be down after scheduling the job or else schedule will be lost)

//! AT RECURRENT INTERVAL  (server should not be down after scheduling the job or else schedule will be lost)
// get cron expression like '*/5 * * * *' from https://crontab.guru/#*/5_*_*_*_*,
// the '*/5 * * * *' means "every 5 minutes"
// schedule.scheduleJob("*/5 * * * * *", () => {
//   console.log("Triggered at recurrent interval");
// });

//* cencelling jobs
