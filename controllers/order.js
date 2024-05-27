const Order = require('../models/order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const mongoose = require('mongoose');

const getAllOrders = async (req, res) => {
  // from and to query params are optional
  const now = new Date();
  const startDate = new Date(
    req.query.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const endDate = new Date(req.query.to ?? now);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  console.log(startDate.toLocaleString(), endDate.toLocaleString());

  // setup pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObj = {
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };
  const orders = await Order.find(queryObj)
    .sort('createdAt')
    .skip(skip)
    .limit(limit);
  const totalMatches = await Order.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({ orders, totalMatches });
};

const getAllOrdersperShipper = async (req, res) => {
  // from and to query params are optional
  const startDate = new Date(req.query.from ?? Date.now());
  const endDate = new Date(req.query.to ?? startDate);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  // setup pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObj = {
    shipper: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };

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

  const totalMatches = await Order.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({ orders, totalMatches, totalOrdersAmount });
};

const getAllOrdersStatus = async (req, res) => {
  const { from, to } = req.query;

  const startDate = new Date(from ?? Date.now());
  const endDate = new Date(to ?? startDate);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

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
