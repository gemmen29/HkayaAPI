const router = require('express').Router();
const {
  getAllOrders,
  getAllOrdersperShipper,
  getAllOrdersStatus,
  createOrder,
  getSingleOrder,
  updateOrder,
} = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/shipper/:id').get(getAllOrdersperShipper);
router.route('/status').get(getAllOrdersStatus);
router.route('/:id').get(getSingleOrder).patch(updateOrder);

module.exports = router;
