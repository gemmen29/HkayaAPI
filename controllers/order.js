const getAllOrders = async (req, res) => {
  res.send('Get all orders');
};

const createOrder = async (req, res) => {
  res.send('Create new order');
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
