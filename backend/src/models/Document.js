const db = require('../config/db');

const Document = {
    // Create new document record
    async create({ userId, filename, originalName, mimeType, fileSize, storagePath, documentType }) {
        const result = await db.query(
            `INSERT INTO documents (user_id, filename, original_name, mime_type, file_size, storage_path, document_type) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [userId, filename, originalName, mimeType, fileSize, storagePath, documentType || 'other']
        );
        return result.rows[0];
    },

    // Find all documents for a user
    async findByUserId(userId) {
        const result = await db.query(
            'SELECT * FROM documents WHERE user_id = $1 ORDER BY uploaded_at DESC',
            [userId]
        );
        return result.rows;
    },

    // Find document by ID
    async findById(id) {
        const result = await db.query(
            'SELECT * FROM documents WHERE id = $1',
            [id]
        );
        return result.rows[0];
    },

    // Delete document
    async delete(id) {
        const result = await db.query(
            'DELETE FROM documents WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    },
};

module.exports = Document;
