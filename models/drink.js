import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const drinkSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    flavour: { type: String, required: true },
    carbonated: { type: Boolean, default: false },
    calories: { type: Number, required: true },
    allergies: String,
    alcohol: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Drink", drinkSchema);
