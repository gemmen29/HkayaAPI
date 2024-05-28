const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const mongoose = require('mongoose');
const pagination = require('../utils/pagination');
const timeFilteration = require('../utils/time-filteration');

const Order = require('../models/Order');
const Shipper = require('../models/Shipper');

const getAllOrders = async (req, res) => {
  // setup time filteration
  const { startDate, endDate } = timeFilteration(req.query);

  const queryObj = {
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const { skip, limit, totalMatches, numOfPages } = await pagination(
    Order,
    req,
    queryObj
  );

  const orders = await Order.find(queryObj)
    .sort('createdAt')
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({ orders, totalMatches, numOfPages });
};

const getAllOrdersperShipper = async (req, res) => {
  // setup time filteration
  const { startDate, endDate } = timeFilteration(req.query);

  const queryObj = {
    shipper: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  // setup pagination
  const { skip, limit, totalMatches, numOfPages } = await pagination(
    Order,
    req,
    queryObj
  );

  const orders = await Order.find(queryObj)
    .sort('createdAt')
    .skip(skip)
    .limit(limit);

  const totalOrdersAmountAggreate = await Order.aggregate([
    {
      $match: queryObj,
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$total' },
      },
    },
  ]);

  const totalOrdersAmount =
    totalOrdersAmountAggreate.length > 0
      ? totalOrdersAmountAggreate[0].total
      : 0;

  res
    .status(StatusCodes.OK)
    .json({ orders, totalMatches, numOfPages, totalOrdersAmount });
};

const getAllOrdersStatus = async (req, res) => {
  // setup time filteration
  const { startDate, endDate } = timeFilteration(req.query);

  const orders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: '$shipper',
        shipper: { $first: '$shipper' },
        total: { $sum: '$total' },
        numOfOrders: { $sum: 1 },
      },
    },
  ]);

  await Order.populate(orders, {
    path: 'shipper',
    select: 'name uid motorcycleNumber',
  });

  res.status(StatusCodes.OK).json({ orders });
};

const createOrder = async (req, res) => {
  const { shipper } = req.body;
  const currentShipper = await Shipper.findOne({ _id: shipper });

  if (!currentShipper) {
    throw new CustomError.NotFoundError(`No shipper with id: ${shipper}`);
  }

  if (currentShipper.suspended) {
    throw new CustomError.BadRequestError(
      `Shipper with id: ${shipper} is suspended`
    );
  }

  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json(order);
};

const getSingleOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findOne({ _id: orderID });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderID}`);
  }

  res.status(StatusCodes.OK).json(order);
};

const updateOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findOneAndUpdate({ _id: orderID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderID}`);
  }

  res.status(StatusCodes.OK).json(order);
};

module.exports = {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  getAllOrdersperShipper,
  getAllOrdersStatus,
};
