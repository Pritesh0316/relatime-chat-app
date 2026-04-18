const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded.userId
    };
  } catch (err) {
    req.user = null;
  }

  next();
};

module.exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};