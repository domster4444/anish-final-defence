const nodemailer = require("nodemailer");

require("dotenv").config();
const path = require("path");

const generateRandomEmailNumber = () => {
  return Math.floor(Math.random() * 1000);
};
function addRandomSpaces(text) {
  let chars = text.split("");
  let numSpaces = Math.floor(Math.random() * (text.length / 4));
  for (let i = 0; i < numSpaces; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    chars.splice(randomIndex, 0, " ");
  }
  return chars.join("");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "donotreplythisback@gmail.com",
    pass: "sajjhjleycfzonhx",
  },
});

const generateMailOptions = (to, subject, text, html, attachments) => {
  return {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
    attachments: attachments ? attachments : [],
  };
};

/**
 * The function `sendEmail` sends an email using the `transporter` object and checks if the email limit
 * has been exceeded before sending the email.
 * @param to - The `to` parameter is an array of email addresses to which the email will be sent.
 * @param subject - The subject parameter is a string that represents the subject of the email. It is
 * the text that appears in the subject line of the email.
 * @param templateFunction - The `templateFunction` parameter is a function that generates the HTML
 * content of the email. It should return a string representing the HTML content of the email template.
 * @param attachments - The `attachments` parameter is an optional array of objects that represent the
 * attachments to be included in the email. Each object in the array should have the following
 * properties:
 * @returns The function `sendEmail` returns either "limit reached" if the email limit is exceeded,
 * `true` if the email is successfully sent, or "error" if there is an error while sending the email.
 */

//! KEEP AWAIT BEFORE USING senEmail function
const sendEmail = async (to, subject, templateFunction, attachments) => {
  const res = await fetch("http://localhost:5000/api/v1/email-quota/is-email-limit-exceeded", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (data.isEmailLimitExceeded) {
    console.log("email limit reached.");
    return "limit reached";
  }

  try {
    const info = await transporter.sendMail(
      generateMailOptions(
        //! to
        to,
        //! subject
        `Notice:${generateRandomEmailNumber()} ${subject}`,
        //! text
        addRandomSpaces("this email if from your school for informing a notice."),
        //! html
        templateFunction
        //! add attachment if any in below format
        // [
        //   {
        //     filename: "reportcard.png",
        //     path: path.join(__dirname, "../storage/11/reportcard.png"),
        //     contentType: "image/png",
        //     //   contentType: "application/pdf",
        //   },
        // ]
      )
    );
    if (info.accepted.length > 0) {
      console.log("email sent successfully.");
      return true;
    }
  } catch (error) {
    return "error";
  }
};

// TODO: IT RETURNS either true or "error" or "limit reached"
//* HOW TO USE :-
//* sendEmail(["kshitizshah79@gmail.com", "kshitiz.shah@deerwalk.edu.np"], `Your Subject`, `<h1>this is email from node mailer</h1>`));
module.exports = {
  sendEmail,
};
