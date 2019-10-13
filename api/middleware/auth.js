const { decodeToken } = require("../util/token");
const User = require("../models/user");

const isLoggedIn = (req, _res, next) => {
  if (!req.token) {
    const error = new Error(`You are not logged in.`);
    error.status = 401;
    return next(error);
  }

  try {
    decodeToken(req.token);
    next();
  } catch (e) {
    console.error(e);
    const error = new Error(`There is a problem with your credentials.`);
    error.status = 401;
    next(error);
  }
};

const isAdmin = async (req, next) => {
  try {
    const payload = decodeToken(req.token);
    const result = await User.findOne({ _id: payload.id });
    return result.isAdmin;
  } catch (error) {
    error = new Error(`Something went bad`);
    error.status = 400;
    next(error);
  }
};

module.exports = { isLoggedIn, isSameUser, isAdmin, getStudentId };
