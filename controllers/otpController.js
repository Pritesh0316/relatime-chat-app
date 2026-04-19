const OTP = require("../models/otp");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports.otp = async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email });

    await OTP.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await transporter.sendMail({
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`
    });

    res.send("OTP sent successfully");
};