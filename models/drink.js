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
    description: { type: String},
    calories: { type: Number},
    allergies: String,
    alcohol: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    image: { type: String , required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Drink", drinkSchema);
