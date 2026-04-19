const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTP = require("../models/otp");

module.exports.signup = async (req, res) => {
  const { username, email, password, otp, otpSent } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.render("signup", {
      error: "User already exists",
    });
  }

  if (otpSent !== "true") {
    return res.render("signup", {
      error: "Please verify your email first",
    });
  }

  const record = await OTP.findOne({ email, otp });

  if (!record) {
    return res.render("signup", {
      error: "Invalid OTP",
    });
  }

  if (record.expiresAt < new Date()) {
    return res.render("signup", {
      error: "OTP expired",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  await OTP.deleteMany({ email });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );  

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  res.redirect("/index");
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
  });
  res.redirect("/index");
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};