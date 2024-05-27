const getAllShipper = async (req, res) => {
  res.send('Get all shipper');
};

const createShipper = async (req, res) => {
  res.send('Create new shipper');
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
