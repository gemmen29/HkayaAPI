const Order = require('../models/order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .sort('createdAt')
    .populate('shipper', 'name uid motorcycleNumber');
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
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
};
