const router = require('express').Router();
const auth = require('../middleware/auth');
const { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

router.get('/', auth(), listCustomers);
router.get('/:id', auth(), getCustomer);
router.post('/', auth(['admin', 'agent']), createCustomer);
router.patch('/:id', auth(['admin', 'agent']), updateCustomer);
router.delete('/:id', auth(['admin']), deleteCustomer);

module.exports = router;