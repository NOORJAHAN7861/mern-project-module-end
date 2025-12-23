const Case = require('../models/Case');

const listCases = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, priority, customer_id } = req.query;
    const q = {};
    if (status) q.status = status;
    if (priority) q.priority = priority;
    if (customer_id) q.customer_id = customer_id;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Case.find(q).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }).populate('customer_id').populate('assigned_to'),
      Case.countDocuments(q)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

const getCase = async (req, res, next) => {
  try {
    const item = await Case.findById(req.params.id).populate('customer_id').populate('assigned_to');
    if (!item) return res.status(404).json({ message: 'Case not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const createCase = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.customer_id) return res.status(400).json({ message: 'customer_id is required' });
    const item = await Case.create(payload);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const updateCase = async (req, res, next) => {
  try {
    const item = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Case not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const deleteCase = async (req, res, next) => {
  try {
    const item = await Case.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { listCases, getCase, createCase, updateCase, deleteCase };