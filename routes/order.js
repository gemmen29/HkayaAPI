const router = require('express').Router();
const {
  getAllOrders,
  getAllOrdersperShipper,
  getAllOrdersStatus,
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/shipper/:id').get(getAllOrdersperShipper);
router.route('/status').get(getAllOrdersStatus);
router.route('/:id').get(getSingleOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
