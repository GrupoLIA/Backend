import Contract from '../models/contract';
import User from '../models/user';

const getAllContracts = async (req, res) => {
  try {
    let contracts;

    if (req.query.isEmployee) {
      contracts = await Contract.find({ employee: { $eq: req.user._id } });
    } else {
      contracts = await Contract.find({ employer: { $eq: req.user._id } });
    }

    res.status(200).send({
      success: 'true',
      length: contracts.length,
      data: {
        contracts,
      },
    });
  } catch (err) {
    res.status(404).send({ success: false });
  }
};

// To be done by the employer
const createContract = async (req, res) => {
  try {
    const employee = await User.findById({ _id: req.body.employee });

    if (!employee) {
      throw new Error('Employee must exist');
    }

    const createdContracts = await Contract.countDocuments({
      $and: [
        {
          employer: req.user._id,
        },
        {
          employee: req.body.employee,
        },
        {
          status: 'pending',
        },
      ],
    }).exec();

    if (createdContracts >= 1) {
      throw new Error('Contract is already pending');
    }

    const userIndexTrade = employee.trades.findIndex(
      (t) => t.trade === req.body.trade
    );

    if (userIndexTrade == -1) {
      throw new Error('Employee does not have that trade');
    }

    // Check expiration of the trade
    const expiredTrade = employee.hasTradeExpired(req.body.trade);

    if (expiredTrade) {
      // commented for debugging
      throw new Error('Employee has expired trade');
    }

    const newContract = await Contract.create({
      ...req.body,
      employer: req.user._id,
    });

    res.status(200).send({ success: true, data: { newContract } });
  } catch (err) {
    res.status(501).send({ success: false, error: err.message });
  }
};

// This can only be done by the employee
const acceptContract = async (req, res) => {
  try {
    const contract = await Contract.findById({ _id: req.params.contractID });

    if (contract.employee.toString() !== req.user._id.toString()) {
      throw new Error('Only the employee can accept a contract');
    }

    contract.status = 'accepted';
    await contract.save();

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

export default { getAllContracts, createContract, acceptContract };
