const Record = require('../models/task');

// CREATE record (admin only)
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "amount, type, category and date are required" });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: "type must be income or expense" });
    }

    const record = await Record.create({ amount, type, category, date, notes, UserId: req.user.id });
    res.status(201).json({ message: "Record created", record });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all records with optional filters (analyst + admin)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, date } = req.query;
    const where = {};

    if (type) where.type = type;
    if (category) where.category = category;
    if (date) where.date = date;

    const records = await Record.findAll({ where });
    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single record
exports.getRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE record (admin only)
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.update(req.body);
    res.json({ message: "Record updated", record });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE record (admin only)
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.destroy();
    res.json({ message: "Record deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DASHBOARD SUMMARY (analyst + admin) 🔥
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.findAll();

    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpenses = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    // category wise totals
    const categoryTotals = {};
    records.forEach(r => {
      if (!categoryTotals[r.category]) categoryTotals[r.category] = 0;
      categoryTotals[r.category] += r.amount;
    });

    // recent 5 records
    const recentActivity = records
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      categoryTotals,
      recentActivity
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};