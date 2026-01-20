const mongoose = require('mongoose');

const jamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inviteCode: {
    type: String,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  theme: {
    type: String,
    default: 'Create anything!'
  },
  rules: {
    type: String,
    default: 'Have fun and be creative!'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'ended', 'archived'],
    default: 'active'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'invite-only'],
    default: 'invite-only'
  },
  allowedGames: [{
    type: String
  }],
  allowedCategories: [{
    type: String
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['participant', 'moderator', 'creator'],
      default: 'participant'
    }
  }],
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mod'
  }],
  prizes: [{
    place: String,
    description: String,
    value: String
  }],
  voting: {
    enabled: {
      type: Boolean,
      default: false
    },
    startDate: Date,
    endDate: Date,
    criteria: [{
      name: String,
      description: String,
      weight: Number
    }]
  },
  banner: {
    type: String
  },
  logo: {
    type: String
  },
  settings: {
    requireApproval: {
      type: Boolean,
      default: false
    },
    maxSubmissionsPerUser: {
      type: Number,
      default: 5
    },
    allowTeams: {
      type: Boolean,
      default: true
    },
    allowLateSubmissions: {
      type: Boolean,
      default: false
    }
  },
  stats: {
    totalSubmissions: {
      type: Number,
      default: 0
    },
    totalParticipants: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Generate unique invite code
jamSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = generateInviteCode();
  }
  if (!this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

// Helper function to generate invite code
function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Helper function to create slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to generate invite code
function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Pre-save hook to generate slug and inviteCode
jamSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate slug from title
    if (!this.slug) {
      let baseSlug = slugify(this.title);
      let slug = baseSlug;
      let counter = 1;
      
      // Ensure slug is unique
      while (await mongoose.model('Jam').findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      this.slug = slug;
    }
    
    // Generate unique invite code
    if (!this.inviteCode) {
      let inviteCode = generateInviteCode();
      
      // Ensure invite code is unique
      while (await mongoose.model('Jam').findOne({ inviteCode })) {
        inviteCode = generateInviteCode();
      }
      
      this.inviteCode = inviteCode;
    }
  }
  
  next();
});

// Check if user is participant
jamSchema.methods.isParticipant = function(userId) {
  return this.participants.some(p => p.user.toString() === userId.toString());
};

// Check if user is moderator or creator
jamSchema.methods.canModerate = function(userId) {
  const participant = this.participants.find(p => p.user.toString() === userId.toString());
  return participant && (participant.role === 'moderator' || participant.role === 'creator');
};

// Add participant
jamSchema.methods.addParticipant = function(userId, role = 'participant') {
  if (!this.isParticipant(userId)) {
    this.participants.push({ user: userId, role });
    this.stats.totalParticipants = this.participants.length;
  }
};

module.exports = mongoose.model('Jam', jamSchema);
