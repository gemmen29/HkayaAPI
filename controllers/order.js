const Order = require('../models/order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllOrders = async (req, res) => {
  res.send('Get all orders');
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json(order);
};

const getSingleOrder = async (req, res) => {
  res.send('Get single order');
};

const updateOrder = async (req, res) => {
  res.send('Update order');
};

module.exports = {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
};
