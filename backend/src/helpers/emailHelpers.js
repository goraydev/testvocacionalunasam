import nodemailer from "nodemailer";
import { API_EMAIL_ADDRESS, API_KEY_APP } from "../config.js";

export const emailHelper = async (to, subject, text) => {
  const userGmail = API_EMAIL_ADDRESS;
  const passAppGmail = API_KEY_APP;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: passAppGmail,
    },
  });

  const mailOptions = {
    from: userGmail,
    to,
    subject,
    html: `<div>${text}</div>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
