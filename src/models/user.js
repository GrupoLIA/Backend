import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    /*name:{

      },*/
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject._id;

  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;
