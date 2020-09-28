import mongoose from 'mongoose';

const contractSchema = mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A contract must belong to a user.'],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A contract must be directed to a user.'],
  },
  status: {
    type: String,
    enum: ['pending', 'expired', 'accepted'],
    default: 'pending',
  },
  has_review: {
    type: Boolean,
    default: false,
  },
  trade: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

contractSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'contract',
});

const Contract = mongoose.model('Contract', contractSchema);

export default Contract;
