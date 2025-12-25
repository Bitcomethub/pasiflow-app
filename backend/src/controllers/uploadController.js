const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');

const uploadController = {
    // Upload single file
    async uploadFile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { documentType } = req.body;

            // Save file metadata to database
            const document = await Document.create({
                userId: req.user.id,
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                fileSize: req.file.size,
                storagePath: req.file.path,
                documentType: documentType || 'other',
            });

            res.status(201).json({
                message: 'File uploaded successfully',
                document,
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to upload file' });
        }
    },

    // Get all documents for current user
    async getMyDocuments(req, res) {
        try {
            const documents = await Document.findByUserId(req.user.id);
            res.json({ documents });
        } catch (error) {
            console.error('Get documents error:', error);
            res.status(500).json({ error: 'Failed to retrieve documents' });
        }
    },

    // Delete document
    async deleteDocument(req, res) {
        try {
            const { id } = req.params;

            // Find document first
            const document = await Document.findById(id);
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            // Check ownership
            if (document.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized to delete this document' });
            }

            // Delete file from filesystem
            if (fs.existsSync(document.storage_path)) {
                fs.unlinkSync(document.storage_path);
            }

            // Delete from database
            await Document.delete(id);

            res.json({ message: 'Document deleted successfully' });
        } catch (error) {
            console.error('Delete document error:', error);
            res.status(500).json({ error: 'Failed to delete document' });
        }
    },
};

module.exports = uploadController;
