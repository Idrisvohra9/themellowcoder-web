const mailer = require("nodemailer");
import { setCookie } from "./cookies";

const email = "idrishaider987@gmail.com";
let transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: "vxoxhqatpffaeuoa",
    }
});

function sendMail(to, subject, heading, body, outro = "Team TMC! 💝") {
    var mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html:
            `
        <div style='background-color:#1d1d2b;color:aliceblue; padding:10px;'>
        <h1>${heading}</h1>
        <h3 style="padding:20px;border:2px solid white;">${body}</h3>
        <cite>-${outro}</cite>
        </div>
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export function sendOTP(email) {
    const otp = Math.floor(Math.random() * 1000000)
    console.log(otp);
    sendMail(email, "Email Confirmation Message", "Please Type the below OTP for email confirmation of TMC.", `OTP: <code>${otp}</code>`);
    return otp;
}
