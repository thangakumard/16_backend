const router = require("express").Router();
const Transaction = require("../models/transaction");
const { isLoggedIn } = require("../middleware/auth");

//Get all assignments specific to caller
router.post("/transactions/filter", isLoggedIn, async (req, res, next) => {
  const status = 200;
  let response;
  try {
    response = await Transaction.find(
      req.body
    );
    res.json({ status, response });
  } catch (error) {
    const e = new Error("Something went bad");
    e.status = 400;
    next(e);
  }
});

router.post("/transaction/create", isLoggedIn, async (req, res, next) => {
  const status = 201;
  try {
    const { type, category, subcategory, transaction_date, transaction_amount } = req.body;
    if (type && category && subcategory && transaction_date && transaction_amount) {
      //create a transaction record
      await Transaction.create(
        req.body
      );
      const response = "Successfully created!";
      return res.status(status).json({ status, response });
    }
  } catch (error) {
    console.error(error);
    const e = new Error("An error occurred while signup");
    e.status = 400;
    next(e);
  }
});

router.patch("/transaction/:id/update", isLoggedIn, async (req, res, next) => {
  const status = 201;
  try {
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, upsert: true }
      );
      const response = "Successfully created!";
      return res.status(status).json({ status, response });
  } catch (error) {
    console.error(error);
    const e = new Error("An error occurred while signup");
    e.status = 400;
    next(e);
  }
});

router.delete("/transaction/:id/delete", isLoggedIn, async (req, res, next) => {
  const status = 201;
  try {
        const response = await Transaction.findByIdAndDelete(req.params.id);
        res.json({ status, response });
  } catch (error) {
    console.error(error);
    const e = new Error("Something went bad");
    e.status = 400;
    next(e);
  }
});

module.exports = router;
