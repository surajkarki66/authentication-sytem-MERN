const User = require('../models/auth.model');

const adminCheck = (req, res, next) => {
    User.findById({
      _id: req.user._id,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
  
      if (user.role !== "admin") {
        return res.status(400).json({
          error: "Admin resource. Access denied.",
        });
      }
  
      req.profile = user;
      next();
    });
  }
module.exports = adminCheck;