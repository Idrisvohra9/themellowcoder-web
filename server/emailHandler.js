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
        <h3 style="color:#1d1d1b;">${heading}</h3>
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
    sendEmail(email, "Email Confirmation Message", "Please Type the below OTP for email confirmation of TMC.", `OTP: ${otp}`);
    return otp;
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

export default router;