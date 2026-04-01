const router = require('express').Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  getSummary
} = require('../controllers/taskController');

router.get('/summary', auth, authorize(['analyst', 'admin']), getSummary);
router.get('/', auth, authorize(['viewer', 'analyst', 'admin']), getRecords);
router.get('/:id', auth, authorize(['viewer', 'analyst', 'admin']), getRecord);
router.post('/', auth, authorize(['admin']), createRecord);
router.put('/:id', auth, authorize(['admin']), updateRecord);
router.delete('/:id', auth, authorize(['admin']), deleteRecord);

module.exports = router;