const router = require('express').Router();
const {
  getAllOrders,
  getAllOrdersperShipper,
  createOrder,
  getSingleOrder,
  updateOrder,
} = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/shipper/:id').get(getAllOrdersperShipper);
router.route('/:id').get(getSingleOrder).patch(updateOrder);

module.exports = router;
