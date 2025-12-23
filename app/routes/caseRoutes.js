const router = require('express').Router();
const auth = require('../middleware/auth');
const { listCases, getCase, createCase, updateCase, deleteCase } = require('../controllers/caseController');

router.get('/', auth(), listCases);
router.get('/:id', auth(), getCase);
router.post('/', auth(['admin', 'agent']), createCase);
router.patch('/:id', auth(['admin', 'agent']), updateCase);
router.delete('/:id', auth(['admin']), deleteCase);

module.exports = router;