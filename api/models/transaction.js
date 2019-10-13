const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: {type: String, required: true},
    transaction_date:{type: Date, required: true},
    transaction_amount:{type: Number, required:true}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = mongoose.model("transactions", TransactionSchema, "transactions");
