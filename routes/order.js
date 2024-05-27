const router = require('express').Router();
const {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
} = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getSingleOrder).patch(updateOrder);

module.exports = router;
