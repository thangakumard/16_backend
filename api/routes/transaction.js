const router = require("express").Router();
const Transaction = require("../models/transaction");
const { isLoggedIn } = require("../middleware/auth");

// Signup route lets the user create a new user account
router.post("/transaction/create", isLoggedIn, async (req, res, next) => {
  const status = 201;
  try {
    const { type, category, subCategory, transaction_date, transaction_amount } = req.body;
    if(type && category && subCategory && transaction_date && transaction_amount){    
    //create a transaction record
     await Transaction.create({
      type:type,
      category: category,
      subcategory: subCategory,
      transaction_date: transaction_date,
      transaction_amount: transaction_amount
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

module.exports = router;
