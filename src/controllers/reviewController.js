import Contract from '../models/contract';
import Review from '../models/review';
import User from '../models/user';

const getAllReviews = async (req, res) => {
  try {
    if (!req.params.userID) {
      const reviews = await Review.find();

      res.status(200).send({
        success: 'true',
        length: reviews.length,
        data: {
          reviews,
        },
      });
    } else {
      const contracts = await Contract.find({
        employee: req.params.userID,
        status: 'accepted',
        has_review: true,
      });

      console.log('Contracts:', contracts);

      const aux = await Promise.all(
        contracts.map(async (value) => {
          return await value.populate('reviews').execPopulate();
        })
      );

      console.log('aux', aux);

      const reviews = aux.flatMap((value) => value.reviews);

      console.log('REVIEWS', reviews);
      res.status(200).send({
        success: 'true',
        length: reviews.length,
        reviews,
      });
    }
  } catch (err) {
    res.status(404).send({ success: false, error: err.message });
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
Only possible if the status of the contract the review references equals 'accepted' and
the user making the review is the employer as in the contract
*/

const createReview = async (req, res) => {
  try {
    const contract = await Contract.findById({
      _id: req.params.contractID,
    });

    if (!contract) {
      throw new Error('Contract does not exists');
    }

    if (contract.employer.toString() !== req.user._id.toString()) {
      throw new Error('Only the employer can make a review');
    }

    if (contract.status !== 'accepted') {
      throw new Error('The contract need to be accepted in order to review it');
    }

    if (contract.has_review) {
      throw new Error('You have already reviewed this contract');
    }

    const newReview = new Review({
      ...req.body,
      contract: req.params.contractID,
    });

    await newReview.save();

    contract.has_review = true;
    await contract.save();

    res.status(200).send({ success: true, data: { newReview } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

export default { getAllReviews, createReview, getReviewsFromUserByID };
