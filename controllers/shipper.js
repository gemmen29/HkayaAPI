const Shipper = require('../models/Shipper');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const pagination = require('../utils/pagination');

const getAllShipper = async (req, res) => {
  const { activeShippersOnly } = req.query;
  const queryObj = {};

  if (activeShippersOnly === 'true' || !activeShippersOnly) {
    queryObj.suspended = false;
  }

  console.log(activeShippersOnly, queryObj);

  const { skip, limit, totalMatches, numOfPages } = await pagination(
    Shipper,
    req,
    queryObj
  );
  const shippers = await Shipper.find(queryObj)
    .sort('name')
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({ shippers, totalMatches, numOfPages });
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
