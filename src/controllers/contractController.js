import Contract from '../models/contract';

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({});

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

const createContract = async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);

    res.status(200).send({ success: true, data: { newContract } });
  } catch (err) {
    res.status(501).send({ success: false, error: err });
  }
};

export default { getAllContracts, createContract };
