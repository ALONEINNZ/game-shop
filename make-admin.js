// Run this once to make yourself admin
// Usage: node make-admin.js your-email@example.com

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const email = process.argv[2];

if (!email) {
    console.log('Usage: node make-admin.js your-email@example.com');
    process.exit(1);
}

async function makeAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log(`User with email "${email}" not found`);69
            process.exit(1);
        }
        
        user.role = 'admin';
        await user.save();
        
        console.log(`✅ Success! User "${user.username}" (${user.email}) is now an admin`);
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

makeAdmin();
