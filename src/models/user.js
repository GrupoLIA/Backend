import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  /*name:{

      },*/
  email: {
    type: String,
    unique: true,
    required: [true, 'A valid email must be specified.'],
  },
  password: {
    type: String,
    required: true,
  },
  categories: [
    {
      trade: { type: String },
      validation_date: { type: Date, default: Date.now },
      expiracy_date: { type: Date },
      total_rating: { type: Number, default: 0 },
      review_count: { type: Number, default: 0 },
    },
  ],
});

/*userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject._id;

  return userObject;
};
*/
const User = mongoose.model('User', userSchema);

export default User;
