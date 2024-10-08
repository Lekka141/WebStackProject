const express = require('express');
const router = express.Router();
const { uploadFile, getUserFiles, deleteFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected file routes
router.post('/upload', authMiddleware, uploadFile);
router.get('/files', authMiddleware, getUserFiles);
router.delete('/files/:id', authMiddleware, deleteFile);

module.exports = router;
