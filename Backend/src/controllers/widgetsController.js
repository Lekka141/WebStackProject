const Widget = require('../models/Widget');

exports.createWidget = async (req, res) => {
  try {
    const newWidget = new Widget(req.body);
    await newWidget.save();
    res.status(201).json(newWidget);
  } catch (err) {
    res.status(500).json({ error: 'Error creating widget' });
  }
};

exports.getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find({ user: req.user._id });
    res.status(200).json(widgets);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching widgets' });
  }
};

exports.updateWidget = async (req, res) => {
  try {
    const updatedWidget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedWidget);
  } catch (err) {
    res.status(500).json({ error: 'Error updating widget' });
  }
};

exports.deleteWidget = async (req, res) => {
  try {
    await Widget.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Widget deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting widget' });
  }
};
