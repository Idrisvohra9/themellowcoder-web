import express from 'express';
import mailer from "nodemailer";

const router = express.Router();

const email = "idrishaider987@gmail.com";
let transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: "vxoxhqatpffaeuoa",
    },
});

const sendEmail = async (to, subject, heading, body, outro = "Team TMC! 💝") => {
    var mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html:
            `
        <div>
        <h2 style="color:#1d1d1b;">${heading}</h2>
        <h4 style="padding:10px;border:2px solid #6e046f;color:#1d1d1b;">${body}</h4>
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

const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    sendEmail(email, "Email Confirmation Message", "<p>Please Type the below OTP for email confirmation of TMC.</p><p style='color:crimson;'>Don't share this OTP to anyone.</p>", `OTP: ${otp}`);
    return otp;
}
const welcomeMail = async (name, email) => {
    sendEmail(email, "Hello!, and welcome to TMC", `${name} we are glad to have you here.<br/>Please enjoy our features and stay connected!`, `Click the link <a href="https://themellowcoder.com/">here</a> to start a new journey.`);

}
router.post("/verify", async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sendOTP(email)
        res.status(200);
        res.send(JSON.stringify(otp))
    } catch (error) {
        res.status(500).json(error.message);
    }
});
router.post("/welcome", async (req, res) => {
    const { email, name } = req.body;
    try {
        welcomeMail(name, email);
        res.status(200);
    } catch (error) {
        res.status(500).json(error.message);
    }
});
export default router;