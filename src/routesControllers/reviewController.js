import Review from '../models/review';

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
  } catch (e) {
    res.status(404).send({ success: false });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).send({ success: true, data: { review } });
  } catch (e) {
    res.status(501).send({ success: false, error: e });
  }
};

export default { getAllReviews, createReview };
