import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: [true, 'A review must belong to a contract.'],
    },
    title: {
      type: String,
      required: [true, 'A title is required.'],
    },
    description: {
      type: String,
      required: [true, 'A review is needed.'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A value between 1 and 5 must be supplied.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.methods.toJSON = function () {
  const review = this;
  const reviewObject = review.toObject();

  delete reviewObject._id;
  delete reviewObject.__v;

  return reviewObject;
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
