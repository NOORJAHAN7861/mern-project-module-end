const Customer = require('../models/Customer');

const listCustomers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const q = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Customer.find(q).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Customer.countDocuments(q)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const item = await Customer.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Customer not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const item = await Customer.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const item = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Customer not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const item = await Customer.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer };