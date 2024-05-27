const router = require('express').Router();
const {
  getAllShipper,
  createShipper,
  getSingleShipper,
  updateShipper,
  suspendShipper,
} = require('../controllers/shipper');

router.route('/').get(getAllShipper).post(createShipper);
router.route('/suspend/:id').patch(suspendShipper);
router.route('/:id').get(getSingleShipper).patch(updateShipper);

module.exports = router;
