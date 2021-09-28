import Contract from '../models/contract';
import Review from '../models/review';
import User from '../models/user';

const getAllReviews = async (req, res) => {
  try {
    const contracts = await Contract.find({
      employee: req.user._id,
      status: 'finished',
      has_review: true,
    });

    const aux = await Promise.all(
      contracts.map(async (value) => {
        return await value.populate('reviews').execPopulate();
      })
    );

    const reviews = aux.flatMap((value) => value.reviews);

    res.status(200).send({
      success: 'true',
      length: reviews.length,
      reviews,
    });
  } catch (err) {
    res.status(404).send({ success: false, error: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.contractID);

    if (!contract) {
      throw new Error('Contract does not exists');
    }

    if (contract.employer.toString() !== req.user._id.toString()) {
      throw new Error('Only the employer can make a review');
    }

    if (contract.status !== 'finished') {
      throw new Error('The contract need to be finished in order to review it');
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

    const employee = await User.findById(contract.employee);
    const findTrade = employee.trades.find((t) => t.trade === contract.trade);

    const reviewCount = findTrade.review_count ?? 0;
    const totalRating = findTrade.total_rating;

    User.findOneAndUpdate(
      {
        _id: contract.employee,
        'trades.trade': contract.trade,
      },
      {
        $set: {
          'trades.$.review_count': reviewCount + 1,
          'trades.$.total_rating':
            (totalRating * reviewCount + req.body.rating) / (reviewCount + 1),
        },
      },
      { new: true }
    ).exec();

    res.status(200).send({ success: true, data: { newReview } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

export default { getAllReviews, createReview };
