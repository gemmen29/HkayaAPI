const Shipper = require('../models/Shipper');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllShipper = async (req, res) => {
  const shippers = await Shipper.find({});
  res.status(StatusCodes.OK).json({ shippers, count: shippers.length });
};

const createShipper = async (req, res) => {
  const shipper = await Shipper.create(req.body);
  res.status(StatusCodes.CREATED).json(shipper);
};

const getSingleShipper = async (req, res) => {
  const { id: shipperId } = req.params;
  const shipper = await Shipper.findOne({ _id: shipperId });

  if (!shipper) {
    throw new CustomError.NotFoundError(`No shipper with id : ${shipperId}`);
  }

  res.status(StatusCodes.OK).json(shipper);
};

const updateShipper = async (req, res) => {
  const { id: shipperId } = req.params;
  const shipper = await Shipper.findOneAndUpdate({ _id: shipperId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!shipper) {
    throw new CustomError.NotFoundError(`No shipper with id : ${shipperId}`);
  }

  res.status(StatusCodes.OK).json(shipper);
};

const suspendShipper = async (req, res) => {
  const { id: shipperId } = req.params;
  const shipper = await Shipper.findOneAndUpdate(
    { _id: shipperId },
    { suspended: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!shipper) {
    throw new CustomError.NotFoundError(`No shipper with id : ${shipperId}`);
  }

  res.status(StatusCodes.OK).json({ message: 'Shipper suspended' });
};

const activeExistingShipper = async (req, res) => {
  const { id: shipperId } = req.params;
  const shipper = await Shipper.findOneAndUpdate(
    { _id: shipperId },
    { suspended: false },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!shipper) {
    throw new CustomError.NotFoundError(`No shipper with id : ${shipperId}`);
  }

  res.status(StatusCodes.OK).json({ message: 'Shipper activated' });
};

module.exports = {
  getAllShipper,
  createShipper,
  getSingleShipper,
  updateShipper,
  suspendShipper,
  activeExistingShipper,
};
