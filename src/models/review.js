import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    review: {
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
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user.'],
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A review must be directed to a user.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.methods.toJSON = function () {
  const review = this;
  const reviewObject = review.toObject();

  delete reviewObject._id;

  return reviewObject;
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'reviewer', select: '-__v -password -_id' });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
