const router = require("express").Router();
const Category = require("../models/category");
const { isLoggedIn } = require("../middleware/auth");

// Signup route lets the user create a new user account
router.post("/category/create", isLoggedIn,async (req, res, next) => {
  const status = 201;
  try {
    const { type, category, subcategory } = req.body;
    if(type && category && subcategory){    
    //create a user record
    await Category.create({
      type: req.body.type,
      category: req.body.category,
      subcategory: req.body.subcategory,
      is_active: true
    });
    const response = "Successfully created!";
    return res.status(status).json({ status, response});
}
  } catch (error) {
    console.error(error);
    const e = new Error("An error occurred while signup");
    e.status = 400;
    next(e);
  }
});

//Login route allows the valid user to login to their account
router.get("/category", async (req, res, next) => {
  const status = 200;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //check if account exists
    if (!user) {
      console.error(error);
      error = new Error(`An error occurred while login`);
      error.status = 400;
      next(error);
    } else {
      const is_valid = await bcrypt.compare(password, user.password);
      if (!is_valid) {
        const error = new Error(`Username and password do not match`);
        error.status = 400;
        return next(error);
      }
      const response = "Successfully logged in";
      const token = generateToken(user._id);
      const user_info = await User.findById(user._id).select(
        "first_name last_name isAdmin"
      );

      return res.status(status).json({ status, response, token, user_info });
    }
  } catch (error) {
    console.error(error);
    error = new Error(`An error occurred while login`);
    error.status = 400;
    next(error);
  }
});

module.exports = router;
