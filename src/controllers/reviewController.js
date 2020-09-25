import Contract from '../models/contract';
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

/*  
/api/reviews/:contractID
Only possible if the status of the contract the review references equals 'accepted'
*/

const createReview = async (req, res) => {
  try {
    const contract = await Contract.findById({
      _id: req.params.contractID,
    });

    if (!contract) {
      throw new Error('Contract does not exists');
    }

    if (contract.status !== 'accepted') {
      throw new Error('The contract need to be accepted in order to review it');
    }

    const newReview = new Review({
      ...req.body,
      contract: req.params.contractID,
    });
    await newReview.save();

    res.status(200).send({ success: true, data: { newReview } });
  } catch (err) {
    res.status(501).send({ success: false, error: err.message });
  }
};

export default { getAllReviews, createReview, getReviewsFromUserByID };
