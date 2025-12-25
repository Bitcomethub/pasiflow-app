const db = require('../config/db');

const User = {
    // Find user by email
    async findByEmail(email) {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    },

    // Find user by ID
    async findById(id) {
        const result = await db.query(
            'SELECT id, email, full_name, phone, is_verified, created_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    },

    // Create new user
    async create({ email, passwordHash, fullName, phone }) {
        const result = await db.query(
            `INSERT INTO users (email, password_hash, full_name, phone) 
             VALUES ($1, $2, $3, $4) 
             RETURNING id, email, full_name, created_at`,
            [email, passwordHash, fullName || null, phone || null]
        );
        return result.rows[0];
    },

    // Update user
    async update(id, { fullName, phone, isVerified }) {
        const result = await db.query(
            `UPDATE users 
             SET full_name = COALESCE($2, full_name), 
                 phone = COALESCE($3, phone), 
                 is_verified = COALESCE($4, is_verified),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $1 
             RETURNING id, email, full_name, phone, is_verified`,
            [id, fullName, phone, isVerified]
        );
        return result.rows[0];
    },
};

module.exports = User;
