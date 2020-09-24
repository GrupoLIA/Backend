import Review from '../models/review';
import User from '../models/user';

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).send({
      success: 'true',
      length: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).send({ success: false });
  }
};

const getReviewsFromUserByID = async (req, res) => {
  try {
    /*  const user = await User.findOneById(req.params.id);
        -- Get all reviews where employee in Contract equals :userID
        -- populate from review to contract in which employee equals :userID
    */
  } catch (err) {}
};

const createReview = async (req, res) => {
  const newReview = new Review(req.body);
  try {
    await newReview.save();
    /*  Only possible if the status of the contract the review references equals 'completed' */

    res.status(200).send({ success: true, data: { newReview } });
  } catch (err) {
    res.status(501).send({ success: false, error: err });
  }
};

export default { getAllReviews, createReview, getReviewsFromUserByID };
