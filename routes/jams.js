const express = require('express');
const multer = require('multer');
const path = require('path');
const Jam = require('../models/Jam');
const Mod = require('../models/Mod');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for jam images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/jam-images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'jam-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Get all public jams
router.get('/', async (req, res) => {
    try {
        const { status, search } = req.query;
        
        let query = { visibility: { $in: ['public', 'invite-only'] } };
        
        if (status) {
            query.status = status;
        }
        
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        const jams = await Jam.find(query)
            .populate('creator', 'username avatar')
            .sort({ createdAt: -1 });

        res.json(jams);
    } catch (error) {
        console.error('Error fetching jams:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single jam by slug or invite code
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        
        // Try to find by slug first, then by invite code
        let jam = await Jam.findOne({ slug: identifier })
            .populate('creator', 'username avatar')
            .populate('participants.user', 'username avatar')
            .populate({
                path: 'submissions',
                populate: { path: 'authorId', select: 'username avatar' }
            });
        
        if (!jam) {
            jam = await Jam.findOne({ inviteCode: identifier.toUpperCase() })
                .populate('creator', 'username avatar')
                .populate('participants.user', 'username avatar')
                .populate({
                    path: 'submissions',
                    populate: { path: 'authorId', select: 'username avatar' }
                });
        }
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        // Increment view count
        jam.stats.totalViews += 1;
        await jam.save();
        
        res.json(jam);
    } catch (error) {
        console.error('Error fetching jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new jam
router.post('/create', auth, upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), async (req, res) => {
    try {
        const {
            title,
            description,
            shortDescription,
            theme,
            rules,
            startDate,
            endDate,
            visibility,
            allowedGames,
            allowedCategories,
            maxSubmissionsPerUser,
            allowTeams
        } = req.body;

        const banner = req.files.banner ? `/uploads/jam-images/${req.files.banner[0].filename}` : null;
        const logo = req.files.logo ? `/uploads/jam-images/${req.files.logo[0].filename}` : null;

        const jam = new Jam({
            title,
            description,
            shortDescription,
            theme,
            rules,
            startDate: startDate || Date.now(),
            endDate,
            visibility: visibility || 'invite-only',
            allowedGames: allowedGames ? allowedGames.split(',').map(g => g.trim()) : [],
            allowedCategories: allowedCategories ? allowedCategories.split(',').map(c => c.trim()) : [],
            creator: req.userId,
            banner,
            logo,
            settings: {
                maxSubmissionsPerUser: maxSubmissionsPerUser || 5,
                allowTeams: allowTeams !== 'false'
            }
        });

        // Add creator as participant with creator role
        jam.addParticipant(req.userId, 'creator');

        await jam.save();

        res.status(201).json({
            message: 'Jam created successfully!',
            jam,
            inviteLink: `${req.protocol}://${req.get('host')}/jam/${jam.inviteCode}`
        });
    } catch (error) {
        console.error('Error creating jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Join jam with invite code
router.post('/:identifier/join', auth, async (req, res) => {
    try {
        const { identifier } = req.params;
        
        let jam = await Jam.findOne({ 
            $or: [
                { slug: identifier },
                { inviteCode: identifier.toUpperCase() }
            ]
        });
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        if (jam.isParticipant(req.userId)) {
            return res.status(400).json({ message: 'You are already a participant' });
        }
        
        jam.addParticipant(req.userId);
        await jam.save();
        
        res.json({ message: 'Successfully joined the jam!', jam });
    } catch (error) {
        console.error('Error joining jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit mod to jam
router.post('/:identifier/submit', auth, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'modFile', maxCount: 1 }
]), async (req, res) => {
    try {
        const { identifier } = req.params;
        
        let jam = await Jam.findOne({ 
            $or: [
                { slug: identifier },
                { inviteCode: identifier.toUpperCase() }
            ]
        });
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        // Check if user is participant
        if (!jam.isParticipant(req.userId)) {
            return res.status(403).json({ message: 'You must join the jam first' });
        }
        
        // Check if jam is active
        if (jam.status === 'ended' && !jam.settings.allowLateSubmissions) {
            return res.status(400).json({ message: 'This jam has ended' });
        }
        
        // Check submission limit
        const userSubmissions = await Mod.countDocuments({
            authorId: req.userId,
            jamId: jam._id
        });
        
        if (userSubmissions >= jam.settings.maxSubmissionsPerUser) {
            return res.status(400).json({ 
                message: `Maximum ${jam.settings.maxSubmissionsPerUser} submissions per user` 
            });
        }
        
        const {
            title,
            description,
            shortDescription,
            price,
            category,
            gameTitle,
            tags,
            version
        } = req.body;

        // Process uploaded files
        const images = req.files.images ? req.files.images.map(file => `/uploads/mod-images/${file.filename}`) : [];
        const modFile = req.files.modFile ? `/uploads/mod-files/${req.files.modFile[0].filename}` : '';

        if (images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        if (!modFile) {
            return res.status(400).json({ message: 'Mod file is required' });
        }

        // Get file size
        const fileSize = req.files.modFile[0].size;
        const fileSizeFormatted = formatFileSize(fileSize);

        const mod = new Mod({
            title,
            description,
            shortDescription,
            price: parseFloat(price) || 0,
            isFree: parseFloat(price) === 0,
            category,
            gameTitle,
            author: req.user.username,
            authorId: req.userId,
            images,
            downloadUrl: modFile,
            fileSize: fileSizeFormatted,
            version: version || '1.0.0',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            approved: true, // Auto-approve jam submissions
            active: true,
            jamId: jam._id,
            jamSubmission: true
        });

        await mod.save();
        
        // Add to jam submissions
        jam.submissions.push(mod._id);
        jam.stats.totalSubmissions = jam.submissions.length;
        await jam.save();

        res.status(201).json({
            message: 'Mod submitted to jam successfully!',
            mod
        });
    } catch (error) {
        console.error('Error submitting to jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get jam submissions
router.get('/:identifier/submissions', async (req, res) => {
    try {
        const { identifier } = req.params;
        
        let jam = await Jam.findOne({ 
            $or: [
                { slug: identifier },
                { inviteCode: identifier.toUpperCase() }
            ]
        });
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        const submissions = await Mod.find({ jamId: jam._id })
            .populate('authorId', 'username avatar')
            .sort({ createdAt: -1 });
        
        res.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update jam (creator/moderator only)
router.put('/:identifier', auth, async (req, res) => {
    try {
        const { identifier } = req.params;
        
        let jam = await Jam.findOne({ 
            $or: [
                { slug: identifier },
                { inviteCode: identifier.toUpperCase() }
            ]
        });
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        if (!jam.canModerate(req.userId)) {
            return res.status(403).json({ message: 'You do not have permission to edit this jam' });
        }
        
        const allowedUpdates = ['title', 'description', 'shortDescription', 'theme', 'rules', 'endDate', 'status'];
        const updates = {};
        
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });
        
        Object.assign(jam, updates);
        await jam.save();
        
        res.json({ message: 'Jam updated successfully', jam });
    } catch (error) {
        console.error('Error updating jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete jam (creator only)
router.delete('/:identifier', auth, async (req, res) => {
    try {
        const { identifier } = req.params;
        
        let jam = await Jam.findOne({ 
            $or: [
                { slug: identifier },
                { inviteCode: identifier.toUpperCase() }
            ]
        });
        
        if (!jam) {
            return res.status(404).json({ message: 'Jam not found' });
        }
        
        if (jam.creator.toString() !== req.userId) {
            return res.status(403).json({ message: 'Only the creator can delete this jam' });
        }
        
        await jam.deleteOne();
        
        res.json({ message: 'Jam deleted successfully' });
    } catch (error) {
        console.error('Error deleting jam:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Helper function
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = router;
