const router = require('express').Router();
const {
  getAllShipper,
  createShipper,
  getSingleShipper,
  updateShipper,
  suspendShipper,
  activeExistingShipper,
} = require('../controllers/shipper');

router.route('/').get(getAllShipper).post(createShipper);
router.route('/suspend/:id').patch(suspendShipper);
router.route('/active/:id').patch(activeExistingShipper);
router.route('/:id').get(getSingleShipper).patch(updateShipper);

module.exports = router;
