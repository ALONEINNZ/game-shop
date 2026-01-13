const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader?.replace('Bearer ', '');
        
        if (!token) {
            console.log('Auth failed: No token provided');
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        
        const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here_demo_mode_2026';
        
        let decoded;
        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (jwtError) {
            console.log('JWT verification failed:', jwtError.message);
            return res.status(401).json({ error: 'Invalid token.' });
        }
        
        // Support both 'userId' and 'id' for backwards compatibility
        const userId = decoded.userId || decoded.id;
        
        if (!userId) {
            console.log('Auth failed: No userId in token', decoded);
            return res.status(401).json({ error: 'Invalid token structure.' });
        }
        
        const user = await User.findById(userId).select('-password');
        if (!user) {
            console.log('Auth failed: User not found for id:', userId);
            return res.status(401).json({ error: 'Invalid token. User not found.' });
        }
        
        req.user = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
        };
        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = auth;