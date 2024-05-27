const Shipper = require('../models/Shipper');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllShipper = async (req, res) => {
  const shippers = await Shipper.find({});
  res.status(StatusCodes.OK).json({ shippers, nbShippers: shippers.length });
};

const createShipper = async (req, res) => {
  const shipper = await Shipper.create(req.body);
  res.status(StatusCodes.CREATED).json(shipper);
};

const getSingleShipper = async (req, res) => {
  res.send('Get single shipper');
};

const updateShipper = async (req, res) => {
  res.send('Update shipper');
};

const suspendShipper = async (req, res) => {
  res.send('Suspend shipper');
};

module.exports = {
  getAllShipper,
  createShipper,
  getSingleShipper,
  updateShipper,
  suspendShipper,
};
