const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: {type: String, required: true},
    is_active:{type: Boolean, required:true},
    sort_order:{type: Number, required:false}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = mongoose.model("Category", CategorySchema, "categories");
