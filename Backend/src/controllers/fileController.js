const File = require('../models/User');

// Upload a file
const uploadFile = async (req, res) => {
  const { filename, path } = req.body;
  const file = new File({ filename, path, userId: req.user.id });

  try {
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's files
const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    await File.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadFile, getUserFiles, deleteFile };
