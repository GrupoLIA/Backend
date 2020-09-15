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
  } catch (e) {
    res.status(404).send({ success: false });
  }
};

const createContract = async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(200).send({ success: true, data: { contract } });
  } catch (e) {
    res.status(501).send({ success: false, error: e });
  }
};

export default { getAllContracts, createContract };
