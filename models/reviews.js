import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    bookId: { type: String, required: true },
    user: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
